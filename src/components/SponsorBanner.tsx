import React from 'react';

export const SponsorBanner: React.FC = () => {
  return (
    <div className="sponsor-banner bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b-2 border-primary/30 dark:border-blue-500/40 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <div className="text-xs uppercase font-semibold text-primary dark:text-blue-300 tracking-wider">
            Projekt wspierany
          </div>

          <div className="hidden sm:block w-px h-6 bg-primary/30 dark:bg-blue-400/40" />

          <div className="flex items-center gap-3">
            <div className="bg-white dark:bg-slate-700 p-2 rounded border border-primary/20 dark:border-blue-400/30 shadow-sm hover:shadow-md transition-shadow">
              <img src="/logo-min.png" alt="EduSwipe" className="h-6 w-auto" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-primary dark:text-blue-300">EduSwipe</span>
              <span className="text-xs text-gray-600 dark:text-slate-300">Podkarpacki Tinder Edukacyjny</span>
            </div>
          </div>

          <div className="hidden md:block ml-auto">
            <a
              href="https://www.gov.pl/web/edukacja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary dark:text-blue-300 hover:text-primary/70 dark:hover:text-blue-200 font-semibold transition-colors"
            >
              Portal edukacyjny →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
