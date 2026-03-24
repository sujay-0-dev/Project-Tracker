import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './components/Landing/LandingPage'
import { Dashboard } from './pages/Dashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/tracker" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
