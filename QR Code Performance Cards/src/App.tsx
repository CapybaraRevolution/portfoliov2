import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import PerformanceList, { Performance } from './components/PerformanceList';
import QRCodeView from './components/QRCodeView';
import SideMenu from './components/SideMenu';
import AccountSettings from './components/AccountSettings';
import PlanningYourVisit from './components/PlanningYourVisit';

const mockPerformances: Performance[] = [
  {
    id: '1',
    title: 'The Nutcracker',
    date: 'Dec 20, 2025',
    time: '7:30 PM',
    venue: 'Wortham Theater Center',
    seats: 'Orchestra, Row F, Seats 12-13',
    image: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRjcmFja2VyJTIwYmFsbGV0fGVufDF8fHx8MTc2NTMwODAwOXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '2',
    title: 'Swan Lake',
    date: 'Jan 15, 2026',
    time: '8:00 PM',
    venue: 'Wortham Theater Center',
    seats: 'Mezzanine, Row C, Seats 8-9',
    image: 'https://images.unsplash.com/photo-1684251198295-6c0682080278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FuJTIwbGFrZSUyMGJhbGxldHxlbnwxfHx8fDE3NjUyNDQ1NTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '3',
    title: 'Giselle',
    date: 'Feb 22, 2026',
    time: '7:30 PM',
    venue: 'Wortham Theater Center',
    seats: 'Orchestra, Row D, Seats 15-16',
    image: 'https://images.unsplash.com/photo-1760543320338-7bde1336eaef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxsZXQlMjBwZXJmb3JtYW5jZSUyMHN0YWdlfGVufDF8fHx8MTc2NTI4ODgwMnww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

type ViewType = 'tickets' | 'settings' | 'planning' | 'transfers';

export default function App() {
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Mobile Container */}
      <div className="w-full max-w-[390px] h-[844px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-900 relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-50" />
        
        {/* App Content */}
        <div className="h-full relative">
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
            ) : null}
          </AnimatePresence>

          {/* Side Menu */}
          <SideMenu 
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)}
            onNavigate={handleNavigate}
          />
        </div>
      </div>
    </div>
  );
}