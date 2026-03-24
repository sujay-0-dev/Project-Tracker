import { useRef, useState, useCallback, useEffect } from 'react'

const ROW_HEIGHT = 48
const BUFFER = 5 // rows to render beyond visible area

interface VirtualScrollResult {
  containerRef: React.RefObject<HTMLDivElement>
  startIdx: number
  endIdx: number
  totalHeight: number
  offsetTop: number
}

export function useVirtualScroll(itemCount: number): VirtualScrollResult {
  const containerRef = useRef<HTMLDivElement>(null!)
  const [scrollTop, setScrollTop] = useState(0)
  const [containerHeight, setContainerHeight] = useState(600)

  const totalHeight = itemCount * ROW_HEIGHT

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop)
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    el.addEventListener('scroll', handleScroll, { passive: true })

    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        setContainerHeight(e.contentRect.height)
      }
    })
    ro.observe(el)
    setContainerHeight(el.clientHeight)

    return () => {
      el.removeEventListener('scroll', handleScroll)
      ro.disconnect()
    }
  }, [handleScroll])

  const visibleCount = Math.ceil(containerHeight / ROW_HEIGHT)
  const rawStart = Math.floor(scrollTop / ROW_HEIGHT)

  const startIdx = Math.max(0, rawStart - BUFFER)
  const endIdx = Math.min(itemCount - 1, rawStart + visibleCount + BUFFER)
  const offsetTop = startIdx * ROW_HEIGHT

  return { containerRef, startIdx, endIdx, totalHeight, offsetTop }
}
