import type { Task, TaskStatus } from '../../types'
import { useTaskStore } from '../../store/useTaskStore'
import { useVirtualScroll } from '../../hooks/useVirtualScroll'
import { AssigneeAvatar } from '../Shared/AssigneeAvatar'
import { PriorityBadge } from '../Shared/PriorityBadge'

const ROW_HEIGHT = 48

interface Props {
  tasks: Task[]
}

const sCfg: Record<TaskStatus, { bg: string; border: string; color: string }> = {
  'To Do':       { bg: 'rgba(100,116,139,0.1)', border: '#64748b50', color: '#94a3b8' },
  'In Progress': { bg: 'rgba(59,130,246,0.1)',  border: '#3b82f650', color: '#60a5fa' },
  'In Review':   { bg: 'rgba(139,92,246,0.1)',  border: '#8b5cf650', color: '#a78bfa' },
  'Done':        { bg: 'rgba(16,185,129,0.1)',  border: '#10b98150', color: '#34d399' },
}

function DueCell({ due }: { due: Date }) {
  const now = new Date('2026-03-24'); now.setHours(0,0,0,0)
  const d = new Date(due); d.setHours(0,0,0,0)
  const diff = Math.round((d.getTime() - now.getTime()) / 86400000)
  if (diff === 0)  return <span style={{ color: '#fbbf24', fontSize: 12, fontWeight: 600 }}>Due Today</span>
  if (diff < -7)   return <span style={{ color: '#f87171', fontSize: 12, fontWeight: 600 }}>{Math.abs(diff)}d overdue</span>
  if (diff < 0)    return <span style={{ color: '#f87171', fontSize: 12 }}>{due.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
  return <span style={{ color: '#4e5478', fontSize: 12 }}>{due.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}</span>
}

export function VirtualList({ tasks }: Props) {
  const { updateStatus } = useTaskStore()
  const { containerRef, startIdx, endIdx, totalHeight, offsetTop } = useVirtualScroll(tasks.length)

  const visible = tasks.slice(startIdx, endIdx + 1)

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto" style={{ contain: 'strict' }}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ paddingTop: offsetTop }}>
          {visible.map((task, i) => {
            const cfg = sCfg[task.status]
            return (
              <div
                key={task.id}
                className="flex items-center gap-4 px-5 border-b border-surface-border/50 group hover:bg-surface-hover transition-colors duration-75"
                style={{
                  height: ROW_HEIGHT,
                  background: (startIdx + i) % 2 === 1 ? 'rgba(18,20,31,0.6)' : 'transparent',
                }}
              >
                {/* title */}
                <span className="flex-1 text-sm text-text-primary font-medium truncate min-w-0">
                  {task.title}
                </span>

                {/* assignee */}
                <div className="w-28 shrink-0 hidden sm:flex items-center gap-2">
                  <AssigneeAvatar user={task.assignee} size={22} />
                  <span className="text-xs text-text-muted truncate">{task.assignee.name.split(' ')[0]}</span>
                </div>

                {/* priority */}
                <div className="w-22 shrink-0 hidden md:block">
                  <PriorityBadge priority={task.priority} />
                </div>

                {/* status dropdown */}
                <div className="w-32 shrink-0">
                  <select
                    value={task.status}
                    onChange={(e) => updateStatus(task.id, e.target.value as TaskStatus)}
                    className="text-xs w-full rounded-lg px-2.5 py-1.5 font-medium border focus:outline-none cursor-pointer appearance-none"
                    style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.color }}
                  >
                    {(['To Do','In Progress','In Review','Done'] as TaskStatus[]).map((s) => (
                      <option key={s} value={s} className="bg-surface-raised text-text-primary">{s}</option>
                    ))}
                  </select>
                </div>

                {/* due */}
                <div className="w-24 shrink-0 text-right">
                  <DueCell due={task.dueDate} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
