import { useCallback, useEffect, useRef, useState } from 'react'
import { openRouterConfig } from '../config.js'

export function InputBox({
  model,
  onModelChange,
  models,
  disabled,
  inputError,
  onSend,
  variant = 'default',
}) {
  const [value, setValue] = useState('')
  const taRef = useRef(null)
  const { models: fallbackModels } = openRouterConfig
  const modelList = models ?? fallbackModels
  const currentLabel =
    modelList.find((m) => m.id === model)?.label?.split(' ')[0] ?? 'Model'

  const resize = useCallback(() => {
    const el = taRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 100)}px`
  }, [])

  useEffect(() => {
    resize()
  }, [value, resize])

  const submit = () => {
    onSend(value)
    setValue('')
    requestAnimationFrame(resize)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!disabled) submit()
    }
  }

  const shell =
    variant === 'immersive'
      ? 'rounded-[1.75rem] border-white/[0.08] bg-zinc-900/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_64px_-32px_rgba(0,0,0,0.85)]'
      : 'rounded-[1.5rem] border-white/[0.08] bg-zinc-950/55 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_12px_40px_-24px_rgba(0,0,0,0.7)]'

  return (
    <div
      className={`shrink-0 px-4 pt-2 sm:px-8 ${
        variant === 'immersive'
          ? 'pb-[max(1.5rem,env(safe-area-inset-bottom))]'
          : 'border-t border-white/[0.04] bg-black/25 pb-[max(1.25rem,env(safe-area-inset-bottom))] backdrop-blur-xl'
      } `}
    >
      <div className="relative mx-auto w-full max-w-3xl">
        {inputError ? (
            <p
            className="mb-3 text-center text-xs text-amber-400/90"
            role="status"
          >
            {inputError}
          </p>  
        ) : null}

        <div
          className={`backdrop-blur-2xl transition focus-within:border-sky-500/25 focus-within:shadow-[0_0_0_1px_rgba(56,189,248,0.12),0_0_48px_-16px_rgba(56,189,248,0.15)] ${shell} border`}
        >
          <textarea
            ref={taRef}
            rows={variant === 'immersive' ? 3 : 2}
            value={value}
            disabled={disabled}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask about Hajj or Umrah — rituals, travel, etiquette, duʿāʾ…"
            className="max-h-48 min-h-[52px] w-full resize-none bg-transparent px-5 pb-3 pt-4 text-[15px] leading-relaxed text-zinc-100 placeholder:text-zinc-600 outline-none disabled:opacity-50 sm:min-h-[56px] sm:text-[16px]"
            aria-label="Message input"
          />

          <div className="flex items-center gap-2 border-t border-white/[0.06] px-3 py-2 sm:px-4 sm:py-3">
            <button
              type="button"
              disabled
              title="Attachments (demo)"
              className="flex h-9 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-dashed border-white/[0.1] bg-white/[0.02] text-zinc-600"
              aria-hidden
            >
              <PlusIcon />
            </button>

            <div className="relative min-w-0 shrink">
              <div className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500">
                <StackIcon />
              </div>
              <select
                value={model}
                disabled={disabled}
                onChange={(e) => onModelChange(e.target.value)}
                className="h-9 max-w-[10rem] cursor-pointer appearance-none rounded-full border border-white/[0.08] bg-white/[0.04] py-0 pl-8 pr-8 text-[12px] font-medium text-zinc-200 outline-none transition hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-sky-500/30 disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-[13rem] sm:text-[13px]"
                aria-label="Model"
              >
                {modelList.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500">
                <Chevron />
              </span>
            </div>

            <span className="hidden min-w-0 flex-1 sm:block" aria-hidden />

            <button
              type="button"
              onClick={submit}
              disabled={disabled || !value.trim()}
              className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-blue-950/50 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 disabled:pointer-events-none disabled:opacity-35 disabled:shadow-none sm:h-11 sm:w-11"
              title="Send message"
              aria-label="Send"
            >
              {disabled ? (
                <Spinner />
              ) : (
                <SendIcon />
              )}
            </button>
          </div>
        </div>

        <p className="mt-3 text-center text-[11px] text-zinc-600">
          <span className="text-zinc-500">Shift+Enter</span> newline · {currentLabel} ·
          Not a fatwa • verify with a scholar where needed
        </p>
      </div>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function StackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 14l6 3 6-3M6 10l6 3 6-3M6 6l6 3 6-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="translate-x-[1px]"
    >
      <path
        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Spinner() {
  return (
    <svg
      className="h-[18px] w-[18px] animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
