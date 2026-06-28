import { useEffect, useState } from 'react';
import { isKnownRoute, parseRouteTarget } from '../routes/routeConfig';

function readRoute() {
  const target = window.location.hash.replace(/^#/, '') || '/';
  const route = parseRouteTarget(target);

  return isKnownRoute(route.fullPath) ? route : parseRouteTarget('/');
}

export default function useHashRoute() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (nextPath) => {
    if (!isKnownRoute(nextPath)) return;
    const nextRoute = parseRouteTarget(nextPath);

    if (readRoute().fullPath === nextRoute.fullPath) {
      setRoute(nextRoute);
      return;
    }
    window.location.hash = nextRoute.fullPath;
  };

  return { ...route, path: route.pathname, navigate };
}
