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
3. **Swiping Tinder-style**:
   - ⬅️ **Swipe left** - nie teraz
   - ➡️ **Swipe right** - pasuje!
   - ⬆️ **Super Like** (swipe up) - wysyłaj Fast Track notifikacje
4. **"IT'S A MATCH!" modal** - pojawiają się gdy dopasowanie > 50%
5. **Fast Track notyfikacje** - kontekstowe powiadomienia dla Super Like (auto-dismiss po 5.2s)
6. **Profil szkoły w stylu dating app**:
   - Bio szkoły
   - Zielone flagi 🟢 (zalety)
   - Czerwone flagi 🔴 (wady)
   - CTA button ("First Date" - link do strony)
7. **Ranking dopasowań** - wyranking szkół procentowo dopasowanych do Ciebie
8. **Informacje szczegółowe** - opis, specjalizacje, lokalizacja, odległość każdej szkoły

## 💻 Tech Stack

- **React 18** - UI framework
- **TypeScript** - type safety
- **Tailwind CSS** - styling
- **Vite 5** - szybki build tool
- **Capacitor 8** - cross-platform native bridge (Android APK)
- **Gradle 8.14** - Android build system
- **PWA** - offline support (skonfigurowano favicon i icons)

## 📦 Instalacja & Uruchomienie

### Wymagania
- Node.js 18+ (https://nodejs.org/)
- npm (wbudowany z Node.js)
- Android Studio (dla APK) - Java 21 JDK + Android SDK 24+

### Setup Web
```bash
# 1. Zainstaluj zależności
npm install

# 2. Uruchom dev serwer
npm run dev

# 3. Otwórz http://localhost:5173 w przeglądarce
```

### Build Web
```bash
# Zbuduj dla produkcji
npm run build

# Preview produkcji
npm run preview
```

### Android APK Build
```bash
# Zbuduj APK (web assets + Capacitor sync)
npm run mobile:build

# Lub bezpośrednio Gradle
cd android
.\gradlew.bat assembleDebug

# APK będzie w: android/app/build/outputs/apk/debug/app-debug.apk
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

### Szkoły średnie (13+)
- **Rzeszów**: Liceum Ogólnokształcące im. Gołębskiego, Technikum Ekonomiczne
- **Mielec**: Liceum Akademickie
- **Krosno**: Liceum Plastyczne
- **Łańcut**: Akademickie Liceum Ogólnokształcące
- **Ropczyce**: Liceum Ogólnokształcące
- **Sanok**: Technikum Informatyczne
- **Jasło**: Limuem Ogólnokształcące
- **Tarnobrzeg**: Technikum Grafiki Komputerowej
- I specjalizowane szkoły (programistyczne, grafiki)

### Uniwersytety (20+)
- **Rzeszów**: Politechnika Rzeszowska, Uniwersytet Rzeszowski
- **Kraków**: AGH, Politechnika Krakowska, Uniwersytet Ekonomiczny
- **Warszawa**: Politechnika Warszawska, Uniwersytet Warszawski
- **Lublin**: Uniwersytet Marii Curie-Skłodowskiej
- **Regionalne**: Wyższa Szkoła Informatyki i Zarządzania, WSPiA Rzeszów
- **Akademie**: Akademia Nauk Stosowanych, Polska Akademia Nauk Stosowanych

### Partnery biznesowi (3+)
- **Ideo** - software development
- **Asseco** - enterprise solutions
- **VIGO Photonics** - elektronika
- **BorgWarner** - automotive
- **ZETO** - industrial

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
[Wybór typu szkoły] (szkoła średnia vs uniwersytet)
  ↓
[Wybór zainteresowań] - min 3
  ↓
[Swiping po szołach]
  ├─ ⬅️ Swipe left → następna karta
  ├─ ➡️ Swipe right → jeśli match > 50% → "IT'S A MATCH!" modal
  └─ ⬆️ Swipe up (Super Like) → Fast Track notификacja (5.2s auto-dismiss)
  ↓
[Wyniki] - ranking dopasowań z bio, flagami i CTA
  ↓
[Powrót do startu lub eksport]
```

## ✨ Przyszłe udoskonalenia

- [x] Swiping Tinder-style
- [x] Super Like (swipe up)
- [x] Match modal (IT'S A MATCH!)
- [x] Fast Track notyfikacje
- [x] Profil szkoły w stylu dating app (bio, flagi, CTA)
- [x] Android APK build setup
- [x] Branding (logo, favicon, app icon)
- [ ] Instalacja na domowy ekran (PWA)
- [ ] Dark mode
- [ ] Logowanie użytkownika
- [ ] Zapisywanie preferencji
- [ ] Integracja z rzeczywistym API
- [ ] Mapka z lokalizacją
- [ ] Sharing wyników
- [ ] Oceny i opinie od studentów

## 📝 Licencja

Projekt edukacyjny

---

**Stworzono podczas TechQuest 2026🎯**

## 📧 Kontakt

- **Match Threshold**: 50% dopasowania zainteresowań
- **Super Like**: Swipe up na karcie szkoły
- **Fast Track**: Auto-dismiss po 5.2 sekundy
- **App Icons**: Zintegrowane loga EduSwipe
