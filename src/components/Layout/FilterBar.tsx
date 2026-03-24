import { useFilterState } from '../../hooks/useFilterState'
import { USERS } from '../../data/users'
import type { TaskStatus, Priority } from '../../types'

const statusOptions: TaskStatus[] = ['To Do', 'In Progress', 'In Review', 'Done']
const priorityOptions: Priority[] = ['Critical', 'High', 'Medium', 'Low']

// per-status accent used for active highlighted chip
const statusColor: Record<TaskStatus, string> = {
  'To Do':       '#94a3b8',
  'In Progress': '#60a5fa',
  'In Review':   '#a78bfa',
  'Done':        '#34d399',
}

const priorityColor: Record<Priority, string> = {
  Critical: '#f87171',
  High:     '#fb923c',
  Medium:   '#fbbf24',
  Low:      '#4ade80',
}

function FilterDivider() {
  return <div className="hidden sm:block w-px h-5 bg-surface-border self-center" />
}

export function FilterBar() {
  const { filters, updateFilter, handleClear, hasActiveFilters } = useFilterState()

  const toggle = <T,>(list: T[], val: T) =>
    list.includes(val) ? list.filter((x) => x !== val) : [...list, val]

  return (
    <div className="shrink-0 flex flex-wrap items-center gap-3 px-5 py-2.5 border-b border-surface-border bg-surface-card">

      {/* ── STATUS ── */}
      <div className="flex items-center gap-2">
        <span className="text-2xs font-semibold uppercase tracking-widest text-text-muted whitespace-nowrap">Status</span>
        <div className="flex flex-wrap gap-1.5">
          {statusOptions.map((s) => {
            const on = filters.statuses.includes(s)
            const c  = statusColor[s]
            return (
              <button
                key={s}
                onClick={() => updateFilter({ statuses: toggle(filters.statuses, s) })}
                className="text-xs px-3 py-1 rounded-full font-medium border transition-all duration-150 whitespace-nowrap"
                style={on
                  ? { background: c + '1a', borderColor: c + '70', color: c }
                  : { background: 'transparent', borderColor: '#252840', color: '#4e5478' }
                }
              >
                {s}
              </button>
            )
          })}
        </div>
      </div>

      <FilterDivider />

      {/* ── PRIORITY ── */}
      <div className="flex items-center gap-2">
        <span className="text-2xs font-semibold uppercase tracking-widest text-text-muted whitespace-nowrap">Priority</span>
        <div className="flex flex-wrap gap-1.5">
          {priorityOptions.map((p) => {
            const on = filters.priorities.includes(p)
            const c  = priorityColor[p]
            return (
              <button
                key={p}
                onClick={() => updateFilter({ priorities: toggle(filters.priorities, p) })}
                className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium border transition-all duration-150 whitespace-nowrap"
                style={on
                  ? { background: c + '1a', borderColor: c + '70', color: c }
                  : { background: 'transparent', borderColor: '#252840', color: '#4e5478' }
                }
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: c, opacity: on ? 1 : 0.3 }}
                />
                {p}
              </button>
            )
          })}
        </div>
      </div>

      <FilterDivider />

      {/* ── ASSIGNEE ── */}
      <div className="flex items-center gap-2">
        <span className="text-2xs font-semibold uppercase tracking-widest text-text-muted whitespace-nowrap">Who</span>
        <div className="flex gap-1.5">
          {USERS.map((u) => {
            const on = filters.assigneeIds.includes(u.id)
            return (
              <button
                key={u.id}
                onClick={() => updateFilter({ assigneeIds: toggle(filters.assigneeIds, u.id) })}
                title={u.name}
                className="w-7 h-7 rounded-full text-2xs text-white font-semibold transition-all duration-150 flex items-center justify-center"
                style={{
                  backgroundColor: u.color,
                  opacity: on ? 1 : 0.28,
                  boxShadow: on ? `0 0 0 2px ${u.color}, 0 0 0 3px #12141f` : 'none',
                  transform: on ? 'scale(1.12)' : 'scale(1)',
                }}
              >
                {u.initials}
              </button>
            )
          })}
        </div>
      </div>

      <FilterDivider />

      {/* ── DATE RANGE ── */}
      <div className="flex items-center gap-2">
        <span className="text-2xs font-semibold uppercase tracking-widest text-text-muted whitespace-nowrap hidden lg:block">Due</span>
        <input
          type="date"
          value={filters.dueDateFrom}
          onChange={(e) => updateFilter({ dueDateFrom: e.target.value })}
          className="text-xs bg-surface-raised border border-surface-border rounded-lg px-2.5 py-1.5 text-text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 cursor-pointer"
        />
        <span className="text-text-muted text-xs">to</span>
        <input
          type="date"
          value={filters.dueDateTo}
          onChange={(e) => updateFilter({ dueDateTo: e.target.value })}
          className="text-xs bg-surface-raised border border-surface-border rounded-lg px-2.5 py-1.5 text-text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 cursor-pointer"
        />
      </div>

      {hasActiveFilters && (
        <button
          onClick={handleClear}
          className="ml-auto flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary px-3 py-1.5 rounded-lg border border-surface-border hover:border-accent/50 hover:bg-accent/5 transition-all duration-150 whitespace-nowrap"
        >
          ✕ Clear All
        </button>
      )}
    </div>
  )
}
