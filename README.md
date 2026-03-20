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
   - ⬆️ **Super Like** (swipe up) - wyróżniona szkoła, animacja z obrotem
4. **"IT'S A MATCH!" modal** - pojawiają się gdy dopasowanie > 50%
5. **Fast Track notyfikacje** - kontekstowe powiadomienia dla Super Like (auto-dismiss po 5.2s)
6. **Profil szkoły w stylu dating app**:
   - Bio szkoły
   - Zielone flagi 🟢 (zalety)
   - Czerwone flagi 🔴 (wady)
   - CTA button ("First Date" - link do strony/dni otwartych)
7. **Ranking dopasowań** - wyranking szkół procentowo dopasowanych do Ciebie
8. **Informacje szczegółowe** - opis, specjalizacje, lokalizacja każdej szkoły
9. **Chat panel** - asystent edukacyjny do pytań o szkoły, kierunki, miasta
10. **Dark mode** - przełączanie między trybem jasnym i ciemnym
11. **Responsive design** - optymalizacja na wszystkie urządzenia (mobile-first)
12. **Inteligentne filtrowanie** - szkoły z 0% dopasowaniem nie są pokazywane

## 💻 Tech Stack

- **React 18** - UI framework
- **TypeScript** - type safety
- **Tailwind CSS** - styling z dark mode support
- **Vite 5** - szybki build tool
- **Capacitor 8** - cross-platform native bridge (Android APK)
- **Gradle 8.14** - Android build system
- **PWA** - offline support (favicon i icons)
- **Recharts** - wykresy dla analytics (dashboard)
- **Dnd-kit** (opcjonalnie) - drag & drop dla przyszłych feature'ów

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

### Szkoły średnie (40+)
- Szkoły ogólnokształcące, techniczne i specjalistyczne z całego Podkarpacia
- Każda szkoła ma przypisane zainteresowania pasujące do jej profilu
- Dane zawierają: specjalizacje, opis, lokalizację, stronę internetową
- Dostępne profile: IT, inżynieria, biznes, sztuka, opieka zdrowotna, turystyka

### Uniwersytety (25+)
- **Rzeszów**: Politechnika Rzeszowska, Uniwersytet Rzeszowski, WSIiZ, WSPiA
- **Krosno**: Państwowa Akademia Nauk Stosowanych
- **Tarnobrzeg**: PANS w Tarnobrzegu
- **Przemyśl**: Akademia Nauk Stosowanych
- **Lokalne firmy**: Ideo, Asseco Poland, VIGO Photonics, BorgWarner, ZETO

### Zainteresowania (12 kategorii)
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
- [x] Super Like (swipe up) z animacją
- [x] Match modal (IT'S A MATCH!)
- [x] Fast Track notyfikacje
- [x] Profil szkoły w stylu dating app (bio, flagi, CTA)
- [x] Android APK build setup
- [x] Branding (logo, favicon, app icon)
- [x] Dark mode (toggle w nagłówku, localStorage persistence)
- [x] Chat panel z chatbotem (asystent edukacyjny)
- [x] Sponsor banner i footer (ukryty w aplikacji mobilnej)
- [x] Responsive design (mobile-first)
- [x] Filtrowanie szkół z 0% match score
- [x] Mapowanie zainteresowań na polskie nazwy
- [ ] Instalacja na domowy ekran (PWA)
- [ ] Logowanie użytkownika
- [ ] Zapisywanie preferencji
- [ ] Integracja z rzeczywistym API
- [ ] Mapka z lokalizacją
- [ ] Sharing wyników
- [ ] Oceny i opinie od studentów

## 🌙 Dark Mode

Aplikacja obsługuje wbudowany dark mode z automatycznym wykrywaniem preferencji systemu oraz możliwością ręcznego przełączania. Ustawienie jest zapisywane w localStorage.

## 📝 Licencja

Projekt edukacyjny

---

**Stworzono podczas TechQuest 2026🎯**

## 📧 Kontakt

- **Match Threshold**: 50% dopasowania zainteresowań
- **Super Like**: Swipe up na karcie szkoły
- **Fast Track**: Auto-dismiss po 5.2 sekundy
- **App Icons**: Zintegrowane loga EduSwipe
