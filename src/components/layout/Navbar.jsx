import { useState } from 'react';
import Button from '../common/Button';
import Container from '../common/Container';
import AppLogo from './AppLogo';
import { appRoutes } from '../../routes/routeConfig';

export default function Navbar({ currentPath, onNavigate }) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (path) => {
    onNavigate(path);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 h-[72px] border-b border-white/[0.06] bg-linear-bg/95 shadow-hairline">
      <Container className="flex h-full items-center justify-between gap-4">
        <button className="min-w-0 text-left" type="button" onClick={() => handleNavigate('/')}>
          <AppLogo />
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {appRoutes.map((route) => (
            <button
              key={route.path}
              className={`min-h-11 rounded-md px-3 text-sm transition ${
                currentPath === route.path ? 'bg-white/[0.05] text-white' : 'text-linear-muted hover:text-linear-text'
              }`}
              type="button"
              onClick={() => handleNavigate(route.path)}
            >
              {route.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="primary" onClick={() => handleNavigate('/simulasi')}>Mulai Simulasi</Button>
        </div>

        <button
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-white/10 text-linear-text lg:hidden"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          <span className="font-mono">{open ? 'X' : '='}</span>
        </button>
      </Container>

      {open && (
        <div className="border-b border-white/[0.06] bg-linear-surface lg:hidden">
          <Container className="grid gap-2 py-3">
            {appRoutes.map((route) => (
              <button
                key={route.path}
                className={`min-h-12 rounded-md px-3 text-left text-sm ${
                  currentPath === route.path ? 'bg-white/[0.05] text-white' : 'text-linear-muted'
                }`}
                type="button"
                onClick={() => handleNavigate(route.path)}
              >
                {route.label}
              </button>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
