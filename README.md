# Wordle Clone

A mobile-friendly, client-side only web application that mimics the popular word-guessing game. Built with React and Tailwind CSS, this clone features an endless play mode, local storage for tracking game statistics, and a responsive design that works perfectly on both desktop and mobile devices.

## Features

- Endless Mode: Play as many times as you want without waiting for the next day.
- Accurate Game Logic: Correctly handles duplicate letters and prioritizes exact matches.
- Game History: Tracks your wins, losses, current streak, max streak, and guess distribution using browser local storage.
- Authentic Animations: Includes the classic staggered flip reveal animations for guessed words.
- Mobile Optimized: Designed to fit perfectly on mobile screens without scrolling, including touch-action optimizations to prevent double-tap zooming.
- Dark Theme: Default dark mode styling for a sleek, modern look.

## Technology Stack

- React (Bootstrapped with Vite)
- Tailwind CSS (For utility-first styling)
- Headless UI (For accessible modal dialogs)
- Heroicons (For SVG icons)

## Getting Started

### Prerequisites

Make sure you have Node.js (version 16 or higher) and npm installed on your machine.

### Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory:
   ```bash
   cd wordle-clone
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server, run:

```bash
npm run dev
```

Open your browser and visit `http://localhost:5173` to play the game.

## Deployment

This project is configured for seamless deployment to Netlify.

### Drag and Drop Deployment

1. Build the project for production:
   ```bash
   npm run build
   ```
2. A `dist` directory will be created in your project folder.
3. Log in to Netlify and go to Netlify Drop (app.netlify.com/drop).
4. Drag and drop the `dist` folder onto the page.

### Git Deployment

Alternatively, push this repository to GitHub, GitLab, or Bitbucket, and connect it to a new Netlify site. Netlify will automatically use the provided `netlify.toml` file to configure the build command (`npm run build`) and publish directory (`dist`).