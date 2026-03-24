import type { CollabUser } from '../../types'

interface Props {
  activeCount: number
  users: CollabUser[]
}

export function CollabBar({ activeCount, users }: Props) {
  const active = users.filter((u) => u.currentTaskId !== null)

  return (
    <div className="shrink-0 flex items-center gap-3 px-5 py-1.5 border-b border-surface-border bg-surface-card/70">
      <div className="flex items-center">
        {active.slice(0, 5).map((u, i) => (
          <div
            key={u.id}
            className="w-5 h-5 rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-surface-card transition-all duration-500"
            style={{
              backgroundColor: u.color,
              fontSize: '0.55rem',
              marginLeft: i > 0 ? -5 : 0,
              zIndex: 10 - i,
            }}
            title={u.name}
          >
            {u.initials}
          </div>
        ))}
        {active.length > 5 && (
          <div
            className="w-5 h-5 rounded-full bg-surface-muted border border-surface-border flex items-center justify-center text-2xs text-text-secondary ring-2 ring-surface-card"
            style={{ marginLeft: -5 }}
          >
            +{active.length - 5}
          </div>
        )}
      </div>

      <span className="text-xs text-text-muted">
        {activeCount === 0
          ? 'Only you here'
          : <><span className="text-emerald-400 font-medium">{activeCount}</span> other{activeCount !== 1 ? 's' : ''} viewing</>
        }
      </span>

      <span className="ml-auto flex items-center gap-1.5 text-2xs text-text-muted">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
        Live
      </span>
    </div>
  )
}
