# Task Master PWA

A Progressive Web Application (PWA) for managing tasks with deadlines and daily motivational quotes. Built with React, Vite, and Dexie.js (IndexedDB).

## Features

- **Motivational Quotes**: Displays a random quote on every load (cached for offline).
- **Task Management**: Add tasks with descriptions and deadlines.
- **Persistence**: Tasks are saved locally using IndexedDB (via Dexie.js), persisting across reloads and restarts.
- **Deadline Visuals**:
  - 🟡 Yellow: Due within 7 days.
  - 🟠 Orange: Due within 3 days.
  - 🔴 Red: Deadline passed.
- **Offline Support**: Works fully offline using a Service Worker.
- **Installable**: Can be installed as a native-like app on supported devices.

## Installation & Running

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   npm run preview
   ```

## Offline Functionality

The application uses a custom Service Worker (`public/sw.js`) to cache:
- Core application files (HTML, CSS, JS bundles).
- Static assets (Icons, Manifest).
- Logic allows the app to load even when disconnected from the network.
- An "Offline" indicator ⚠️ appears in the UI when the network is lost.

## Data Storage (IndexedDB)

Data is stored locally in the browser's IndexedDB using **Dexie.js**.
- Database Name: `TaskDB`
- Table: `tasks` (`id`, `description`, `deadline`)
- This ensures data privacy and availability without an internet connection.

## Project Structure

- `src/components`: React components (`Quote`, `TaskForm`, `TaskList`, `OfflineIndicator`).
- `src/db`: Database configuration (`db.js`).
- `src/data`: Static data (`quotes.json`).
- `public/sw.js`: Service Worker script.
- `public/manifest.json`: PWA Manifest.
