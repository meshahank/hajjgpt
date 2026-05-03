const CHIPS = [
  {
    label: 'Hajj at a glance',
    prompt:
      'Walk me through the main Hajj days in order (8–12 Dhū al‑Ḥijjah): what happens in Mīnā, ʿArafāt, Muzdalifah, stoning Jamārāt (and shaving/trimming if relevant), farewell ṭawāf—in simple bullet steps.',
  },
  {
    label: 'Ihram essentials',
    prompt:
      'Explain what ihrām is before Hajj/Umrah: obligations, forbidden acts while in ihrām I should memorize, common mistakes pilgrims make while shopping or traveling—keep it beginner‑friendly.',
  },
  {
    label: 'Ṭawāf & Saʿī tips',
    prompt:
      'Give practical etiquette and pacing tips for ṭawāf around the Kaʿbah and Saʿī between Ṣafā and Marwah — crowding tips, dua focus, hydration, elders, wheelchair awareness, avoiding conflict.',
  },
  {
    label: 'First‑timer packing',
    prompt:
      'Make a Hajj‑smart packing checklist: clothing for heat, slippers, toiletries, meds, documents, hydration, duplicates in carry‑on—and what usually gets left behind pilgrims regret.',
  },
]

export function QuickChips({ onPick, disabled }) {
  return (
    <div className="animate-message-in flex flex-wrap justify-center gap-2 sm:gap-3">
      {CHIPS.map((c) => (
        <button
          key={c.label}
          type="button"
          disabled={disabled}
          onClick={() => onPick(c.prompt)}
          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-zinc-300 shadow-none transition hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 disabled:pointer-events-none disabled:opacity-40 sm:text-[13px]"
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}
