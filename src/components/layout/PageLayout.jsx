import Footer from './Footer';
import Navbar from './Navbar';
import useTheme from '../../hooks/useTheme';

export default function PageLayout({ currentPath, onNavigate, children }) {
  const { theme, isLightMode, toggleTheme } = useTheme();

  return (
    <div className="theme-transition min-h-screen bg-linear-bg text-linear-text">
      <Navbar
        currentPath={currentPath}
        isLightMode={isLightMode}
        onNavigate={onNavigate}
        onToggleTheme={toggleTheme}
        theme={theme}
      />
      <main>{children}</main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
