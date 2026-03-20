# EduSwipe Project Setup & Development Guide

## Project Overview
**EduSwipe** - Podkarpacki Tinder Edukacyjny - A React/TypeScript PWA for discovering educational paths through swiping mechanics.

## Installation & Development

### Prerequisites
- Node.js 18+ (https://nodejs.org/)
- npm (bundled with Node.js)

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open http://localhost:5173
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/           # React components
│   ├── SwipeCard.tsx
│   ├── InterestSelector.tsx
│   ├── Results.tsx
│   ├── TypeSelector.tsx
│   └── Header.tsx
├── data/                 # Static data
│   └── schools.ts
├── types/                # TypeScript interfaces
│   └── index.ts
├── App.tsx               # Main app component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## Features

- ✅ Swipe interface (Tinder-like)
- ✅ Interest selection (12 categories)
- ✅ Smart matching algorithm
- ✅ Results ranking by match score
- ✅ Two modes: Secondary schools & Universities
- ✅ Mock data for Podkarpacie region

## Technologies

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Vitest (testing)

## Next Steps

To extend this project:

1. **Add Real Data**: Replace mock data in `src/data/schools.ts`
2. **Connect to API**: Add backend integration
3. **PWA Features**: Add offline support
4. **Mobile**: Responsive swipe gestures
5. **Authentication**: User accounts & saved preferences
