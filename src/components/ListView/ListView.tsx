import { useTaskStore } from '../../store/useTaskStore'
import { useFilteredTasks } from '../../hooks/useFilteredTasks'
import { useFilterState } from '../../hooks/useFilterState'
import { VirtualList } from './VirtualList'
import type { SortField } from '../../types'

export function ListView() {
  const { sort, setSort } = useTaskStore()
  const { hasActiveFilters, handleClear } = useFilterState()
  const tasks = useFilteredTasks()

  function handleSort(field: SortField) {
    if (sort.field === field) {
      setSort({ field, dir: sort.dir === 'asc' ? 'desc' : 'asc' })
    } else {
      setSort({ field, dir: 'asc' })
    }
  }

  function sortIcon(field: SortField) {
    if (sort.field !== field) return <span className="text-gray-700 ml-1">↕</span>
    return <span className="text-accent-indigo ml-1">{sort.dir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* table header */}
      <div className="flex items-center gap-3 px-6 py-2.5 bg-surface-card border-b border-surface-border text-xs font-semibold text-gray-400 uppercase tracking-wider shrink-0">
        <button
          onClick={() => handleSort('title')}
          className={`flex-1 text-left flex items-center hover:text-gray-200 transition-colors ${sort.field === 'title' ? 'text-gray-200' : ''}`}
        >
          Title {sortIcon('title')}
        </button>
        <span className="w-24 shrink-0">Assignee</span>
        <button
          onClick={() => handleSort('priority')}
          className={`w-20 shrink-0 flex items-center hover:text-gray-200 transition-colors ${sort.field === 'priority' ? 'text-gray-200' : ''}`}
        >
          Priority {sortIcon('priority')}
        </button>
        <span className="w-32 shrink-0">Status</span>
        <button
          onClick={() => handleSort('dueDate')}
          className={`w-24 shrink-0 flex items-center justify-end hover:text-gray-200 transition-colors ${sort.field === 'dueDate' ? 'text-gray-200' : ''}`}
        >
          Due {sortIcon('dueDate')}
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 text-center">
          <div className="text-5xl opacity-20">🔍</div>
          <p className="text-gray-400 text-sm">No tasks match your filters</p>
          {hasActiveFilters && (
            <button
              onClick={handleClear}
              className="mt-1 text-sm text-accent-indigo hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <VirtualList tasks={tasks} />
      )}
    </div>
  )
}
