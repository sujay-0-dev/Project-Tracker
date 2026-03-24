import { useState, useEffect, useCallback } from 'react'
import type { CollabUser } from '../types'

const collabPeople: CollabUser[] = [
  { id: 'c1', name: 'Mia Wong',     initials: 'MW', color: '#f97316', currentTaskId: null },
  { id: 'c2', name: 'Omar Fayed',   initials: 'OF', color: '#14b8a6', currentTaskId: null },
  { id: 'c3', name: 'Dana Brooks',  initials: 'DB', color: '#a855f7', currentTaskId: null },
]

export function useCollabSim(taskIds: string[]) {
  const [collabUsers, setCollabUsers] = useState<CollabUser[]>(collabPeople)

  const moveSomeone = useCallback(() => {
    if (taskIds.length === 0) return
    setCollabUsers((prev) => {
      const next = [...prev]
      const count = Math.random() < 0.5 ? 1 : 2
      const shuffled = [...next].sort(() => Math.random() - 0.5)
      for (let i = 0; i < count; i++) {
        const user = shuffled[i]
        const idx = next.findIndex((u) => u.id === user.id)
        const goNull = Math.random() < 0.15
        next[idx] = {
          ...user,
          currentTaskId: goNull
            ? null
            : taskIds[Math.floor(Math.random() * taskIds.length)],
        }
      }
      return next
    })
  }, [taskIds])

  useEffect(() => {
    if (taskIds.length === 0) return
    setCollabUsers((prev) =>
      prev.map((u) => ({
        ...u,
        currentTaskId: taskIds[Math.floor(Math.random() * taskIds.length)],
      }))
    )
    const delay = () => 3000 + Math.random() * 1000
    let timer: ReturnType<typeof setTimeout>
    const schedule = () => {
      timer = setTimeout(() => {
        moveSomeone()
        schedule()
      }, delay())
    }
    schedule()
    return () => clearTimeout(timer)
  }, [taskIds.length > 0 ? 'ready' : 'empty', moveSomeone])

  const presenceMap: Record<string, CollabUser[]> = {}
  for (const u of collabUsers) {
    if (u.currentTaskId) {
      if (!presenceMap[u.currentTaskId]) presenceMap[u.currentTaskId] = []
      presenceMap[u.currentTaskId].push(u)
    }
  }

  const activeCount = collabUsers.filter((u) => u.currentTaskId !== null).length

  return { collabUsers, presenceMap, activeCount }
}
