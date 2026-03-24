import type { Task, CollabUser } from '../../types'
import { PriorityBadge } from '../Shared/PriorityBadge'
import { AssigneeAvatar } from '../Shared/AssigneeAvatar'

const TODAY = new Date('2026-03-24')

interface Props {
  task: Task
  isDragging: boolean
  onPointerDown: (e: React.PointerEvent) => void
  presence: CollabUser[]
}

function formatDue(due: Date) {
  const d = new Date(due); d.setHours(0,0,0,0)
  const n = new Date(TODAY); n.setHours(0,0,0,0)
  const diff = Math.round((d.getTime() - n.getTime()) / 86400000)
  if (diff === 0)  return { text: 'Due Today',  cls: '#fbbf24', bold: true }
  if (diff < -7)   return { text: `${Math.abs(diff)}d overdue`, cls: '#f87171', bold: true }
  if (diff < 0)    return { text: due.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }), cls: '#f87171', bold: false }
  return { text: due.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }), cls: '#4e5478', bold: false }
}

export function TaskCard({ task, isDragging, onPointerDown, presence }: Props) {
  const { text: dueText, cls: dueColor, bold: dueBold } = formatDue(task.dueDate)
  const shownPresence = presence.slice(0, 2)
  const extra = presence.length - shownPresence.length

  return (
    <div
      data-task-card
      data-task-id={task.id}
      className={`rounded-xl border border-surface-border bg-surface-raised select-none transition-all duration-100 hover:border-surface-muted hover:shadow-md ${
        isDragging ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
    >
      <div className="cursor-grab active:cursor-grabbing p-3.5" onPointerDown={onPointerDown}>
        {/* presence */}
        {presence.length > 0 && (
          <div className="flex items-center gap-1 mb-2.5">
            {shownPresence.map((u) => (
              <span
                key={u.id}
                className="w-4 h-4 rounded-full ring-1 ring-surface-card"
                style={{ backgroundColor: u.color }}
                title={`${u.name} is here`}
              />
            ))}
            {extra > 0 && <span className="text-2xs text-text-muted">+{extra}</span>}
            <span className="text-2xs text-text-muted ml-0.5">online</span>
          </div>
        )}

        {/* title */}
        <p className="text-sm font-medium text-text-primary leading-snug mb-3 line-clamp-2">
          {task.title}
        </p>

        {/* priority + due row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <PriorityBadge priority={task.priority} />
          <span
            className="text-2xs leading-none"
            style={{ color: dueColor, fontWeight: dueBold ? 600 : 400 }}
          >
            {dueText}
          </span>
        </div>

        {/* divider */}
        <div className="border-t border-surface-border mb-2.5" />

        {/* assignee */}
        <div className="flex items-center gap-2">
          <AssigneeAvatar user={task.assignee} size={22} />
          <span className="text-2xs text-text-muted">{task.assignee.name}</span>
        </div>
      </div>
    </div>
  )
}
