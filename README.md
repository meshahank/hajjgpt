# HajjGPT — Expo Chat Demo

Minimal React + Vite + Tailwind chat UI that talks to [OpenRouter](https://openrouter.ai/) from the browser (demo only — no backend).

## Prerequisites

- Node.js 18+
- An [OpenRouter API key](https://openrouter.ai/keys)

## Setup

```bash
npm install
```

Create a `.env` file in the project root (you can copy `.env.example`):

```env
VITE_OPENROUTER_API_KEY=sk-or-v1-...
```

Do not commit real keys. Vite reads `import.meta.env.VITE_OPENROUTER_API_KEY` at build time, which keeps secrets out of the source tree.

## Run locally

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Project layout

- `src/config.js` — OpenRouter URL, model list, API key resolution
- `src/api/openRouter.js` — streaming `fetch` to `/v1/chat/completions`
- `src/hooks/useChat.js` — message state and send/stream lifecycle
- `src/components/` — `Header`, `ChatContainer`, `MessageBubble`, `InputBox`

## Notes

- Responses stream token-by-token over SSE (real streaming, not simulated typing).
- Exposing API keys in frontend builds is **not** suitable for production; use a backend proxy when shipping anything real.
