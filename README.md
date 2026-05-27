# Dungeons Manager

<p align="center">
  <b>A mobile companion app for Dungeons & Dragons 5e</b><br>
  Manage characters, spells, equipment, and campaign tables — all in one place.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.83.4-61DAFB?logo=react&logoColor=white" alt="React Native">
  <img src="https://img.shields.io/badge/Expo-55.0.11-000020?logo=expo&logoColor=white" alt="Expo">
  <img src="https://img.shields.io/badge/TypeScript-5.9.2-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Yarn-1.22.22-2C8EBB?logo=yarn&logoColor=white" alt="Yarn">
  <img src="https://img.shields.io/badge/i18n-EN%2FPT-blue" alt="i18n">
</p>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## About

**Dungeons Manager** is a cross-platform mobile application built with React Native and Expo to help players and Dungeon Masters manage their Dungeons & Dragons 5th Edition campaigns. Whether you are tracking a complex spellcaster's spell slots or a fighter's inventory, Dungeons Manager keeps your game organized so you can focus on the adventure.

The app supports both **English** and **Portuguese** (i18n), works offline via a local SQLite database, and syncs with a remote backend for multiplayer campaign tables in real time.

---

## Features

### Character Management
- Create, edit, and manage multiple D&D 5e characters
- Track core attributes, skills, saving throws, and proficiencies
- Monitor hit points, hit dice, and temporary resources
- Assign classes, backgrounds, and equipment

### Spellbook
- Extensive spell list with full descriptions and mechanics
- Add, edit, and remove custom spells
- Track prepared spells and spell slots by level
- Filter spells by school, level, and casting type

### Equipment & Inventory
- Manage weapons, armor, and adventuring gear
- Track currency (GP, SP, CP, etc.)
- Calculate attack bonuses and damage dice automatically

### Campaign Tables (Multiplayer)
- Join or create real-time game tables via WebSockets (Action Cable)
- DM dashboard for managing encounters and player status
- Dice rolling with contextual modifiers
- Persistent notes per character and per campaign

### Offline Spell List
- Support for a vast amount of spells offline using SQLite (via `expo-sqlite`)
- Background sync with the remote API when connectivity is restored
- Secure local token storage with `expo-secure-store`

