import React, { useEffect, useMemo, useRef, useState } from 'react';
import { EducationType, Interest, School } from '../types';

interface ChatPanelProps {
  schools: School[];
  selectedInterests: string[];
  educationType: EducationType;
  interests: Interest[];
}

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  text: string;
}

type ApiMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const normalize = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l');

const EXTERNAL_CHAT_URL = import.meta.env.VITE_CHAT_API_URL;
const EXTERNAL_CHAT_MODEL = import.meta.env.VITE_CHAT_MODEL || 'gpt-4o-mini';
const EXTERNAL_CHAT_API_KEY = import.meta.env.VITE_CHAT_API_KEY;

const PODKARPACKIE_CITIES = new Set([
  'rzeszow',
  'mielec',
  'krosno',
  'przemysl',
  'stalowa wola',
  'jaroslaw',
  'debica',
  'lancut',
  'ropczyce',
  'sanok',
  'jaslo',
  'lezajsk',
  'tarnobrzeg',
  'tyczyn',
  'nisko',
  'kolbuszowa',
  'strzyzow',
  'brzozow',
  'lubaczow',
  'lesko',
  'ustrzyki dolne',
  'sokolow malopolski',
  'przeworsk',
  'rymanow',
]);

const isPodkarpackieSchool = (school: School): boolean => {
  if (school.region === 'podkarpackie') {
    return true;
  }

  return normalize(school.location)
    .split(/[\/(),-]/)
    .map((part) => part.trim())
    .some((part) => PODKARPACKIE_CITIES.has(part));
};

