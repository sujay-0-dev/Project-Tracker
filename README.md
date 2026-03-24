# Project Tracker

This is a multi-view project tracker built using React 18, TypeScript, Tailwind, and Zustand for state. I focused on making it performant (handles ~500+ tasks easily) and building the core mechanics (drag-and-drop, virtual scroll) from scratch rather than reaching for heavy libraries.

### To get it running:
```bash
pnpm install
pnpm dev
```
By default it should be on [http://localhost:5173](http://localhost:5173).

For production builds: `pnpm build` followed by `pnpm preview`.

---

### Technical Choices

**Zustand instead of Context API**
I went with Zustand because it's way easier to handle selective re-renders. In a dashboard like this where the Kanban board moves constantly, I didn't want the entire app tree re-rendering every time a card is dragged. Using selectors means only the column or card that actually changed gets touched by React. Also, it's nice not to have a million "Providers" wrapping everything in `main.tsx`.

**Filtering logic**
The filtering is done through a `useFilteredTasks` hook. It's synced with the URL using `react-router-dom` search params, so you can refresh the page and keep your filters. I used `useMemo` here so the filtered array reference stays stable unless the raw tasks or the filter settings actually change. This fixed one nasty infinite loop I hit where the App was crashing on start.

**Custom Virtual Scroll**
The `VirtualList` is a manually written scroller. It measures the container with a `ResizeObserver` and determines what rows to render based on `scrollTop`. I hardcoded `ROW_HEIGHT` to 48px to keep it simple. It renders a few buffer rows above and below the viewport so you don't see any white flickering when scrolling fast. It's solid for the 520 tasks I'm seeding, but would hold up even at 5,000+.

**Custom Drag and Drop**
Instead of `react-beautiful-dnd` (which is huge and sometimes janky), I built a small pointer-event based system in `useDragDrop.ts`. 
- When you grab a card, I clone the node and stick it on the body as a "ghost". 
- While moving, it's just a 2D transform (very cheap).
- On drop, I use `document.elementsFromPoint` to figure out which column you're over.
The trickiest part was the placeholder — I just render an empty div with a dashed border that has the same height as the card so the column layout doesn't collapse when you start dragging.

---

### Structure
- `src/store/useTaskStore.ts`: Global state for tasks, filters, and sorting.
- `src/hooks/useVirtualScroll.ts`: The logic for the list view performance.
- `src/hooks/useDragDrop.ts`: The pointer-event orchestration.
- `src/components/Kanban/`: All the board logic.
- `src/components/Timeline/`: Calendar/Gantt view implementation.
