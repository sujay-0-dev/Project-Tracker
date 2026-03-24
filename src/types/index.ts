
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low'
export type TaskStatus = 'To Do' | 'In Progress' | 'In Review' | 'Done'

export interface User {
  id: string
  name: string
  initials: string
  color: string
}

export interface Task {
  id: string
  title: string
  assignee: User
  priority: Priority
  status: TaskStatus
  startDate: Date | null
  dueDate: Date
  description?: string
}

export interface CollabUser {
  id: string
  name: string
  initials: string
  color: string
  currentTaskId: string | null
}

export interface FilterState {
  statuses: TaskStatus[]
  priorities: Priority[]
  assigneeIds: string[]
  dueDateFrom: string
  dueDateTo: string
}

export type SortField = 'title' | 'priority' | 'dueDate'
export type SortDir = 'asc' | 'desc'

export interface SortState {
  field: SortField
  dir: SortDir
}
