import { useState } from 'react';
import Button from '../common/Button';
import Container from '../common/Container';
import AppLogo from './AppLogo';
import { appRoutes } from '../../routes/routeConfig';

export default function Navbar({ currentPath, isLightMode, onNavigate, onToggleTheme, theme }) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (path) => {
    onNavigate(path);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 h-[72px] border-b border-linear-border/70 bg-linear-bg/95 shadow-hairline">
      <Container className="flex h-full items-center justify-between gap-4">
        <button className="min-w-0 text-left" type="button" onClick={() => handleNavigate('/')}>
          <AppLogo />
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {appRoutes.map((route) => (
            <button
              key={route.path}
              className={`min-h-11 rounded-md px-3 text-sm transition ${
                currentPath === route.path ? 'bg-linear-surface2 text-linear-strong shadow-hairline' : 'text-linear-muted hover:text-linear-text'
              }`}
              type="button"
              onClick={() => handleNavigate(route.path)}
            >
              {route.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle isLightMode={isLightMode} onToggle={onToggleTheme} theme={theme} />
          <Button variant="primary" onClick={() => handleNavigate('/simulasi')}>Mulai Simulasi</Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle isLightMode={isLightMode} onToggle={onToggleTheme} theme={theme} />
          <button
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-linear-border/70 bg-linear-surface2 text-linear-text"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            <span className="font-mono">{open ? 'X' : '='}</span>
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-b border-linear-border/70 bg-linear-surface lg:hidden">
          <Container className="grid gap-2 py-3">
            {appRoutes.map((route) => (
              <button
                key={route.path}
                className={`min-h-12 rounded-md px-3 text-left text-sm ${
                  currentPath === route.path ? 'bg-linear-surface2 text-linear-strong shadow-hairline' : 'text-linear-muted'
                }`}
                type="button"
                onClick={() => handleNavigate(route.path)}
              >
                {route.label}
              </button>
            ))}
            <Button className="rounded-md" variant="primary" onClick={() => handleNavigate('/simulasi')}>
              Mulai Simulasi
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}

function ThemeToggle({ isLightMode, onToggle, theme }) {
  const label = isLightMode ? 'Mode siang aktif' : 'Mode gelap aktif';

  return (
    <button
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-linear-border/70 bg-linear-surface2 text-linear-text transition hover:bg-linear-line/40"
      type="button"
      onClick={onToggle}
      aria-label={`${label}. Klik untuk mengganti mode.`}
      title={label}
    >
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M20.1 14.5A7.7 7.7 0 0 1 9.5 3.9 8.2 8.2 0 1 0 20.1 14.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.8V5M12 19v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.8 12H5M19 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
