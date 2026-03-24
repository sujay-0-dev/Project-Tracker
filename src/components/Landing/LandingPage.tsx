import { useNavigate } from 'react-router-dom'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface flex flex-col text-text-primary selection:bg-accent/30 selection:text-white">
      {/* nav */}
      <nav className="h-16 flex items-center justify-between px-6 md:px-12 border-b border-surface-border bg-surface-card/60 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-lg shadow-tab">
            PT
          </div>
          <span className="font-bold text-lg tracking-tight">ProjectTracker</span>
        </div>
        <button
          onClick={() => navigate('/tracker')}
          className="px-5 py-2 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          Launch App
        </button>
      </nav>

      {/* hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        {/* decor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl animate-in fade-in slide-in-from-bottom-5 duration-700">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Management that feels <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-indigo-400">
              hand-crafted.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
            A production-grade multi-view tracker built for teams who value 
            speed, clarity, and beautiful design. No bloat, just performance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/tracker')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-accent hover:bg-accent-hover text-white font-bold text-lg transition-all shadow-tab hover:shadow-2xl active:scale-[0.98]"
            >
              Get Started for Free
            </button>
            <a 
              href="https://github.com/sujay-0-dev/Project-Tracker"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-surface-raised border border-surface-border text-text-primary font-bold text-lg hover:bg-surface-hover transition-all"
            >
              View Source
            </a>
          </div>
        </div>

        {/* preview/mockup */}
        <div className="mt-20 relative z-10 max-w-5xl w-full px-4 transform transition-all duration-700 hover:scale-[1.01]">
          <div className="rounded-2xl border border-surface-border bg-surface-card shadow-[0_0_60px_rgba(79,70,229,0.12)] overflow-hidden relative group">
             {/* gradient glow behind mockup */}
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
            
            <img 
              src="/dashboard-preview.png"
              alt="Project Tracker Dashboard Preview"
              className="w-full h-auto block select-none"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-surface/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </main>

      {/* features */}
      <section className="px-6 py-24 bg-surface-raised/30 border-t border-surface-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <h3 className="text-xl font-bold">Kanban Excellence</h3>
            <p className="text-text-muted leading-relaxed">
              Pointer-based drag and drop built from scratch. No heavy libraries, 
              just smooth interactions and zero layout shift.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            </div>
            <h3 className="text-xl font-bold">Virtualized Lists</h3>
            <p className="text-text-muted leading-relaxed">
              Handle thousands of tasks with 60fps performance using custom 
              windowing logic. Your browser won't even sweat.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold">Timeline View</h3>
            <p className="text-text-muted leading-relaxed">
              Visualize deadlines with a pixel-perfect Gantt chart. 
              Track progress over weeks and months with ease.
            </p>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="py-12 px-6 border-t border-surface-border text-center">
        <p className="text-sm text-text-muted">
          &copy; 2026 ProjectTracker. Built for the modern web.
        </p>
      </footer>
    </div>
  )
}
