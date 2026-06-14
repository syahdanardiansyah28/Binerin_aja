const cards = [
  {
    title: 'Tujuan Aplikasi',
    content:
      'Membantu pengguna memahami ALU, operasi biner, dan gerbang logika secara visual, interaktif, dan mudah dicoba langsung.',
  },
  {
    title: 'Fitur Utama',
    content:
      'ALU Simulator, Logic Gate Simulator, Truth Table, Step By Step, BitTable, Visualisasi ALU, dan Visualisasi simbol logic gate.',
  },
  {
    title: 'Teknologi',
    content: 'React, Vite, Tailwind CSS, dan JavaScript.',
  },
  {
    title: 'Manfaat',
    content:
      'Cocok untuk belajar konsep register, carry, borrow, overflow, underflow, operasi bitwise, dan tabel kebenaran dengan tampilan modern.',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-5">
      <section className="cpu-card rounded p-5 sm:p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70">About Project</p>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Binerin Aja</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
          Binerin Aja adalah web simulator berbasis React Vite dan Tailwind CSS untuk memahami ALU, operasi biner, dan gerbang logika secara visual.
        </p>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((card, index) => (
          <section key={card.title} className="cpu-card rounded p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <span className="rounded border border-cyan-300/20 px-2 py-1 font-mono text-xs text-cyan-200/70">
                0{index + 1}
              </span>
            </div>
            <p className="text-sm leading-7 text-slate-300">{card.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
