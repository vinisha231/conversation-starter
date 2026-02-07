# Conversation Starter MVP

I built a single-screen, mobile-first experience that helps learners practice real-world language conversations instead of memorization. The flow is intentionally lightweight: pick a language and scenario, read a prompt, respond, and get simple guidance to keep the conversation going.

## Product goals

- Make it easy to start speaking without setup or sign-in.
- Keep the experience focused on real-world situations.
- Provide immediate, lightweight feedback that feels encouraging.
- Handle loading, empty, and error states clearly.

## What I built

- A language selector (French, Spanish, Japanese) and scenario selector (cafe, meeting someone new, directions, shopping).
- A prompt panel that shows empty, loading, error, and ready states.
- A response input with validation and a quick feedback summary.
- A compact, card-based layout that reads well on mobile.

## UX decisions

- I keep the screen to two panels to reduce cognitive load.
- I added a small status badge so users understand if the prompt is ready.
- I reset the response when a new prompt is generated to avoid mismatched answers.
- I use calm color contrast and larger tap targets for mobile comfort.

## How it works

1. I store languages and scenarios in local arrays.
2. When both selections are made, I simulate a short loading state and render the matching prompt.
3. On submit, I validate input and return quick feedback using rule-based checks:
   - Fewer than 6 words prompts the user to add another sentence.
   - Missing a question nudges the user to keep the conversation going.
   - Otherwise, the feedback confirms a smooth, polite response.

## States handled

- Empty: prompt area instructs the user to select a language and scenario.
- Loading: a short delay simulates prompt generation.
- Error: missing prompt or empty response yields a clear message.
- Success: feedback appears after submission.

## Tech stack

- React + Vite for fast setup and deployment.
- Vanilla CSS for tight control over layout and polish.

## Project structure

- `src/App.jsx` holds the UI, state logic, and prompt/feedback flow.
- `src/App.css` defines the card layout and UI styles.
- `src/index.css` sets global typography and background.
- `vite.config.js` uses a relative base so GitHub Pages works.

## Running locally

```bash
npm install
npm run dev
```

## Building for production

```bash
npm run build
```

## Deployment (GitHub Pages)

```bash
npm run build
```

I deploy the contents of `dist/` to the `gh-pages` branch. The Vite `base` is set to `./` so assets resolve correctly when hosted at a subpath.

## Future improvements

- Add more scenarios and region-specific vocabulary.
- Add a retry button to generate a fresh prompt.
- Save recent responses for quick reflection.
- Add gentle corrections using a lightweight language model.
