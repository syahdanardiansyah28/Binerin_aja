export const appRoutes = [
  { path: '/', label: 'Alur Evolusi' },
  { path: '/simulasi', label: 'Simulasi' },
  { path: '/tentang', label: 'Tentang' },
  { path: '/bantuan', label: 'Bantuan' },
];

export function isKnownRoute(path) {
  return appRoutes.some((route) => route.path === path);
}
