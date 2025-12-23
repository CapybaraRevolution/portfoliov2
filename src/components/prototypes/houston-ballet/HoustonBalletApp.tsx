'use client';

/**
 * 🎭 JixTix Houston Ballet App
 * 
 * ARCHITECTURE:
 * - The app content is fully responsive and uses safe-area-insets
 * - The phone mockup is a separate wrapper for demo/client viewing
 * - Navigation is simple state-based
 * 
 * CURRENT STATE:
 * - Uses mock data from ./mockData
 * - No real auth (everyone's "logged in")
 * - Full ticket carousel with swipe support
 */

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PerformanceList from './PerformanceList';
import QRCodeView from './QRCodeView';
import SideMenu from './SideMenu';
import AccountSettings from './AccountSettings';
import PlanningYourVisit from './PlanningYourVisit';
import PastPerformances from './PastPerformances';
import { mockPerformances, mockPastPerformances, type Performance } from './mockData';

type ViewType = 'tickets' | 'settings' | 'planning' | 'transfers' | 'history';

export default function HoustonBalletApp() {
  const [selectedPerformance, setSelectedPerformance] = useState<Performance | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('tickets');

  const handleNavigate = (view: string) => {
    setCurrentView(view as ViewType);
    setSelectedPerformance(null);
  };

  const handleBackToTickets = () => {
    setCurrentView('tickets');
  };

  return (
    <div className="h-full w-full bg-white relative overflow-hidden">
      <AnimatePresence mode="wait">
        {currentView === 'tickets' && selectedPerformance ? (
          <QRCodeView 
            key="qr-view"
            performance={selectedPerformance}
            onBack={() => setSelectedPerformance(null)}
          />
        ) : currentView === 'tickets' ? (
          <PerformanceList 
            key="list-view"
            performances={mockPerformances}
            onSelectPerformance={setSelectedPerformance}
            onOpenMenu={() => setIsMenuOpen(true)}
          />
        ) : currentView === 'settings' ? (
          <AccountSettings 
            key="settings-view"
            onBack={handleBackToTickets}
          />
        ) : currentView === 'planning' ? (
          <PlanningYourVisit 
            key="planning-view"
            onBack={handleBackToTickets}
          />
        ) : currentView === 'history' ? (
          <PastPerformances 
            key="history-view"
            performances={mockPastPerformances}
            onBack={handleBackToTickets}
          />
        ) : null}
      </AnimatePresence>

      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
