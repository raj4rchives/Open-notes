# DevShield — React + Vite

Phone-friendly developer/security workspace designed to be hosted on GitHub Pages.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## GitHub Pages
Upload the project to a GitHub repository. If using GitHub Pages with Actions, deploy the generated `dist` folder using a Vite/Node workflow. The app uses no backend and stores snippets, progress and history in browser LocalStorage.

All security utilities are defensive/local: password analysis, SHA-256, URL parsing, JSON formatting, Base64, and regex testing.
