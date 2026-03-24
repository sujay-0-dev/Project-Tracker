type View = 'kanban' | 'list' | 'timeline'

interface Props {
  activeView: View
  onViewChange: (v: View) => void
}

const views: { id: View; label: string }[] = [
  { id: 'kanban',   label: 'Board'    },
  { id: 'list',     label: 'List'     },
  { id: 'timeline', label: 'Timeline' },
]

export function Header({ activeView, onViewChange }: Props) {
  return (
    <header className="shrink-0 h-14 flex items-center justify-between px-5 bg-surface-card border-b border-surface-border">
      {/* logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-xs font-bold shadow-tab shrink-0">
          PT
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary leading-tight">Project Tracker</p>
          <p className="text-2xs text-text-muted hidden sm:block">Velozity Global Solutions</p>
        </div>
      </div>

      {/* view tabs */}
      <div className="flex items-center gap-1 bg-bg rounded-xl p-1 border border-surface-border">
        {views.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              activeView === id
                ? 'tab-active text-white'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* meta */}
      <div className="flex items-center gap-2 text-xs">
        <span className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg border border-surface-border bg-surface-raised text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
          520 tasks
        </span>
      </div>
    </header>
  )
}
