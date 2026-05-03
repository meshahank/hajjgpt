import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const assistantMarkdownComponents = {
  table: ({ children, className, ...rest }) => (
    <div className="ai-scroll-table my-4 w-full max-w-full overflow-x-auto [-webkit-overflow-scrolling:touch]">
      <table
        {...rest}
        className={[className, 'w-max min-w-full border-collapse text-[0.9em]']
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </table>
    </div>
  ),
  pre: ({ children, className, ...rest }) => (
    <div className="ai-scroll-pre my-4 w-full overflow-x-auto rounded-lg border border-white/[0.08] bg-zinc-950/40 px-3 py-2.5">
      <pre
        {...rest}
        className={[className, 'font-mono text-[0.84em] leading-relaxed'].filter(Boolean).join(' ')}
      >
        {children}
      </pre>
    </div>
  ),
}

export function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  const isStreaming = message.status === 'streaming'
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!message.content || isStreaming) return
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard may be denied
    }
  }

  if (isUser) {
    return (
      <div className="animate-message-in flex w-full justify-end">
        <div className="max-w-[min(100%,34rem)] rounded-[1.25rem] border border-white/[0.06] bg-zinc-100 px-4 py-3.5 text-[15px] leading-relaxed text-zinc-950 shadow-sm sm:px-5">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-message-in relative w-full pr-10 sm:pr-11">
      <button
        type="button"
        onClick={handleCopy}
        disabled={isStreaming || !message.content}
        title="Copy answer"
        className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 opacity-70 transition hover:bg-white/[0.06] hover:text-zinc-200 focus:z-10 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 disabled:pointer-events-none disabled:opacity-0"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span className="sr-only">{copied ? 'Copied' : 'Copy'}</span>
      </button>

      <div className="min-h-[1.25rem] w-full max-w-full text-[15px] leading-relaxed text-zinc-300">
        {isStreaming && !message.content ? (
          <TypingIndicator />
        ) : (
          <>
            <div className="ai-markdown ai-markdown--assistant w-full max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={assistantMarkdownComponents}
              >
                {message.content || (isStreaming ? '\u00a0' : '')}
              </ReactMarkdown>
            </div>
            {isStreaming && message.content ? (
              <span
                className="ml-0.5 inline-block h-4 w-0.5 animate-pulse rounded-sm bg-sky-400 align-middle"
                aria-hidden
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <span className="flex items-center gap-1.5 py-0.5" aria-label="Assistant is typing">
      <Dot delay={0} />
      <Dot delay={150} />
      <Dot delay={300} />
    </span>
  )
}

function Dot({ delay }) {
  return (
    <span
      className="inline-block h-2 w-2 rounded-full bg-zinc-500"
      style={{
        animation: 'typing-bounce 1.2s ease-in-out infinite',
        animationDelay: `${delay}ms`,
      }}
    />
  )
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 7V5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2M8 7h8a2 2 0 012 2v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
