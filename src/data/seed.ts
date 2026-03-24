import type { Task, Priority, TaskStatus } from '../types'
import { USERS } from './users'

const titlePool = [
  'Set up CI/CD pipeline',
  'Fix authentication bug in login flow',
  'Design onboarding screens',
  'Write unit tests for API layer',
  'Migrate database to PostgreSQL',
  'Implement dark mode toggle',
  'Code review: payment module',
  'Update API documentation',
  'Refactor user service',
  'Add error boundary components',
  'Set up Sentry error tracking',
  'Design system: button variants',
  'Implement CSV export feature',
  'Fix memory leak in dashboard',
  'Add pagination to user list',
  'Set up staging environment',
  'Write e2e tests with Playwright',
  'Implement JWT refresh tokens',
  'Create admin dashboard layout',
  'Add data validation to forms',
  'Performance audit — main bundle',
  'Fix CORS issue on /api/upload',
  'Implement file upload with progress',
  'Update dependency packages',
  'Create custom date picker component',
  'Investigate slow query on reports',
  'Design empty state illustrations',
  'Implement role-based permissions',
  'Add analytics event tracking',
  'Fix mobile navigation overflow',
  'Build notification system',
  'Set up Redis caching layer',
  'Create API rate limiting middleware',
  'Implement search with debounce',
  'Add keyboard shortcuts',
  'Fix TypeScript strict mode errors',
  'Implement drag to reorder',
  'Write migration scripts',
  'Set up monitoring alerts',
  'Build report export to PDF',
  'Design loading skeleton states',
  'Implement infinite scroll',
  'Fix timezone handling in scheduler',
  'Add multi-language support (i18n)',
  'Resolve merge conflicts in main',
  'Implement OAuth2 social login',
  'Create custom tooltip component',
  'Audit and fix accessibility issues',
  'Optimize image loading (lazy)',
  'Implement real-time updates via WebSocket',
  'Create billing integration',
  'Fix broken links in email templates',
  'Database index optimization',
  'Build user activity feed',
  'Add two-factor authentication',
  'Implement webhook system',
  'Design modal dialog component',
  'Write API integration tests',
  'Set up feature flags system',
  'Implement undo/redo functionality',
  'Create data export pipeline',
  'Fix padding inconsistencies in cards',
  'Add chart components to dashboard',
  'Implement comment threading',
  'Set up A/B testing framework',
  'Fix race condition in async handler',
  'Build customer feedback widget',
  'Implement SSR for landing page',
  'Create backup and restore script',
  'Design error page (404, 500)',
  'Refactor Redux to Zustand',
  'Add automated accessibility tests',
  'Implement audit log system',
  'Fix scroll restoration on nav',
  'Create reusable table component',
  'Set up Storybook for components',
  'Implement batch operations UI',
  'Write performance benchmarks',
  'Fix date formatting inconsistency',
  'Add data masking for PII fields',
  'Implement smart retry logic',
  'Create API versioning strategy',
  'Build custom form validation hook',
  'Implement workspace switching',
  'Fix broken tests after refactor',
  'Add click outside to close dropdowns',
  'Set up ESLint + Prettier',
  'Implement lazy route splitting',
  'Create sidebar navigation',
  'Add avatar upload functionality',
  'Fix tooltip z-index issues',
  'Implement status page',
  'Write database seed scripts',
  'Add progress indicator to wizard',
  'Implement password strength meter',
  'Fix race condition in search',
  'Design confirmation dialog',
  'Add sorting to data tables',
  'Implement copy to clipboard',
  'Set up integration test environment',
  'Create shared component library',
  'Fix prod build size regression',
  'Implement multi-step form wizard',
]

const priorities: Priority[] = ['Critical', 'High', 'Medium', 'Low']
const statuses: TaskStatus[] = ['To Do', 'In Progress', 'In Review', 'Done']

function makeId(): string {
  return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  }) + '-' + Date.now().toString(36)
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomDate(from: Date, to: Date): Date {
  return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()))
}

const NOW = new Date('2026-03-24')
const pastFar = new Date(NOW)
pastFar.setDate(NOW.getDate() - 60)
const futureEnd = new Date(NOW)
futureEnd.setDate(NOW.getDate() + 90)

export function generateTasks(count = 520): Task[] {
  const tasks: Task[] = []

  for (let i = 0; i < count; i++) {
    const titleBase = titlePool[i % titlePool.length]
    const title = i < titlePool.length
      ? titleBase
      : `${titleBase} (v${Math.floor(i / titlePool.length) + 1})`

    const assignee = pick(USERS)
    const priority = pick(priorities)
    const status = pick(statuses)

    const isOverdue = Math.random() < 0.30
    const dueDate = isOverdue
      ? randomDate(pastFar, new Date(NOW.getTime() - 86400000)) // at least 1 day ago
      : randomDate(NOW, futureEnd)

    const hasStart = Math.random() > 0.20
    const startDate = hasStart
      ? randomDate(new Date(dueDate.getTime() - 30 * 86400000), dueDate)
      : null

    tasks.push({
      id: makeId(),
      title,
      assignee,
      priority,
      status,
      startDate,
      dueDate,
    })
  }

  return tasks
}

export const seedTasks = generateTasks(520)
