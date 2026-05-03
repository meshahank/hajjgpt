export function Header() {
  return (
    <header className="pointer-events-none relative z-30 flex shrink-0 items-center justify-between px-4 py-5 sm:px-8">
      <div className="pointer-events-auto flex items-center gap-2">
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-xs font-semibold tracking-tighter text-white shadow-[0_0_24px_-4px_rgba(255,255,255,0.15)]"
          aria-hidden
        >
          H
        </span>
        <div className="leading-tight">
          <p className="text-sm font-medium tracking-tight text-white">HajjGPT</p>
          <p className="hidden text-[11px] text-zinc-500 sm:block">
            Hajj & Umrah companion · expo demo · OpenRouter
          </p>
        </div>
      </div>
      <span className="pointer-events-auto rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        Beta
      </span>
    </header>
  )
}
