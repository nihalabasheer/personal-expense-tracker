import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/app/dashboard", label: "Dashboard", icon: "M4 6h16M4 12h16M4 18h10" },
  { to: "/app/add-expense", label: "Add Expense", icon: "M12 5v14M5 12h14" },
  { to: "/app/analytics", label: "Analytics", icon: "M4 19V5M10 19V9M16 19v-6M22 19V3" },
];

function Sidebar() {
  return (
    <aside className="flex w-full flex-col border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/80 lg:fixed lg:inset-y-0 lg:w-64 lg:border-b-0 lg:border-r">
      <div className="border-b border-slate-200/70 px-5 py-6 dark:border-slate-700/70">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
          EXPTRACK
        </p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Expense Manager</p>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-3 py-4 lg:flex-col lg:gap-1 lg:px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "inline-flex min-w-fit items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-300 lg:w-full",
                isActive
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
              ].join(" ")
            }
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path
                d={item.icon}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
