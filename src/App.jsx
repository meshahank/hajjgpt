import { Header } from './components/Header.jsx'
import { ChatContainer } from './components/ChatContainer.jsx'
import { InputBox } from './components/InputBox.jsx'
import { openRouterConfig } from './config.js'
import { useChat } from './hooks/useChat.js'

export default function App() {
  const {
    messages,
    model,
    setModel,
    error,
    inputError,
    isStreaming,
    sendMessage,
    clearError,
  } = useChat()

  const landing = messages.length === 0

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-[#060608] font-sans text-zinc-100 antialiased">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(56,189,248,0.12),transparent_55%),radial-gradient(ellipse_80%_50%_at_100%_50%,rgba(59,130,246,0.06),transparent_45%),radial-gradient(ellipse_60%_40%_at_0%_80%,rgba(244,244,245,0.04),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.4))]" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <Header />

        {error ? (
          <div
            className="mx-4 shrink-0 rounded-xl border border-red-500/20 bg-red-950/65 px-4 py-3 text-center text-sm text-red-100/95 shadow-lg shadow-red-950/30 backdrop-blur-md sm:mx-8"
            role="alert"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={clearError}
              className="ml-3 rounded-lg border border-red-400/25 bg-red-950/80 px-2.5 py-1 text-xs text-red-200/90 transition hover:bg-red-900/90"
            >
              Dismiss
            </button>
          </div>
        ) : null}

        <ChatContainer
          messages={messages}
          busy={isStreaming}
          onQuickPrompt={sendMessage}
        />

        <InputBox
          model={model}
          onModelChange={setModel}
          models={openRouterConfig.models}
          variant={landing ? 'immersive' : 'default'}
          onSend={sendMessage}
          disabled={isStreaming}
          inputError={inputError}
        />
      </div>
    </div>
  )
}