### UX & Accessibility
- Tailwind CSS (NativeWind) for consistent, responsive styling
- Smooth bottom sheets, modals, and tab navigation
- Keyboard-aware forms with validation (Zod + React Hook Form)

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [React Native](https://reactnative.dev/) 0.83.4 + [Expo](https://expo.dev/) SDK 55 |
| **Navigation** | [Expo Router](https://docs.expo.dev/router/introduction/) + React Navigation (Drawer, Stack, Tabs) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) 5.9 (strict mode) |
| **Styling** | [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for RN) |
| **State & Data** | [TanStack Query (React Query)](https://tanstack.com/query) v5 + Zustand (spell lists) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) / [Yup](https://github.com/jquense/yup) |
| **HTTP** | [Axios](https://axios-http.com/) with custom interceptors for auth, humps (camelCase/snake_case), and table routing |
| **Real-Time** | [@kesha-antonov/react-native-action-cable](https://github.com/kesha-antonov/react-native-action-cable) (WebSockets) |
| **Local DB** | [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) |
| **Localization** | [i18n-js](https://github.com/fnando/i18n-js) + [expo-localization](https://docs.expo.dev/versions/latest/sdk/localization/) |
| **Build** | [EAS Build](https://docs.expo.dev/build/introduction/) (Expo Application Services) |
| **Linting** | [ESLint](https://eslint.org/) 9 + [Prettier](https://prettier.io/) 3 + `typescript-eslint` |

---

## Prerequisites

- [Node.js](https://nodejs.org/) LTS (v20 or later recommended)
- [Yarn](https://yarnpkg.com/) 1.22.22 (the project uses Yarn Classic)
- [Expo CLI](https://docs.expo.dev/more/expo-cli/) or [Expo Go](https://expo.dev/go) app on your device
- Android Studio (for Android emulator) or Xcode (for iOS simulator), if running locally

> **Note:** The project enforces Yarn via the `engines` field in `package.json`. Using a different package manager may lead to unexpected issues.

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/IronProg/dungeons-manager.git
   cd dungeons-manager
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root (see [Environment Variables](#environment-variables) below).

4. **Run prebuild (optional, for native modules)**

   ```bash
   npx expo prebuild
   ```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# API
EXPO_PUBLIC_API_URL=https://dungeons-manager.online
EXPO_PUBLIC_WEBSOCKET_URL=wss://dungeons-manager.online/cable

# External JSON data sources (spell lists)
EXPO_PUBLIC_JSON_EN_URL=https://gist.githubusercontent.com/.../spells_en.json
EXPO_PUBLIC_JSON_PT_URL=https://gist.githubusercontent.com/.../spells_pt.json
```

> **Important:** Variables prefixed with `EXPO_PUBLIC_` are bundled at build time and are visible in the client bundle. Do **not** store secrets (API keys, passwords) in these variables.

---

## Running the App

### Development (Expo Go)

```bash
# Start the Metro bundler
yarn start

# Then press:
# - a  → open on Android emulator/device
# - i  → open on iOS simulator/device
# - w  → open in web browser
```

### Android

```bash
yarn android
```

### iOS

```bash
yarn ios
```

---

## Project Structure

```
dungeons-manager/
├── app/                          # Expo Router file-based routes
│   ├── (auth)/                   # Auth group (login, signup)
│   ├── (authenticated)/          # Protected routes (character details, spells, tables)
│   │   ├── (drawer)/             # Drawer layout (DM dashboard, tables, new character)
│   │   │   └── (tabs)/           # Tab layout (index, spells, weapons, equipments)
│   │   └── ...
│   ├── _layout.tsx               # Root layout with providers
│   └── index.tsx                 # Entry redirect
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Core UI primitives (buttons, inputs, pickers)
│   └── ...                       # Feature-specific components
│
├── services/                     # API & business logic per domain
│   ├── auth/
│   ├── characters/
│   ├── spells/
│   ├── spellSlots/
│   ├── spellLists/
│   ├── equipments/
│   ├── weapons/
│   ├── skills/
│   ├── savingThrows/
│   ├── proficiencies/
│   ├── resources/
│   ├── currencies/
│   ├── notes/
│   ├── tables/
│   ├── classes/
│   └── ...
│
├── hooks/                        # Custom React hooks (table channel, skill bonus, damage strings, etc.)
├── providers/                    # Context providers (table, character, dice roll, attributes)
├── contexts/                     # React Context definitions
├── types/                        # Global TypeScript interfaces & types
├── core/                         # Shared core utilities
│   ├── api/                      # Axios instance & interceptors
│   ├── helpers/                  # Helper functions (modifiers, classnames)
│   ├── utils/                    # Utility modules (colors, tokens, table utils)
│   ├── enums/                    # Application enums (attributes, spell schools, hit dice, etc.)
│   └── error/                    # Error handling utilities
│
├── i18n/                         # Localization
│   ├── locales/
│   │   ├── en.ts
│   │   └── pt.ts
│   └── index.ts
│
├── modules/                      # Domain modules (character aggregates)
├── constants/                    # App-wide constants
├── assets/                       # Images, icons, splash screens
├── .env                          # Environment variables (not committed)
├── app.json                      # Expo configuration
├── eas.json                      # EAS Build configuration
├── tailwind.config.js            # Tailwind + NativeWind theme
├── tsconfig.json                 # TypeScript configuration
├── package.json
└── README.md                     # You are here!
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository and clone your fork.
2. Create a new branch: `git checkout -b feat/your-feature-name`.
3. Make your changes and ensure they pass linting:
   ```bash
   yarn lint
   yarn format
   ```
4. Commit your changes with a clear, descriptive message.
5. Push to your fork and open a Pull Request.

Please open an issue first for major changes or new features to discuss the design before implementation.

---

## License

This project is currently unlicensed. If you intend to use or distribute this code, please contact the author or open an issue to discuss licensing.

---

## Acknowledgments

- [Expo](https://expo.dev/) for the incredible React Native toolchain
- [NativeWind](https://www.nativewind.dev/) for bringing Tailwind CSS to mobile
- [Lucide](https://lucide.dev/) for the beautiful icon set
- The D&D 5e SRD for spell and game mechanic data
- The open-source community for the countless libraries that power this app

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/IronProg">IronProg</a>
</p>
