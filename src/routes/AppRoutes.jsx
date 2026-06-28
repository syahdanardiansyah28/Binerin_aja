import PageLayout from '../components/layout/PageLayout';
import useHashRoute from '../hooks/useHashRoute';
import AboutPage from '../pages/AboutPage';
import HelpPage from '../pages/HelpPage';
import LandingPage from '../pages/LandingPage';
import SimulationPage from '../pages/SimulationPage';

const pageByPath = {
  '/': LandingPage,
  '/simulasi': SimulationPage,
  '/tentang': AboutPage,
  '/bantuan': HelpPage,
};

export default function AppRoutes() {
  const { path, navigate } = useHashRoute();
  const Page = pageByPath[path] || LandingPage;

  return (
    <PageLayout currentPath={path} onNavigate={navigate}>
      <Page onNavigate={navigate} />
    </PageLayout>
  );
}
