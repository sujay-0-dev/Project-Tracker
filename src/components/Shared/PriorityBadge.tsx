import type { Priority } from '../../types'

// Using inline styles so Tailwind purge doesn't strip dynamic colors
const cfg: Record<Priority, { bg: string; color: string; dot: string }> = {
  Critical: { bg: 'rgba(248,113,113,0.12)', color: '#f87171', dot: '#ef4444' },
  High:     { bg: 'rgba(251,146,60,0.12)',  color: '#fb923c', dot: '#f97316' },
  Medium:   { bg: 'rgba(251,191,36,0.12)',  color: '#fbbf24', dot: '#f59e0b' },
  Low:      { bg: 'rgba(74,222,128,0.12)',  color: '#4ade80', dot: '#22c55e' },
}

interface Props { priority: Priority; size?: 'sm' | 'md' }

export function PriorityBadge({ priority }: Props) {
  const { bg, color, dot } = cfg[priority]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md font-semibold"
      style={{ background: bg, color, fontSize: '0.68rem', padding: '3px 8px', letterSpacing: '0.015em' }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
      {priority}
    </span>
  )
}
