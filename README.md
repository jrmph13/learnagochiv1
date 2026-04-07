# Learnagochi

Learnagochi is a gamified learning experience that blends a virtual companion with short learning quests. You progress by completing tasks, earning rewards, and unlocking new scenes, all designed to make practice feel playful and consistent.

## Overview
Learnagochi focuses on lightweight, browser-based play. It is a static project (HTML/CSS/JS) you can open directly in a browser without installing dependencies. The project includes multiple versions/iterations of the game and supporting assets.

## Key Features
- Story-inspired, scene-based layout
- Simple, lightweight UI focused on clarity
- Rewards and progression elements for motivation
- Multiple game builds/iterations for comparison

## Project Structure
- `index.html`: Main landing/game entry
- `renderer.js`: Core game logic and UI behavior
- `style.css`: Global styling
- `assets/`: Images, SVGs, and scenes
- `Game/`: Alternate build of the game
- `Final/`: Final/archived builds

## Pages And Builds
- Main version: `index.html`
- Alternate build: `Game/index.html`
- Final builds:
  - `Final/FInalGame/index.html`
  - `Final/legacy-final-game/index.html`

## UI Design
The UI is intentionally minimal so the focus stays on the learning flow. It uses clear layout blocks, soft color choices, and readable typography to keep the interface comfortable for longer sessions. Navigation is kept simple so the player can move between screens without friction.

### Layout Principles
- Clear visual hierarchy for headings, content, and actions
- Screen sections grouped by purpose (story, actions, feedback)
- Consistent spacing and alignment to reduce visual noise

### Visual Style
- Clean, friendly presentation with cozy tone
- Soft color palette to keep the mood calm
- Focus on legibility and contrast for text and buttons

### Interaction Design
- Buttons and links are placed where they are expected
- Primary actions are emphasized for quick decision-making
- Feedback is short and direct to avoid distraction

## Design Assets
Artwork and scenes are stored in `assets/`. These include SVGs for background scenes and supporting visuals. The game uses these assets to reinforce the story-driven theme and to provide a playful atmosphere.

## Design Notes
- The scene artwork is used to set the tone for each chapter
- The UI avoids heavy visual effects to keep performance light
- Each build keeps the same overall design direction so that different versions still feel consistent

## How To Run
This is a static project. You can run it in any modern browser.

1. Open `index.html` in your browser.
2. (Optional) Open `Game/index.html` or `Final/.../index.html` to view other builds.

If you want to host it locally with a simple server, you can use any static server tool. For example, with Node.js installed:

```bash
npx serve .
```

Then open the local URL shown in the terminal.

## Requirements
- Any modern browser (Chrome, Edge, Firefox)

## Customization
- Update styles in `style.css`
- Adjust logic and UI interactions in `renderer.js`
- Replace or add art in `assets/`

## Troubleshooting
- If nothing appears, make sure you opened the correct HTML file.
- If assets do not load, keep the folder structure intact.
- If a build looks different, check the matching `style.css` and `main.js` inside that build folder.

## Deployment
Because this is static, you can deploy it to any static hosting service (GitHub Pages, Netlify, Vercel, etc.) by pointing the host to the project root.
