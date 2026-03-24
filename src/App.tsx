import { useMemo, useState } from 'react'
import { useTaskStore } from './store/useTaskStore'
import { useCollabSim } from './hooks/useCollabSim'
import { Header } from './components/Layout/Header'
import { FilterBar } from './components/Layout/FilterBar'
import { CollabBar } from './components/Shared/CollabBar'
import { KanbanBoard } from './components/Kanban/KanbanBoard'
import { ListView } from './components/ListView/ListView'
import { TimelineView } from './components/Timeline/TimelineView'

export type View = 'kanban' | 'list' | 'timeline'

export default function App() {
  const [activeView, setActiveView] = useState<View>('kanban')

  const tasks = useTaskStore((s) => s.tasks)
  const allIds = useMemo(() => tasks.map((t) => t.id), [tasks])

  const { collabUsers, presenceMap, activeCount } = useCollabSim(allIds)

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-surface">
      <Header activeView={activeView} onViewChange={setActiveView} />
      <CollabBar activeCount={activeCount} users={collabUsers} />
      <FilterBar />

      <main className="flex-1 overflow-hidden">
        {activeView === 'kanban'   && <KanbanBoard presenceMap={presenceMap} />}
        {activeView === 'list'     && <ListView />}
        {activeView === 'timeline' && <TimelineView />}
      </main>
    </div>
  )
}
