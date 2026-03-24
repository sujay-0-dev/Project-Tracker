import { useMemo } from 'react'
import { useTaskStore, priorityRank } from '../store/useTaskStore'

export function useFilteredTasks() {
  const tasks   = useTaskStore((s) => s.tasks)
  const filters = useTaskStore((s) => s.filters)
  const sort    = useTaskStore((s) => s.sort)

  return useMemo(() => {
    let result = [...tasks]

    if (filters.statuses.length > 0)
      result = result.filter((t) => filters.statuses.includes(t.status))
    if (filters.priorities.length > 0)
      result = result.filter((t) => filters.priorities.includes(t.priority))
    if (filters.assigneeIds.length > 0)
      result = result.filter((t) => filters.assigneeIds.includes(t.assignee.id))
    if (filters.dueDateFrom) {
      const from = new Date(filters.dueDateFrom)
      result = result.filter((t) => t.dueDate >= from)
    }
    if (filters.dueDateTo) {
      const to = new Date(filters.dueDateTo)
      to.setHours(23, 59, 59, 999)
      result = result.filter((t) => t.dueDate <= to)
    }

    result.sort((a, b) => {
      let cmp = 0
      if (sort.field === 'title')    cmp = a.title.localeCompare(b.title)
      else if (sort.field === 'priority') cmp = priorityRank[a.priority] - priorityRank[b.priority]
      else if (sort.field === 'dueDate')  cmp = a.dueDate.getTime() - b.dueDate.getTime()
      return sort.dir === 'asc' ? cmp : -cmp
    })

    return result
  }, [tasks, filters, sort])
}
