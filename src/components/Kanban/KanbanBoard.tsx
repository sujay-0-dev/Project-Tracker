import { useTaskStore } from '../../store/useTaskStore'
import { useFilteredTasks } from '../../hooks/useFilteredTasks'
import { useDragDrop } from '../../hooks/useDragDrop'
import { KanbanColumn } from './KanbanColumn'
import type { TaskStatus, CollabUser } from '../../types'

const COLUMNS: TaskStatus[] = ['To Do', 'In Progress', 'In Review', 'Done']

interface Props {
  presenceMap: Record<string, CollabUser[]>
}

export function KanbanBoard({ presenceMap }: Props) {
  const { updateStatus } = useTaskStore()
  const allTasks = useFilteredTasks()

  const { draggedTaskId, overColumn, startDrag, setOverColumn } = useDragDrop(
    (taskId, newStatus) => updateStatus(taskId, newStatus)
  )

  const tasksByColumn = (status: TaskStatus) =>
    allTasks.filter((t) => t.status === status)

  return (
    <div className="h-full overflow-x-auto overflow-y-hidden px-6 py-4">
      <div className="grid gap-4 h-full" style={{ gridTemplateColumns: 'repeat(4, minmax(260px, 1fr))', minWidth: 1100 }}>
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col}
            status={col}
            tasks={tasksByColumn(col)}
            isDragOver={overColumn === col}
            draggedTaskId={draggedTaskId}
            presenceMap={presenceMap}
            onPointerDown={(taskId, status, e) => startDrag(taskId, status, e)}
            onPointerEnter={() => setOverColumn(col)}
            onPointerLeave={() => setOverColumn(null)}
          />
        ))}
      </div>
    </div>
  )
}
