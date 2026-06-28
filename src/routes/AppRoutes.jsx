import PageLayout from '../components/layout/PageLayout';
import useHashRoute from '../hooks/useHashRoute';
import AboutPage from '../pages/AboutPage';
import HelpPage from '../pages/HelpPage';
import LandingPage from '../pages/LandingPage';
import MaterialDetailPage from '../pages/MaterialDetailPage';
import SimulationPage from '../pages/SimulationPage';
import { getMaterialSlug, isMaterialRoute } from './routeConfig';

const pageByPath = {
  '/': LandingPage,
  '/simulasi': SimulationPage,
  '/tentang': AboutPage,
  '/bantuan': HelpPage,
};

export default function AppRoutes() {
  const { path, search, navigate } = useHashRoute();
  const Page = isMaterialRoute(path) ? MaterialDetailPage : pageByPath[path] || LandingPage;
  const pageProps = isMaterialRoute(path) ? { slug: getMaterialSlug(path) } : { search };

  return (
    <PageLayout currentPath={path} onNavigate={navigate}>
      <Page onNavigate={navigate} {...pageProps} />
    </PageLayout>
  );
}
