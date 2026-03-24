import { create } from 'zustand'
import type { Task, TaskStatus, FilterState, SortState } from '../types'
import { seedTasks } from '../data/seed'

interface TaskStore {
  tasks: Task[]
  updateStatus: (taskId: string, newStatus: TaskStatus) => void

  filters: FilterState
  setFilters: (f: Partial<FilterState>) => void
  clearFilters: () => void

  sort: SortState
  setSort: (s: SortState) => void
}

const emptyFilters: FilterState = {
  statuses: [],
  priorities: [],
  assigneeIds: [],
  dueDateFrom: '',
  dueDateTo: '',
}

export const priorityRank: Record<string, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: seedTasks,

  updateStatus: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      ),
    })),

  filters: emptyFilters,

  setFilters: (partial) =>
    set((state) => ({
      filters: { ...state.filters, ...partial },
    })),

  clearFilters: () => set({ filters: emptyFilters }),

  sort: { field: 'dueDate', dir: 'asc' },

  setSort: (s) => set({ sort: s }),
}))
