This project is a personal productivity dashboard designed to mimic a modern, glassmorphism-styled desktop. It allows users to manage tasks, check the time, and listen to focus music in a fully interactive environment. Everything is draggable and customizable.

✨ Key Features
📝 Smart Sticky Notes (Post-its):

Drag and drop notes anywhere on the screen.

Dual Mode: Switch between simple text memos and checkable To-Do lists.

Auto-save: Data is persisted using localStorage (no data loss on refresh).

Color coding (Yellow, Cyan, Salmon).

Clock Customization:

Switch between Digital and Analog (hands) modes.

Fully customizable colors (digits, hands, background).

Adjustable positioning (Top-Left, Center, Top-Right) via the Settings menu.

⚙️ Settings Panel:

Centralized control for user preferences (Lifting State Up pattern).

Tech Stack
Core: React 19, TypeScript, Vite.

Styling: CSS3 (Variables, Flexbox, Glassmorphism effects).

Libraries: react-draggable, react-icons.

Concepts: Hooks (useState, useEffect, useRef), Component Architecture, Props Drilling & Lifting State Up.

How to run locally 

# 1. Clone the repository
git clone https://github.com/TON-PSEUDO/React-organizer.git

# 2. Enter the folder
cd React-organizer

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
