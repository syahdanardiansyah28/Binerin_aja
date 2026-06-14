const menus = [
  { id: 'simulator', label: 'Simulator' },
  { id: 'truth-table', label: 'Truth Table' },
  { id: 'logic-gate', label: 'Logic Gate' },
  { id: 'about', label: 'About' },
  { id: 'help', label: 'Help' },
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="cpu-card w-full shrink-0 rounded-none border-x-0 border-t-0 p-4 lg:min-h-screen lg:w-72 lg:rounded-none lg:border-y-0 lg:border-l-0">
      <div className="mb-4 flex items-center gap-3 lg:mb-8">
        <div className="grid h-11 w-11 place-items-center rounded border border-cyan-300/30 bg-cyan-300/10 font-mono text-lg font-bold text-cyan-200 shadow-neon">
          ALU
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/70">Simulator</p>
          <h1 className="text-xl font-semibold text-white">Binerin Aja</h1>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:overflow-visible lg:pb-0">
        {menus.map((item, index) => (
          <button
            key={item.id}
            className={`flex min-w-[150px] items-center justify-between rounded border px-4 py-3 text-left text-sm transition lg:min-w-0 ${
              activePage === item.id
                ? 'border-cyan-300/40 bg-cyan-300/12 text-cyan-100 shadow-neon'
                : 'border-white/8 bg-white/[0.03] text-slate-300 hover:border-cyan-300/30 hover:text-cyan-100'
            }`}
            type="button"
            onClick={() => setActivePage(item.id)}
          >
            <span>{item.label}</span>
            <span className="font-mono text-xs text-cyan-200/50">0{index + 1}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
