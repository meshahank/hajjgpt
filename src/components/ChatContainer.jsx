import { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble.jsx'
import { QuickChips } from './QuickChips.jsx'

export function ChatContainer({
  messages,
  onQuickPrompt,
  busy,
}) {
  const bottomRef = useRef(null)
  const landing = messages.length === 0

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      {landing ? (
        <div className="relative mx-auto flex min-h-[min(60vh,calc(100dvh-20rem))] max-w-5xl flex-col items-center justify-center gap-10 px-4 pb-4 pt-2 text-center sm:px-8">
          <div className="animate-message-in max-w-2xl space-y-3">
            <h1 className="text-balance bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-[1.65rem] font-semibold tracking-tight text-transparent sm:text-4xl">
              Ready for Hajj — what&apos;s on your mind?
            </h1>
            <p className="text-pretty text-sm leading-relaxed text-zinc-500 sm:text-[15px]">
              Ask about rituals, etiquette, dua, packing, crowds, elders, Umrah logistics, or
              first‑timer worries. HajjGPT is informational only — confirm rulings with a
              scholar and official hajj authority guidance. Demo key:{' '}
              <code className="rounded-md border border-white/[0.06] bg-white/[0.04] px-1.5 py-px text-[12px] text-zinc-400">
                .env
              </code>{' '}
              or{' '}
              <code className="rounded-md border border-white/[0.06] bg-white/[0.04] px-1.5 py-px text-[12px] text-zinc-400">
                config.js
              </code>
              .
            </p>
          </div>
          <QuickChips onPick={onQuickPrompt} disabled={busy} />
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-8 sm:px-6">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          <div ref={bottomRef} className="h-px w-full shrink-0" aria-hidden />
        </div>
      )}
    </main>
  )
}
