import { useRef, useState, useCallback, useEffect } from 'react'
import type { TaskStatus } from '../types'

interface DragState {
  taskId: string | null
  originalStatus: TaskStatus | null
  placeholderIdx: number | null
  overColumn: TaskStatus | null
}

interface UseDragDropResult {
  isDragging: boolean
  dragState: DragState
  draggedTaskId: string | null
  overColumn: TaskStatus | null
  startDrag: (taskId: string, status: TaskStatus, e: React.PointerEvent) => void
  setOverColumn: (col: TaskStatus | null) => void
}

export function useDragDrop(
  onDrop: (taskId: string, newStatus: TaskStatus) => void
): UseDragDropResult {
  const [dragState, setDragState] = useState<DragState>({
    taskId: null,
    originalStatus: null,
    placeholderIdx: null,
    overColumn: null,
  })

  const floatEl = useRef<HTMLDivElement | null>(null)
  const startPos = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)

  const setOverColumn = useCallback((col: TaskStatus | null) => {
    setDragState((prev) => ({ ...prev, overColumn: col }))
  }, [])

  const cleanup = useCallback(() => {
    if (floatEl.current) {
      floatEl.current.remove()
      floatEl.current = null
    }
    isDraggingRef.current = false
    setDragState({ taskId: null, originalStatus: null, placeholderIdx: null, overColumn: null })
    document.body.style.cursor = ''
    document.body.classList.remove('no-select')
  }, [])

  const startDrag = useCallback(
    (taskId: string, status: TaskStatus, e: React.PointerEvent) => {
      e.preventDefault()
      isDraggingRef.current = true
      startPos.current = { x: e.clientX, y: e.clientY }
      document.body.style.cursor = 'grabbing'
      document.body.classList.add('no-select')

      const cardEl = (e.currentTarget as HTMLElement).closest('[data-task-card]') as HTMLElement
      if (cardEl) {
        const rect = cardEl.getBoundingClientRect()
        const clone = cardEl.cloneNode(true) as HTMLDivElement
        clone.style.cssText = `
          position: fixed;
          top: ${rect.top}px;
          left: ${rect.left}px;
          width: ${rect.width}px;
          z-index: 9999;
          pointer-events: none;
          transform-origin: top left;
        `
        clone.classList.add('card-dragging')
        document.body.appendChild(clone)
        floatEl.current = clone
      }

      setDragState({
        taskId,
        originalStatus: status,
        placeholderIdx: null,
        overColumn: null,
      })
    },
    []
  )

  useEffect(() => {
    if (!isDraggingRef.current) return

    const onMove = (e: PointerEvent) => {
      if (!floatEl.current || !isDraggingRef.current) return
      const dx = e.clientX - startPos.current.x
      const dy = e.clientY - startPos.current.y
      floatEl.current.style.transform = `translate(${dx}px, ${dy}px)`
    }

    const onUp = (e: PointerEvent) => {
      if (!isDraggingRef.current) return

      const els = document.elementsFromPoint(e.clientX, e.clientY)
      const colEl = els.find((el) => (el as HTMLElement).dataset?.dropColumn)
      const col = colEl ? (colEl as HTMLElement).dataset.dropColumn as TaskStatus : null

      if (col && dragState.taskId) {
        onDrop(dragState.taskId, col)
      }
      if (floatEl.current && !col) {
        floatEl.current.style.transition = 'transform 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.2s'
        floatEl.current.style.transform = 'translate(0px, 0px) scale(0.95)'
        floatEl.current.style.opacity = '0'
      }
      setTimeout(cleanup, col ? 0 : 280)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [dragState.taskId, onDrop, cleanup])

  return {
    isDragging: dragState.taskId !== null,
    dragState,
    draggedTaskId: dragState.taskId,
    overColumn: dragState.overColumn,
    startDrag,
    setOverColumn,
  }
}
