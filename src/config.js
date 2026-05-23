/**
 * OpenRouter configuration — import this only from API layers, not scattered in UI.
 *
 * Never hardcode API keys in frontend source. Vite injects `import.meta.env`
 * values at build time, so the secret stays out of the repo and source files.
 */
export const openRouterConfig = {
  apiKey: (import.meta.env.VITE_OPENROUTER_API_KEY || "").trim(),
  baseUrl: "https://openrouter.ai/api/v1/chat/completions",

  // Keep the app on free models only.
  defaultModel: "z-ai/glm-4.5-air:free",

  models: [
    { id: "z-ai/glm-4.5-air:free", label: "Kunsi Lite" },
    { id: "openai/gpt-oss-20b:free", label: "Kunsi Pro" },
    { id: "openai/gpt-oss-120b:free", label: "Kunsi Max" },
  ],
};