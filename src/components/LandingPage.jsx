function LandingPage({ onGetStarted, theme, onToggleTheme }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(70%_50%_at_20%_20%,rgba(79,70,229,0.38),rgba(15,23,42,0)_70%),radial-gradient(65%_55%_at_80%_80%,rgba(16,185,129,0.34),rgba(15,23,42,0)_70%),linear-gradient(120deg,#020617,#0f172a,#1e1b4b)] px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="animate-float-medium absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="animate-float-slow absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-slate-100 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
          >
            {theme === "dark" ? "Dark" : "Light"} Mode
          </button>
        </div>
        <div className="grid items-center gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur-2xl sm:p-10 lg:grid-cols-2 lg:p-12">
          <div className="space-y-6">
            <p className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
              Personal Finance
            </p>
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              EXPTRACK
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-200 sm:text-xl">
              Track your expenses. Control your future.
            </p>
            <button
              type="button"
              onClick={onGetStarted}
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary-500 to-indigo-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition duration-300 hover:-translate-y-0.5 hover:from-primary-400 hover:to-indigo-400 hover:shadow-indigo-500/50"
            >
              Get Started
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="animate-float-medium absolute inset-0 scale-110 rounded-[2rem] bg-gradient-to-br from-primary-500/40 to-emerald-400/30 blur-2xl" />
              <div className="relative rounded-[2rem] border border-white/20 bg-slate-900/60 p-7 shadow-2xl shadow-slate-950/60 backdrop-blur">
                <svg
                  width="220"
                  height="220"
                  viewBox="0 0 220 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-52 w-52 sm:h-56 sm:w-56"
                >
                  <rect x="30" y="34" width="160" height="152" rx="20" fill="#0F172A" />
                  <rect x="30" y="34" width="160" height="152" rx="20" stroke="#334155" />
                  <rect x="52" y="62" width="116" height="10" rx="5" fill="#334155" />
                  <rect x="52" y="82" width="92" height="10" rx="5" fill="#1E293B" />
                  <rect x="52" y="116" width="22" height="52" rx="6" fill="#4F46E5" />
                  <rect x="86" y="98" width="22" height="70" rx="6" fill="#10B981" />
                  <rect x="120" y="130" width="22" height="38" rx="6" fill="#F59E0B" />
                  <rect x="154" y="104" width="22" height="64" rx="6" fill="#22D3EE" />
                  <circle cx="172" cy="48" r="16" fill="#4F46E5" />
                  <path
                    d="M165 48H179M172 41V55"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-wider text-slate-300">Live Overview</p>
                  <p className="mt-1 text-sm font-semibold text-white">Monthly Budget Confidence +24%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;

