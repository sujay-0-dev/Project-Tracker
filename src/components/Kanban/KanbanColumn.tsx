import type { Task, TaskStatus, CollabUser } from '../../types'
import { TaskCard } from './TaskCard'

interface Props {
  status: TaskStatus
  tasks: Task[]
  isDragOver: boolean
  draggedTaskId: string | null
  onPointerDown: (taskId: string, status: TaskStatus, e: React.PointerEvent) => void
  onPointerEnter: () => void
  onPointerLeave: () => void
  presenceMap: Record<string, CollabUser[]>
}

const colAccent: Record<TaskStatus, string> = {
  'To Do':       '#64748b',
  'In Progress': '#3b82f6',
  'In Review':   '#8b5cf6',
  'Done':        '#10b981',
}

export function KanbanColumn({
  status, tasks, isDragOver, draggedTaskId,
  onPointerDown, onPointerEnter, onPointerLeave, presenceMap,
}: Props) {
  const accent = colAccent[status]

  return (
    <div className="w-full flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: `2px solid ${accent}50` }}>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}90` }}
          />
          <span className="text-sm font-semibold text-text-primary">{status}</span>
        </div>
        <span
          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
          style={{ background: accent + '1a', color: accent }}
        >
          {tasks.length}
        </span>
      </div>

      <div
        className={`kanban-scroll flex-1 rounded-xl overflow-y-auto transition-all duration-150 ${isDragOver ? 'drop-zone-active' : ''}`}
        style={{ maxHeight: 'calc(100vh - 240px)', padding: 2 }}
        data-drop-column={status}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <div className="flex flex-col gap-2.5">
          {tasks.length === 0 && !isDragOver ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 rounded-xl border-2 border-dashed border-surface-border">
              <span className="text-3xl opacity-15">{status === 'Done' ? '✓' : '◯'}</span>
              <p className="text-xs text-text-muted">Nothing here yet</p>
            </div>
          ) : (
            tasks.map((task) =>
              task.id === draggedTaskId ? (
                <div key={task.id} className="drag-placeholder" style={{ height: 126 }} />
              ) : (
                <TaskCard
                  key={task.id}
                  task={task}
                  isDragging={false}
                  presence={presenceMap[task.id] ?? []}
                  onPointerDown={(e) => onPointerDown(task.id, task.status, e)}
                />
              )
            )
          )}

          {isDragOver && tasks.length > 0 && (
            <div
              className="rounded-xl border-2 border-dashed"
              style={{ height: 80, borderColor: accent + '50' }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
