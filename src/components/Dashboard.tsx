import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DashboardProps {
  onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [matchCount, setMatchCount] = useState<number>(0);
  const [conversionRate, setConversionRate] = useState<number>(0);
  const [directionData, setDirectionData] = useState<any[]>([]);
  const [fearsData, setFearsData] = useState<any[]>([]);
  const [topSchools, setTopSchools] = useState<any[]>([]);
  const [trendingInterests, setTrendingInterests] = useState<any[]>([]);
  const [isDark, setIsDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    // Inicjuj domyślnymi wartościami (bez losowania)
    setMatchCount(23);
    setConversionRate(78);
    setDirectionData([
      { name: 'IT', value: 53, color: '#3b82f6' },
      { name: 'Medycyna', value: 42, color: '#ef4444' },
      { name: 'Nauczanie', value: 71, color: '#10b981' },
      { name: 'Biznes', value: 12, color: '#f59e0b' },
      { name: 'Inżynieria', value: 12, color: '#8b5cf6' },
    ]);
    setFearsData([
      { name: 'Matematyka', value: 43, fear: 'Strach...' },
      { name: 'Język angielski', value: 36, fear: 'Strach...' },
      { name: 'Historia', value: 81, fear: 'Strach...' },
      { name: 'Biologia', value: 91, fear: 'Strach...' },
      { name: 'Chemia', value: 93, fear: 'Strach...' },
      { name: 'Polski', value: 20, fear: 'Strach...' },
    ]);
    setTopSchools([
      { name: 'LO nr 1 w Rzeszowie', matches: 18 },
      { name: 'II LO Herberta w Rzeszowie', matches: 16 },
      { name: 'ZS nr 3 IT w Rzeszowie', matches: 12 },
      { name: 'UJ w Rzeszowie', matches: 6 },
      { name: 'WSB-NLU w Rzeszowie', matches:  3},
    ]);
    setTrendingInterests([
      { tag: 'tech', label: 'Tech & IT', percentage: 91 },
      { tag: 'health', label: 'Medycyna', percentage: 1 },
      { tag: 'business', label: 'Biznes', percentage: 6 },
      { tag: 'creative', label: 'Kreatywność', percentage: 1 },
      { tag: 'science', label: 'Nauka', percentage: 1 },
    ]);

    // Śledź zmiany trybu ciemnego
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const tooltipStyle = isDark
    ? {
        backgroundColor: '#1e293b',
        border: '1px solid #475569',
        borderRadius: '8px',
        color: '#ffffff',
      }
    : {
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        color: '#000000',
      };

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-slate-700 dark:backdrop-blur-md sticky top-0 z-40 bg-white dark:bg-slate-900/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              ← Wróć
            </button>
            <h1 className="text-3xl font-bold text-blue-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-cyan-400 transition-colors">
              📊 ANALIZA REAL-TIME
            </h1>
          </div>
          <div className="text-xs text-gray-500 dark:text-slate-400 font-mono transition-colors">
            {new Date().toLocaleString('pl-PL')}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Match Counter */}
          <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg dark:shadow-2xl dark:hover:shadow-cyan-500/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 dark:text-slate-400 font-semibold text-sm uppercase tracking-wider transition-colors">
                Matchów dzisiaj
              </span>
              <span className="text-3xl">⚡</span>
            </div>
            <div className="text-6xl font-black text-blue-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500">
              {matchCount.toLocaleString('pl-PL')}
            </div>
            <p className="text-gray-600 dark:text-slate-500 text-sm mt-3 transition-colors">
              +23% w stosunku do wczoraj 📈
            </p>
            <div className="mt-4 w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden transition-colors">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full w-3/4 rounded-full"></div>
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg dark:shadow-2xl dark:hover:shadow-purple-500/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 dark:text-slate-400 font-semibold text-sm uppercase tracking-wider transition-colors">
                Użytkownicy online
              </span>
              <span className="text-3xl">👥</span>
            </div>
            <div className="text-6xl font-black text-purple-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-purple-400 dark:to-pink-500">
              {Math.floor(4).toLocaleString('pl-PL')}
            </div>
            <p className="text-gray-600 dark:text-slate-500 text-sm mt-3 transition-colors">
              Średni czas sesji: 12 min 👍
            </p>
            <div className="mt-4 w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden transition-colors">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-full w-2/3 rounded-full"></div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg dark:shadow-2xl dark:hover:shadow-green-500/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 dark:text-slate-400 font-semibold text-sm uppercase tracking-wider transition-colors">
                Konwersja
              </span>
              <span className="text-3xl">✅</span>
            </div>
            <div className="text-6xl font-black text-green-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-green-400 dark:to-emerald-500">
              {conversionRate}%
            </div>
            <p className="text-gray-600 dark:text-slate-500 text-sm mt-3 transition-colors">
              Użytkowników szuka szczegółów szkoły
            </p>
            <div className="mt-4 w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden transition-colors">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-full w-4/5 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Pie Chart - Ulubione kierunki */}
          <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg dark:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 transition-colors">
              <span>🎓</span> Ulubione kierunki w Rzeszowie
            </h2>
            <p className="text-gray-600 dark:text-slate-400 text-sm mb-6 transition-colors">
              Rozkład zainteresowań uczniów na platformie
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={directionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {directionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(value: any) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {directionData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700 dark:text-slate-300 transition-colors">
                    {item.name} <span className="text-gray-500 dark:text-slate-500">{item.value}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart - Czego się boją na maturze */}
          <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg dark:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 transition-colors">
              <span>😰</span> Czego uczniowie się boją na maturze?
            </h2>
            <p className="text-gray-600 dark:text-slate-400 text-sm mb-6 transition-colors">
              Poziom strachu (1-100 pkt)
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={fearsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#475569' : '#e2e8f0'}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke={isDark ? '#94a3b8' : '#64748b'}
                  style={{ fontSize: '12px' }}
                  tick={{ fill: isDark ? '#94a3b8' : '#64748b' }}
                />
                <YAxis
                  stroke={isDark ? '#94a3b8' : '#64748b'}
                  style={{ fontSize: '12px' }}
                  tick={{ fill: isDark ? '#94a3b8' : '#64748b' }}
                  domain={[0, 100]}
                />
                <Tooltip contentStyle={tooltipStyle} formatter={(value: any) => `${value} pkt`} />
                <Bar
                  dataKey="value"
                  fill="#ef4444"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1000}
                  animationBegin={200}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Matches */}
          <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg dark:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
              <span>🏆</span> Top 5 Szkół  
            </h2>
            <div className="space-y-4">
              {topSchools.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-white dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600/50 dark:hover:border-blue-500/50 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{idx + 1}</div>
                    <span className="text-gray-700 dark:text-slate-300 transition-colors">{item.name}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">Matches</span>
                    <span className="text-blue-600 dark:text-cyan-400 font-semibold transition-colors">{item.matches}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interest Distribution */}
          <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg dark:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
              <span>🔥</span> Trending zainteresowania
            </h2>
            <div className="space-y-4">
              {trendingInterests.map((item) => (
                <div key={item.tag}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 dark:text-slate-300 font-medium transition-colors">{item.label}</span>
                    <span className="text-blue-600 dark:text-cyan-400 text-sm font-semibold transition-colors">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden transition-colors">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700 rounded-xl text-center transition-colors duration-300">
          <p className="text-gray-700 dark:text-slate-400 text-sm transition-colors">
            💡 <span className="font-semibold text-blue-600 dark:text-cyan-400">Pro Tip:</span> Ta analityka w
            real-time pokazuje KO (Kuratorom Oświatowym), jakie szkoły budować i w jakie zawody
            inwestować. EduSwipe to nie tylko aplikacja — to narzędzie do Data Mining edukacyjnego!
          </p>
        </div>
      </main>
    </div>
  );
};
