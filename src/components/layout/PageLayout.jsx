import Footer from './Footer';
import Navbar from './Navbar';

export default function PageLayout({ currentPath, onNavigate, children }) {
  return (
    <div className="min-h-screen bg-linear-bg text-linear-text">
      <Navbar currentPath={currentPath} onNavigate={onNavigate} />
      <main>{children}</main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
