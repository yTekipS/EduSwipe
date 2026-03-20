# EduSwipe - Podkarpacki Tinder Edukacyjny 🎓

Aplikacja mobilna/PWA do odkrywania idealnych szkół i kierunków studiów poprzez intuicyjny system swiping'u!

## 🎯 Idea

Uczniowie szkół średnich i podstawowych w Rzeszowie i na Podkarpaciu często nie wiedzą, co chcą robić po maturze. **EduSwipe** rozwiązuje ten problem poprzez:

- **Swiping** - odkrywaj szkoły jak na Tinderze
- **Inteligentne dopasowanie** - algorytm znajduje idealne szkoły na podstawie Twoich zainteresowań
- **Lokalne dane** - tylko szkoły i uniwersytety z Podkarpacia
- **Dwa tryby** - szkoły średnie lub uniwersytety

## 🚀 Funkcjonalności

1. **Wybór typu szkoły** - szkoła średnia vs. uniwersytet
2. **Wybór zainteresowań** - 12 kategorii zainteresowań (technologia, sztuka, sport, itp.)
3. **Swiping** - przeglądaj karty szkół z gestami
4. **Ranking dopasowań** - zobacz wyranking szkoły procentowo dopasowane do Ciebie
5. **Informacje szczegółowe** - opis, specjalizacje, lokalizacja każdej szkoły

## 💻 Tech Stack

- **React 18** - UI framework
- **TypeScript** - type safety
- **Tailwind CSS** - styling
- **Vite** - szybki build tool
- **PWA** - offline support (do zaimplementowania)

## 📦 Instalacja & Uruchomienie

### Wymagania
- Node.js 18+ (https://nodejs.org/)
- npm (wbudowany z Node.js)

### Setup
```bash
# 1. Zainstaluj zależności
npm install

# 2. Uruchom dev serwer
npm run dev

# 3. Otwórz http://localhost:5173 w przeglądarce
```

### Build
```bash
# Zbuduj dla produkcji
npm run build

# Preview produkcji
npm run preview
```

## 📁 Struktura projektu

```
src/
├── components/        # React komponenty
│   ├── SwipeCard.tsx      # Karta szkoły do swiping'u
│   ├── InterestSelector.tsx # Wybór zainteresowań
│   ├── Results.tsx        # Ekran z wynikami
│   ├── TypeSelector.tsx   # Wybór typu szkoły
│   └── Header.tsx         # Nagłówek
├── data/             # Dane statyczne
│   └── schools.ts       # Baza szkół i zainteresowań
├── types/            # TypeScript typy
│   └── index.ts         # Interfejsy
├── App.tsx           # Główna aplikacja
├── index.css         # Globalne style
└── main.tsx          # Entry point
```

## 🎨 Widoki aplikacji

### 1. Wybór typu szkoły
Użytkownik wybiera między szkoły średnie a uniwersytety.

### 2. Selektor zainteresowań
Zaznacza co najmniej 3 zainteresowania (technologia, sztuka, biznes, itp.)

### 3. Swiping
Przeglądał karty z szkolami - swipe w lewo (nie teraz) lub w prawo (pasuje!)

### 4. Wyniki
Ranking szkół posortowany po stopniu dopasowania do zainteresowań użytkownika.

## 📊 Dane w aplikacji

### Szkoły średnie
- Liceum Ogólnokształcące nr 1
- Liceum Ogólnokształcące nr 2
- Technikum Akademickie nr 3
- Szkoła Sztuk Pięknych
- Technikum Rolnicze

### Uniwersytety
- Politechnika Rzeszowska
- Uniwersytet Rzeszowski
- Uniwersytet Katolicki Jana Pawła II
- SGGW (rolnictwo)
- Akademia Sztuk Pięknych w Krakowie
- Wyższa Szkoła Informatyki

### Zainteresowania
- 👥 Praca z ludźmi
- 📊 Analiza danych
- 🎨 Sztuka i dizajn
- 💻 Technologia
- 🌱 Przyroda i środowisko
- 💼 Biznes i ekonomia
- 🏥 Medycyna i zdrowie
- 🔧 Inżynieria
- 📚 Edukacja
- ⚽ Sport i turystyka
- ⚖️ Prawo i administracja
- 🏗️ Budownictwo

## 🔄 Flow aplikacji

```
Start
  ↓
[Wybór typu szkoły]
  ↓
[Wybór zainteresowań - min 3]
  ↓
[Swiping po szołach]
  ↓
[Wyniki - ranking dopasowań]
  ↓
[Powrót do startu lub eksport]
```

## ✨ Przyszłe udoskonalenia

- [ ] PWA - offline support
- [ ] Logowanie użytkownika
- [ ] Zapisywanie preferencji
- [ ] Integracja z rzeczywistym API szkół
- [ ] Wyświetlanie ocen i opinii
- [ ] Mapka z lokalizacją
- [ ] Sharing wyników
- [ ] Statystyki użytkownika
- [ ] Responsywne karty do swiping'u na mobile
- [ ] Dark mode

## 📝 Licencja

Projekt edukacyjny

---

**Stworzono dla Konkursu Kuratorium Oświaty w Rzeszowie 🎯**
