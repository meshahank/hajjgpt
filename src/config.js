/**
 * OpenRouter configuration — import this only from API layers, not scattered in UI.
 *
 * Never hardcode API keys in frontend source. Vite injects `import.meta.env`
 * values at build time, so the secret stays out of the repo and source files.
 */
export const openRouterConfig = {
  apiKey: (import.meta.env.VITE_OPENROUTER_API_KEY || '').trim(),
  baseUrl: 'https://openrouter.ai/api/v1/chat/completions',

  // OpenRouter automatically selects the fastest / best available model
  defaultModel: 'openrouter/auto',

  models: [
    // { id: 'openrouter/auto', label: 'Auto (fastest available)' },
    { id: 'google/gemma-3n-e2b-it:free', label: 'Kunsi 2.5' },
    { id: 'google/gemma-4-31b-it:free', label: 'Kunsi pro 2.6' },
    { id: 'openai/gpt-oss-120b:free', label: 'Kunsi Max 2.7' },
  ],
};