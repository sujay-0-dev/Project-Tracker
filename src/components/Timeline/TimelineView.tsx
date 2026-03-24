import { useMemo, useRef } from 'react'
import { useFilteredTasks } from '../../hooks/useFilteredTasks'
import type { Priority } from '../../types'

const TODAY = new Date('2026-03-24')
const YEAR  = TODAY.getFullYear()
const MONTH = TODAY.getMonth()
const CELL  = 36
const ROW_H = 44

const priorityColors: Record<Priority, { bar: string; glow: string }> = {
  Critical: { bar: '#f43f5e', glow: 'rgba(244,63,94,0.3)' },
  High:     { bar: '#f97316', glow: 'rgba(249,115,22,0.3)' },
  Medium:   { bar: '#f59e0b', glow: 'rgba(245,158,11,0.3)' },
  Low:      { bar: '#10b981', glow: 'rgba(16,185,129,0.3)' },
}

function getDaysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate()
}

export function TimelineView() {
  const tasks = useFilteredTasks()
  const scrollRef = useRef<HTMLDivElement>(null)

  const days = getDaysInMonth(YEAR, MONTH)
  const totalW = days * CELL
  const todayDay = TODAY.getDate()
  const monthName = new Date(YEAR, MONTH).toLocaleString('en-US', { month: 'long', year: 'numeric' })

  const visible = useMemo(() => {
    const ms = new Date(YEAR, MONTH, 1)
    const me = new Date(YEAR, MONTH, days, 23, 59)
    return tasks.filter((t) => {
      const s = t.startDate ?? t.dueDate
      return s <= me && t.dueDate >= ms
    })
  }, [tasks, days])

  function dayOff(date: Date): number {
    const d = new Date(date); d.setHours(0,0,0,0)
    const start = new Date(YEAR, MONTH, 1)
    return Math.max(0, Math.min(Math.round((d.getTime() - start.getTime()) / 86400000), days - 1))
  }

  function barProps(task: typeof tasks[0]) {
    if (!task.startDate) {
      const d = dayOff(task.dueDate)
      return { left: d * CELL, width: CELL, single: true }
    }
    const s = dayOff(task.startDate), e = dayOff(task.dueDate)
    return { left: s * CELL, width: Math.max(CELL, (e - s + 1) * CELL), single: false }
  }

  const dayNums = Array.from({ length: days }, (_, i) => i + 1)
  const isWeekend = (day: number) => {
    const wd = new Date(YEAR, MONTH, day).getDay()
    return wd === 0 || wd === 6
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* title bar */}
      <div className="shrink-0 flex items-center justify-between px-6 py-3 border-b border-surface-border bg-surface-card/80">
        <div>
          <h2 className="text-sm font-semibold text-text-primary">{monthName}</h2>
          <p className="text-2xs text-text-muted mt-0.5">{visible.length} tasks in view</p>
        </div>
        <div className="flex items-center gap-4 text-2xs text-text-muted">
          {(['Critical','High','Medium','Low'] as Priority[]).map((p) => (
            <span key={p} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: priorityColors[p].bar }} />
              {p}
            </span>
          ))}
          <span className="flex items-center gap-1.5 ml-2">
            <span className="w-px h-3 bg-rose-400" />
            Today
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-48 shrink-0 border-r border-surface-border overflow-y-auto bg-surface-card/40">
          <div className="h-9 border-b border-surface-border sticky top-0 bg-surface-card/90 backdrop-blur-sm" />
          {visible.map((task) => (
            <div
              key={task.id}
              className="flex items-center px-3 gap-2 border-b border-surface-border/30"
              style={{ height: ROW_H }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: priorityColors[task.priority].bar }}
              />
              <span className="text-xs text-text-secondary truncate leading-tight">{task.title}</span>
            </div>
          ))}
        </div>

        <div ref={scrollRef} className="flex-1 overflow-x-auto overflow-y-auto">
          <div style={{ width: Math.max(totalW, 600), minWidth: '100%' }}>
            {/* day header */}
            <div
              className="flex border-b border-surface-border sticky top-0 z-10 bg-surface-card/95 backdrop-blur-sm"
              style={{ height: 36 }}
            >
              {dayNums.map((day) => (
                <div
                  key={day}
                  className="shrink-0 flex items-center justify-center text-2xs border-r border-surface-border/20"
                  style={{
                    width: CELL,
                    color: day === todayDay ? '#f87171' : isWeekend(day) ? '#334155' : '#475569',
                    fontWeight: day === todayDay ? 700 : 400,
                    background: isWeekend(day) ? 'rgba(30,34,52,0.5)' : 'transparent',
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* task rows */}
            <div className="relative">
              {/* today line */}
              <div
                className="absolute top-0 bottom-0 z-20 pointer-events-none"
                style={{
                  left: (todayDay - 1) * CELL + CELL / 2,
                  width: 1,
                  background: 'linear-gradient(180deg, #f87171, rgba(248,113,113,0.1))',
                }}
              />

              {visible.map((task, ri) => {
                const { left, width, single } = barProps(task)
                const { bar, glow } = priorityColors[task.priority]
                const overdue = task.dueDate < TODAY
                const isAlt = ri % 2 === 1

                return (
                  <div
                    key={task.id}
                    className="relative border-b border-surface-border/20"
                    style={{ height: ROW_H, background: isAlt ? 'rgba(19,20,28,0.5)' : 'transparent' }}
                  >
                    {/* weekend shading */}
                    {dayNums.filter(isWeekend).map((d) => (
                      <div
                        key={d}
                        className="absolute top-0 bottom-0"
                        style={{ left: (d-1)*CELL, width: CELL, background: 'rgba(30,34,52,0.3)' }}
                      />
                    ))}

                    {/* bar */}
                    <div
                      title={`${task.title} · ${task.priority}`}
                      className="absolute top-1/2 -translate-y-1/2 flex items-center px-2 cursor-default"
                      style={{
                        left,
                        width,
                        height: single ? 14 : 24,
                        borderRadius: single ? 999 : 6,
                        background: overdue
                          ? `repeating-linear-gradient(45deg, ${bar}90, ${bar}90 4px, ${bar}40 4px, ${bar}40 8px)`
                          : `linear-gradient(90deg, ${bar}ee, ${bar}bb)`,
                        boxShadow: `0 0 8px ${glow}`,
                        border: overdue ? `1px solid ${bar}60` : 'none',
                        minWidth: CELL,
                      }}
                    >
                      {!single && width > 72 && (
                        <span className="text-2xs text-white/90 truncate leading-none font-medium">
                          {task.title}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
