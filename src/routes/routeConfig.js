export const appRoutes = [
  { path: '/', label: 'Alur Evolusi' },
  { path: '/simulasi', label: 'Simulasi' },
  { path: '/tentang', label: 'Tentang' },
  { path: '/bantuan', label: 'Bantuan' },
];

export function parseRouteTarget(target = '/') {
  const normalizedTarget = target || '/';
  const queryIndex = normalizedTarget.indexOf('?');
  const pathname = queryIndex >= 0 ? normalizedTarget.slice(0, queryIndex) : normalizedTarget;
  const search = queryIndex >= 0 ? normalizedTarget.slice(queryIndex) : '';

  return {
    pathname: pathname || '/',
    search,
    fullPath: `${pathname || '/'}${search}`,
  };
}

export function isMaterialRoute(path) {
  const { pathname } = parseRouteTarget(path);
  return /^\/materi\/[^/]+$/.test(pathname);
}

export function getMaterialSlug(path) {
  const { pathname } = parseRouteTarget(path);
  return decodeURIComponent(pathname.replace(/^\/materi\//, ''));
}

export function isKnownRoute(path) {
  const { pathname } = parseRouteTarget(path);
  return appRoutes.some((route) => route.path === pathname) || isMaterialRoute(pathname);
}
