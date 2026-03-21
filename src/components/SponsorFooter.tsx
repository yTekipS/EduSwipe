import React from 'react';

export const SponsorFooter: React.FC = () => {
  return (
    <footer className="sponsor-footer bg-gradient-to-r from-primary to-blue-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 border-b border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h3 className="text-sm uppercase tracking-wider font-semibold mb-2 text-blue-100">
             <strong> Projekt wspierany przez</strong>
            </h3>
            <div className="flex items-center gap-4">
                <img src="/kuratorium-logo.jpg" alt="Kuratorium Oświaty w Rzeszowi" className="h-24 w-auto" />
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-blue-100 text-sm mb-1">📍 Rzeszów, Podkarpackie</p>
            <p className="text-blue-100 text-sm">🎓 Aplikacja edukacyjna</p>
            <a
              href="https://www.gov.pl/web/edukacja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-white text-sm mt-2 inline-block underline transition-colors"
            >
              Portal Edukacyjny
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3">O projekcie</h4>
            <p className="text-blue-100 text-sm">
              EduSwipe to interaktywna aplikacja wspomagająca wybór drogi edukacyjnej uczniów Podkarpacia.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3">Przydatne linki</h4>
            <ul className="text-blue-100 text-sm space-y-2">
              <li>
                <a
                  href="https://men.gov.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  MEN
                </a>
              </li>
              <li>
                <a
                  href="https://www.gov.pl/web/edukacja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Portal Edukacyjny
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3">Informacje</h4>
            <ul className="text-blue-100 text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Polityka prywatności
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Dostępność
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-100 text-sm">© 2026 EduSwipe. Wszystkie prawa zastrzeżone.</p>
          <p className="text-blue-100 text-xs mt-4 md:mt-0">EduSwipe 🎓 | Podkarpacki Tinder Edukacyjny</p>
        </div>
      </div>
    </footer>
  );
};
