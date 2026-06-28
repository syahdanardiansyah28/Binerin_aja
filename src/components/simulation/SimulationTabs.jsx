export default function SimulationTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-linear-border/70 bg-linear-surface p-2">
      <div className="flex min-w-max gap-2">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              className={`min-h-11 rounded-full px-4 text-sm transition ${
                active
                  ? 'bg-linear-cta text-linear-bg shadow-primary'
                  : 'text-linear-muted hover:bg-linear-surface2 hover:text-linear-text'
              }`}
              type="button"
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
