import { useCallback, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTaskStore } from '../store/useTaskStore'
import type { TaskStatus, Priority, FilterState } from '../types'

export function useFilterState() {
  const [searchParams, setSearchParams] = useSearchParams()

  // selective subscriptions — avoids the full-store snapshot issue
  const filters    = useTaskStore((s) => s.filters)
  const setFilters  = useTaskStore((s) => s.setFilters)
  const clearFilters = useTaskStore((s) => s.clearFilters)

  // track last synced search string so we don't loop
  const lastSyncedRef = useRef('')

  useEffect(() => {
    const str = searchParams.toString()
    if (str === lastSyncedRef.current) return
    lastSyncedRef.current = str

    const statuses    = searchParams.getAll('status') as TaskStatus[]
    const priorities  = searchParams.getAll('priority') as Priority[]
    const assigneeIds = searchParams.getAll('assignee')
    const dueDateFrom = searchParams.get('from') ?? ''
    const dueDateTo   = searchParams.get('to') ?? ''

    setFilters({ statuses, priorities, assigneeIds, dueDateFrom, dueDateTo })
  }, [searchParams, setFilters])

  const updateFilter = useCallback(
    (partial: Partial<FilterState>) => {
      const next = { ...filters, ...partial }
      setFilters(partial)

      const params = new URLSearchParams()
      next.statuses.forEach((s) => params.append('status', s))
      next.priorities.forEach((p) => params.append('priority', p))
      next.assigneeIds.forEach((a) => params.append('assignee', a))
      if (next.dueDateFrom) params.set('from', next.dueDateFrom)
      if (next.dueDateTo)   params.set('to', next.dueDateTo)

      lastSyncedRef.current = params.toString()
      setSearchParams(params, { replace: false })
    },
    [filters, setFilters, setSearchParams]
  )

  const handleClear = useCallback(() => {
    clearFilters()
    lastSyncedRef.current = ''
    setSearchParams({})
  }, [clearFilters, setSearchParams])

  const hasActiveFilters =
    filters.statuses.length > 0 ||
    filters.priorities.length > 0 ||
    filters.assigneeIds.length > 0 ||
    !!filters.dueDateFrom ||
    !!filters.dueDateTo

  return { filters, updateFilter, handleClear, hasActiveFilters }
}
