import { useEffect, useState } from 'react';
import { isKnownRoute } from '../routes/routeConfig';

function readPath() {
  const path = window.location.hash.replace(/^#/, '') || '/';
  return isKnownRoute(path) ? path : '/';
}

export default function useHashRoute() {
  const [path, setPath] = useState(readPath);

  useEffect(() => {
    const handleHashChange = () => setPath(readPath());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (nextPath) => {
    if (!isKnownRoute(nextPath)) return;
    if (readPath() === nextPath) {
      setPath(nextPath);
      return;
    }
    window.location.hash = nextPath;
  };

  return { path, navigate };
}
