import { useState } from 'react';
import Sidebar from './components/Sidebar';
import SimulatorPage from './pages/SimulatorPage';
import TruthTablePage from './pages/TruthTablePage';
import LogicGatePage from './pages/LogicGatePage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';

export default function App() {
  const [activePage, setActivePage] = useState('simulator');

  const renderPage = () => {
    if (activePage === 'truth-table') return <TruthTablePage />;
    if (activePage === 'logic-gate') return <LogicGatePage />;
    if (activePage === 'about') return <AboutPage />;
    if (activePage === 'help') return <HelpPage />;
    return <SimulatorPage />;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{renderPage()}</main>
      </div>
    </div>
  );
}
