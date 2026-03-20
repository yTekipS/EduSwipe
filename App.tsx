import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { EducationType, School, MatchResult, UserProfile } from './types';
import { INTERESTS, SECONDARY_SCHOOLS, UNIVERSITIES } from './data/schools';
import { TypeSelector } from './components/TypeSelector';
import { InterestSelector } from './components/InterestSelector';
import { SwipeCard } from './components/SwipeCard';
import { Results } from './components/Results';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { useDarkMode } from './hooks/useDarkMode';
import { ChatPanel } from './components/ChatPanel';

type Step = 'type' | 'interests' | 'swipe' | 'results' | 'analytics';
type SwipeVisualDirection = 'left' | 'right' | 'neutral';

interface AppState {
  step: Step;
  profile: UserProfile;
  currentSchoolIndex: number;
  likedSchools: School[];
}

interface FastTrackNotice {
  school: School;
  title: string;
  message: string;
  ctaLabel?: string;
  ctaLink?: string;
}

function App() {
  useDarkMode(); // Initialize dark mode listener
  const [state, setState] = useState<AppState>({
    step: 'type',
    profile: {
      interests: [],
      selectedType: 'secondary',
    },
    currentSchoolIndex: 0,
    likedSchools: [],
  });
  const [swipeVisual, setSwipeVisual] = useState<{
    direction: SwipeVisualDirection;
    intensity: number;
  }>({
    direction: 'neutral',
    intensity: 0,
  });
  const [matchedSchool, setMatchedSchool] = useState<School | null>(null);
  const [fastTrackNotice, setFastTrackNotice] = useState<FastTrackNotice | null>(null);

  const currentSchools = useMemo(() => {
    return state.profile.selectedType === 'secondary' ? SECONDARY_SCHOOLS : UNIVERSITIES;
  }, [state.profile.selectedType]);

  const currentSchool = currentSchools[state.currentSchoolIndex];

  const calculateMatchScore = (school: School): number => {
    if (state.profile.interests.length === 0) return 0;

    const matchingInterests = school.interests.filter((interest) =>
      state.profile.interests.includes(interest)
    ).length;

    return matchingInterests / state.profile.interests.length;
  };

  const matches: MatchResult[] = useMemo(() => {
    return state.likedSchools
      .map((school) => ({
        school,
        matchScore: calculateMatchScore(school),
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [state.likedSchools, state.profile.interests]);

  const handleSelectType = (type: EducationType) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, selectedType: type },
      step: 'interests',
    }));
  };

  const handleToggleInterest = (interestId: string) => {
    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        interests: prev.profile.interests.includes(interestId)
          ? prev.profile.interests.filter((id) => id !== interestId)
          : [...prev.profile.interests, interestId],
      },
    }));
  };

  const handleStartSwiping = () => {
    setState((prev) => ({
      ...prev,
      step: 'swipe',
      currentSchoolIndex: 0,
    }));
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right' && currentSchool && calculateMatchScore(currentSchool) > 0.5) {
      setMatchedSchool(currentSchool);
    }

    const isLastCard = state.currentSchoolIndex + 1 >= currentSchools.length;
    const likedAfterSwipe =
      direction === 'right' && currentSchool
        ? [...state.likedSchools, currentSchool]
        : state.likedSchools;

    if (isLastCard && likedAfterSwipe.length > 0 && direction !== 'right') {
      const bestMatch = [...likedAfterSwipe].sort(
        (a, b) => calculateMatchScore(b) - calculateMatchScore(a)
      )[0];

      if (bestMatch && calculateMatchScore(bestMatch) > 0.5) {
        setMatchedSchool(bestMatch);
      }
    }

    setState((prev) => {
      const schoolToProcess = currentSchools[prev.currentSchoolIndex];
      const likedSchools =
        direction === 'right' && schoolToProcess
          ? [...prev.likedSchools, schoolToProcess]
          : prev.likedSchools;

      const nextIndex = prev.currentSchoolIndex + 1;

      if (nextIndex >= currentSchools.length) {
        return {
          ...prev,
          likedSchools,
          step: 'results',
        };
      }

      return {
        ...prev,
        likedSchools,
        currentSchoolIndex: nextIndex,
      };
    });
  };

  const handleSuperLike = () => {
    if (!currentSchool) return;

    const defaultCta = currentSchool.firstDateLink || currentSchool.website;
    const variants: Omit<FastTrackNotice, 'school'>[] = [
      {
        title: '⭐ SUPER LIKE — FAST TRACK',
        message: `Turbo! Widzimy mocny potencjał. Dla ${currentSchool.name} odblokowaliśmy szybką ścieżkę: konsultacja + praktyki szybciej niż standardowo.`,
        ctaLabel: 'Sprawdź szybką ścieżkę',
        ctaLink: defaultCta,
      },
      {
        title: '🚀 PRIORYTET REKRUTACYJNY',
        message: `Masz priorytetowy status. Twoje zainteresowania pasują do ${currentSchool.name} — warto wskoczyć na Dni Otwarte i porozmawiać o praktykach.`,
        ctaLabel: 'Otwórz link Fast Track ',
        ctaLink: defaultCta,
      },
      {
        title: '⚡ EXPRESS MATCH',
        message: `Wow! Ten Super Like uruchomił tryb ekspresowy. ${currentSchool.name} to kierunek zgodny z Twoim profilem — działaj od razu.`,
        ctaLabel: 'Przejdź do oferty',
        ctaLink: defaultCta,
      },
    ];

    if (currentSchool.interests.includes('tech')) {
      variants.push({
        title: '💻 FAST TRACK IT',
        message: `Rynek potrzebuje programistów i analityków. Dla ${currentSchool.name} masz rekomendację: portfolio + praktyki na start.`,
        ctaLabel: 'Zobacz praktyki IT',
        ctaLink: defaultCta,
      });
    }

    if (currentSchool.interests.includes('health')) {
      variants.push({
        title: '🩺 FAST TRACK MED',
        message: `Tryb medyczny aktywny. ${currentSchool.name} pasuje do Twoich wyborów — złap miejsce na wydarzeniu rekrutacyjnym.`,
        ctaLabel: 'Sprawdź ścieżkę medyczną',
        ctaLink: defaultCta,
      });
    }

    if (currentSchool.interests.includes('business')) {
      variants.push({
        title: '📈 FAST TRACK BIZNES',
        message: `Masz profil pod analitykę i zarządzanie. ${currentSchool.name} może dać Ci mocny start zawodowy już na etapie nauki.`,
        ctaLabel: 'Sprawdź opcje kariery',
        ctaLink: defaultCta,
      });
    }

    const picked = variants[Math.floor(Math.random() * variants.length)];
    setFastTrackNotice({ school: currentSchool, ...picked });

    setState((prev) => {
      const schoolToProcess = currentSchools[prev.currentSchoolIndex];
      const shouldAdd = schoolToProcess && schoolToProcess.id === currentSchool.id;
      const likedSchools = shouldAdd
        ? [...prev.likedSchools.filter((s) => s.id !== currentSchool.id), currentSchool]
        : prev.likedSchools;

      return {
        ...prev,
        likedSchools,
        step: 'results',
      };
    });
  };

  const handleSwipeVisualChange = (direction: SwipeVisualDirection, intensity: number) => {
    setSwipeVisual({
      direction,
      intensity: Math.max(0, Math.min(1, intensity)),
    });
  };

  const handleReset = () => {
    setMatchedSchool(null);
    setFastTrackNotice(null);
    setState({
      step: 'type',
      profile: {
        interests: [],
        selectedType: 'secondary',
      },
      currentSchoolIndex: 0,
      likedSchools: [],
    });
  };

  const handleBack = () => {
    if (state.step === 'interests') {
      setState((prev) => ({
        ...prev,
        step: 'type',
      }));
    } else if (state.step === 'swipe') {
      setState((prev) => ({
        ...prev,
        step: 'interests',
        currentSchoolIndex: 0,
      }));
    } else if (state.step === 'results') {
      setState((prev) => ({
        ...prev,
        step: 'swipe',
        currentSchoolIndex: 0,
        likedSchools: [],
      }));
    } else if (state.step === 'analytics') {
      setState((prev) => ({
        ...prev,
        step: 'type',
      }));
    }
  };

  const handleOpenAnalytics = () => {
    setState((prev) => ({
      ...prev,
      step: 'analytics',
    }));
  };

  const canStartSwiping = state.profile.interests.length >= 3;

  useEffect(() => {
    if (state.step !== 'swipe') {
      setSwipeVisual({ direction: 'neutral', intensity: 0 });
    }
  }, [state.step]);

  useEffect(() => {
    if (!fastTrackNotice) return;

    const timeout = window.setTimeout(() => {
      setFastTrackNotice(null);
    }, 5200);

    return () => window.clearTimeout(timeout);
  }, [fastTrackNotice]);

  const tintOpacity = 0.35 * swipeVisual.intensity;
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const appBackground =
    swipeVisual.direction === 'right'
      ? `rgba(20, 83, 45, ${tintOpacity})`
      : swipeVisual.direction === 'left'
        ? `rgba(127, 29, 29, ${tintOpacity})`
        : isDarkMode
          ? '#0f172a'
          : '#ffffff';

  const firstDateLink = matchedSchool?.firstDateLink || matchedSchool?.website;
  const firstDateLabel = matchedSchool?.firstDateLabel || 'Link do Dni Otwartych';

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: appBackground,
        transition: 'background-color 140ms linear',
      }}
    >
      <Header
        currentStep={state.step}
        educationType={state.profile.selectedType}
        onBack={handleBack}
        onOpenAnalytics={handleOpenAnalytics}
      />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {state.step === 'type' && <TypeSelector onSelect={handleSelectType} />}

        {state.step === 'interests' && (
          <div>
            <InterestSelector
              interests={INTERESTS}
              selectedInterests={state.profile.interests}
              onToggle={handleToggleInterest}
            />
            <div className="mt-10 text-center">
              <button
                onClick={handleStartSwiping}
                disabled={!canStartSwiping}
                className={`px-8 py-3 rounded font-semibold text-white transition-all ${
                  canStartSwiping
                    ? 'bg-primary hover:bg-primary/90 cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed opacity-50'
                }`}
              >
                {canStartSwiping
                  ? 'Zacznij swiping →'
                  : `Zaznacz jeszcze ${3 - state.profile.interests.length} zainteresowań`}
              </button>
            </div>
          </div>
        )}

        {state.step === 'swipe' && currentSchool && (
          <div className="max-w-2xl mx-auto">
            <div key={currentSchool.id} className="swipe-card-enter">
              <SwipeCard
                school={currentSchool}
                onSwipe={handleSwipe}
                onSuperLike={handleSuperLike}
                onVisualChange={handleSwipeVisualChange}
              />
            </div>
            <div className="text-center mt-6 text-gray-600 dark:text-gray-400 transition-colors">
              Szkoła {state.currentSchoolIndex + 1} z {currentSchools.length}
            </div>
          </div>
        )}

        {state.step === 'results' && <Results matches={matches} onReset={handleReset} />}

        {state.step === 'analytics' && <Dashboard onBack={handleBack} />}
      </main>

      {matchedSchool && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="absolute inset-0 pointer-events-none text-4xl md:text-6xl opacity-30 flex items-center justify-center animate-pulse">
            🎉 🎊 ✨ 🎉 🎊
          </div>

          <div className="relative w-full max-w-xl bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-2xl border-4 border-primary dark:border-blue-400 transition-colors">
            <p className="text-4xl md:text-5xl font-black text-primary dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-cyan-400 mb-2 transition-colors">IT'S A MATCH!</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-5 transition-colors">MASZ PARY! 💘</p>

            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1 transition-colors">{matchedSchool.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors">
              {matchedSchool.distanceKm ? `${matchedSchool.distanceKm} km od Ciebie` : matchedSchool.location}
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-5 transition-colors">
              {matchedSchool.datingBio || matchedSchool.description}
            </p>

            {firstDateLink && (
              <a
                href={firstDateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-primary dark:bg-blue-600 text-white rounded-lg font-semibold hover:bg-primary/90 dark:hover:bg-blue-700 transition-colors"
              >
                Zaproś na pierwszą randkę
              </a>
            )}

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 transition-colors">{firstDateLabel}</p>

            <button
              onClick={() => setMatchedSchool(null)}
              className="mt-6 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Kontynuuj przeglądanie
            </button>
          </div>
        </div>
      )}

      {fastTrackNotice && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl bg-gradient-to-r dark:from-blue-700 dark:to-cyan-600 from-blue-600 to-blue-500 text-white rounded-xl shadow-2xl p-4 border border-blue-400 dark:border-blue-300 transition-colors">
          <p className="font-bold mb-1">{fastTrackNotice.title}</p>
          <p className="text-sm">{fastTrackNotice.message}</p>
          {fastTrackNotice.ctaLink && (
            <a
              href={fastTrackNotice.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm font-semibold underline text-blue-100 hover:text-white transition-colors"
            >
              {fastTrackNotice.ctaLabel || 'Otwórz szczegóły'}
            </a>
          )}
          <button
            onClick={() => setFastTrackNotice(null)}
            className="mt-2 text-xs underline text-blue-100 hover:text-white transition-colors"
          >
            Zamknij
          </button>
        </div>
      )}

      {state.step !== 'analytics' && (
        <ChatPanel
          schools={[...SECONDARY_SCHOOLS, ...UNIVERSITIES]}
          selectedInterests={state.profile.interests}
          educationType={state.profile.selectedType}
          interests={INTERESTS}
        />
      )}
    </div>
  );
}

export default App;