export const ChatPanel: React.FC<ChatPanelProps> = ({
  schools,
  selectedInterests,
  educationType,
  interests,
}) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'assistant',
      text:
        educationType === 'secondary'
          ? 'Cześć! Jestem doradcą EduSwipe. Mogę pomóc wybrać szkołę średnią i profile.'
          : 'Cześć! Jestem doradcą EduSwipe. Mogę pomóc wybrać uczelnię i kierunki.',
    },
  ]);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const interestById = useMemo(() => {
    return new Map(interests.map((item) => [item.id, item.name]));
  }, [interests]);

  const getWelcomeMessage = (type: EducationType): string =>
    type === 'secondary'
      ? 'Cześć! Jestem doradcą EduSwipe. Mogę pomóc wybrać szkołę średnią i profile.'
      : 'Cześć! Jestem doradcą EduSwipe. Mogę pomóc wybrać uczelnię i kierunki.';

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [
          {
            id: 1,
            role: 'assistant',
            text: getWelcomeMessage(educationType),
          },
        ];
      }

      return [
        ...prev,
        {
          id: Date.now(),
          role: 'assistant',
          text:
            educationType === 'secondary'
              ? 'Przełączyliśmy tryb na szkoły średnie. Mogę zawęzić odpowiedzi do liceów i techników.'
              : 'Przełączyliśmy tryb na uczelnie. Mogę zawęzić odpowiedzi do uniwersytetów i PANS.',
        },
      ];
    });
  }, [educationType]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const extractApiContent = (data: unknown): string | null => {
    if (!data || typeof data !== 'object') return null;

    const maybe = data as {
      choices?: Array<{ message?: { content?: unknown } }>;
      output_text?: unknown;
      output?: Array<{ content?: Array<{ type?: string; text?: unknown }> }>;
      content?: unknown;
    };

    const choicesContent = maybe.choices?.[0]?.message?.content;
    if (typeof choicesContent === 'string' && choicesContent.trim()) {
      return choicesContent.trim();
    }

    if (typeof maybe.output_text === 'string' && maybe.output_text.trim()) {
      return maybe.output_text.trim();
    }

    const outputText = maybe.output
      ?.flatMap((item) => item.content || [])
      .find((part) => part?.type === 'output_text' && typeof part.text === 'string')?.text;
    if (typeof outputText === 'string' && outputText.trim()) {
      return outputText.trim();
    }

    if (typeof maybe.content === 'string' && maybe.content.trim()) {
      return maybe.content.trim();
    }

    return null;
  };

  const askExternalAssistant = async (rawQuery: string, history: ChatMessage[]): Promise<string | null> => {
    if (!EXTERNAL_CHAT_URL || !EXTERNAL_CHAT_API_KEY) {
      return null;
    }

    try {
      const query = normalize(rawQuery);
      const wantsUniversities =
        query.includes('uniwersyt') ||
        query.includes('uczelni') ||
        query.includes('uczeln') ||
        query.includes('studia');
      const wantsSecondary =
        query.includes('liceum') || query.includes('technikum') || query.includes('szkola srednia');
      const wantsPodkarpacie =
        query.includes('podkarpac') || query.includes('podkarpaciu') || query.includes('podkarpackie');

      let scopedSchools = schools;
      if (wantsUniversities && !wantsSecondary) {
        scopedSchools = scopedSchools.filter((school) => school.type === 'university');
      } else if (wantsSecondary && !wantsUniversities) {
        scopedSchools = scopedSchools.filter((school) => school.type === 'secondary');
      }

      if (wantsPodkarpacie) {
        scopedSchools = scopedSchools.filter(isPodkarpackieSchool);
      }

      const schoolsContext = scopedSchools
        .slice(0, 60)
        .map(
          (school) =>
            `${school.name} (${school.location}) — profile/kierunki: ${school.specialization.join(', ')}`
        )
        .join('\n');

      const selectedInterestNames = selectedInterests
        .map((id) => interestById.get(id))
        .filter(Boolean)
        .join(', ');

      const systemPrompt = `Jesteś doradcą edukacyjnym w aplikacji EduSwipe. Odpowiadaj po polsku, krótko i konkretnie. Używaj WYŁĄCZNIE danych z kontekstu poniżej. Jeśli czegoś nie ma w danych, napisz to wprost i dopytaj.\n\nTyp edukacji użytkownika: ${educationType === 'secondary' ? 'szkoły średnie' : 'uczelnie'}\nZainteresowania użytkownika: ${selectedInterestNames || 'brak'}\n\nDostępne szkoły/profile:\n${schoolsContext}`;

      const historyMessages: ApiMessage[] = history.slice(-8).map((message) => ({
        role: message.role,
        content: message.text,
      }));

      const apiMessages: ApiMessage[] = [
        { role: 'system', content: systemPrompt },
        ...historyMessages,
        { role: 'user', content: rawQuery },
      ];

      const response = await fetch(EXTERNAL_CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${EXTERNAL_CHAT_API_KEY}`,
        },
        body: JSON.stringify({
          model: EXTERNAL_CHAT_MODEL,
          messages: apiMessages,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return extractApiContent(data);
    } catch {
      return null;
    }
  };

  const getAssistantReply = (rawQuery: string, history: ChatMessage[]): string => {
    const raw = rawQuery.trim();
    const query = normalize(raw);
    const previousUserQuestion = [...history]
      .reverse()
      .find((message) => message.role === 'user')?.text;

    const followUpPrefix = /^(a\s+|i\s+|tez\s+|tez\?|co\s+z\s+tym|a\s+co\s+z)/i;
    const effectiveQuery =
      previousUserQuestion && (raw.split(/\s+/).length <= 3 || followUpPrefix.test(query))
        ? normalize(`${previousUserQuestion} ${raw}`)
        : query;
    const wantsUniversities =
      query.includes('uniwersyt') ||
      query.includes('uczelni') ||
      query.includes('uczeln') ||
      query.includes('studia');
    const wantsSecondary =
      query.includes('liceum') || query.includes('technikum') || query.includes('szkola srednia');
    const wantsPodkarpacie =
      query.includes('podkarpac') || query.includes('podkarpaciu') || query.includes('podkarpackie');

    let scopedSchools = schools;
    if (wantsUniversities && !wantsSecondary) {
      scopedSchools = scopedSchools.filter((school) => school.type === 'university');
    } else if (wantsSecondary && !wantsUniversities) {
      scopedSchools = scopedSchools.filter((school) => school.type === 'secondary');
    }

    if (wantsPodkarpacie) {
      scopedSchools = scopedSchools.filter(isPodkarpackieSchool);
    }

    if (!effectiveQuery) {
      return 'Napisz pytanie, a podpowiem profile, miasta albo konkretne szkoły.';
    }

    if (
      effectiveQuery.includes('pomoc') ||
      effectiveQuery.includes('co potraf') ||
      effectiveQuery.includes('jak dziala')
    ) {
      return 'Mogę: 1) pokazać listę szkół, 2) podać profile w danej szkole, 3) znaleźć szkoły w mieście, 4) polecić szkoły pod Twoje zainteresowania.';
    }

    const wantsAllSchools =
      effectiveQuery.includes('wszystkie') ||
      effectiveQuery.includes('pelna lista') ||
      effectiveQuery.includes('calosc');

    if (
      effectiveQuery.includes('lista') ||
      effectiveQuery.includes('szkol') ||
      effectiveQuery.includes('uniwersyt') ||
      effectiveQuery.includes('uczelni') ||
      effectiveQuery.includes('jakie szkol') ||
      effectiveQuery.includes('dostepne') ||
      effectiveQuery.includes('pokaz szkol')
    ) {
      const listedSchools = wantsAllSchools ? scopedSchools : scopedSchools.slice(0, 10);
      const preview = listedSchools
        .map((school) => `• ${school.name} (${school.location})`)
        .join('\n');

      if (wantsAllSchools) {
        if (scopedSchools.length === 0) {
          return 'Nie mam wyników dla takiego zakresu. Spróbuj bez filtra regionu albo zmień typ szkoły.';
        }

        return `Mamy obecnie ${scopedSchools.length} pozycji. Pełna lista:\n${preview}`;
      }

      return `Mamy obecnie ${scopedSchools.length} pozycji. Oto przykłady:\n${preview}\n\nNapisz „wszystkie szkoły”, a wypiszę pełną listę.`;
    }

    const exactSchool = scopedSchools.find((school) => {
      const name = normalize(school.name);
      return effectiveQuery.includes(name);
    });

    const tokenSchool =
      exactSchool ||
      scopedSchools.find((school) => {
        const tokens = normalize(school.name)
          .split(/[^a-z0-9]+/)
          .filter((token) => token.length > 4);
        return tokens.some((token) => effectiveQuery.includes(token));
      });

    if (tokenSchool) {
      const specs = tokenSchool.specialization.join(', ');
      const link = tokenSchool.website ? ` Strona: ${tokenSchool.website}` : '';
      return `${tokenSchool.name} (${tokenSchool.location}) oferuje profile/kierunki: ${specs}.${link}`;
    }

    const uniqueLocations = Array.from(new Set(scopedSchools.map((school) => school.location)));
    const matchedLocation = uniqueLocations.find((location) => effectiveQuery.includes(normalize(location)));

    if (matchedLocation) {
      const inLocation = scopedSchools.filter((school) => school.location === matchedLocation).slice(0, 8);
      if (inLocation.length === 0) {
        return `Nie znalazłem szkół w mieście ${matchedLocation}.`;
      }

      const list = inLocation
        .map((school) => `• ${school.name}: ${school.specialization.slice(0, 2).join(', ')}`)
        .join('\n');
      return `W mieście ${matchedLocation} polecam:\n${list}`;
    }

    if (
      effectiveQuery.includes('polec') ||
      effectiveQuery.includes('dla mnie') ||
      effectiveQuery.includes('dopasuj')
    ) {
      if (selectedInterests.length === 0) {
        return 'Najpierw wybierz zainteresowania, wtedy dam Ci dokładniejsze rekomendacje.';
      }

      const recommended = scopedSchools
        .map((school) => {
          const score = school.interests.filter((interest) => selectedInterests.includes(interest)).length;
          return { school, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      if (recommended.length === 0) {
        return 'Nie mam jeszcze mocnych trafień dla Twoich zainteresowań. Spróbuj dodać więcej zainteresowań.';
      }

      const interestNames = selectedInterests
        .map((id) => interestById.get(id))
        .filter(Boolean)
        .join(', ');

      const list = recommended
        .map((item) => `• ${item.school.name} (${item.score}/${selectedInterests.length} zgodnych zainteresowań)`)
        .join('\n');

      return `Na bazie Twoich zainteresowań (${interestNames}) polecam:\n${list}`;
    }

    const qTokens = effectiveQuery.split(/[^a-z0-9]+/).filter((token) => token.length > 2);
    const keywordMatches = scopedSchools
      .map((school) => {
        const haystack = normalize(`${school.specialization.join(' ')} ${school.description} ${school.interests.join(' ')}`);
        const score = qTokens.reduce((sum, token) => (haystack.includes(token) ? sum + 1 : sum), 0);
        return { school, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (keywordMatches.length > 0) {
      const list = keywordMatches
        .map((item) => `• ${item.school.name}: ${item.school.specialization.slice(0, 2).join(', ')}`)
        .join('\n');
      return `Znalazłem szkoły pasujące do pytania:\n${list}`;
    }

    return 'Nie złapałem jeszcze kontekstu. Zapytaj np. o miasto (Rzeszów), profil (informatyka, medyczny, biznes) albo napisz „poleć szkoły dla mnie”.';
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      text,
    };

    const nextHistory = [...messages, userMessage];
    setMessages(nextHistory);
    setInput('');

    setIsLoading(true);
    const externalReply = await askExternalAssistant(text, messages);
    const assistantMessage: ChatMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      text: externalReply || getAssistantReply(text, messages),
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-primary text-white px-5 py-3 shadow-lg hover:bg-primary/90 transition-colors"
        >
          💬 Chat o szkołach
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[min(94vw,420px)] h-[70vh] max-h-[620px] bg-white border border-gray-200 shadow-2xl rounded-2xl flex flex-col overflow-hidden">
          <div className="bg-primary text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold">Asystent EduSwipe</p>
              <p className="text-xs text-primary-100">
                Zapytaj o szkoły, profile i kierunki
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-sm px-2 py-1 rounded hover:bg-white/20"
            >
              Zamknij
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] whitespace-pre-line rounded-xl px-3 py-2 text-sm ${
                  message.role === 'assistant'
                    ? 'bg-white border border-gray-200 text-gray-800'
                    : 'bg-primary text-white ml-auto'
                }`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          <div className="border-t border-gray-200 p-3 flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  void handleSend();
                }
              }}
              placeholder="Np. Jakie profile IT są w Rzeszowie?"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              disabled={isLoading}
            />
            <button
              onClick={() => {
                void handleSend();
              }}
              className="bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? '...' : 'Wyślij'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
