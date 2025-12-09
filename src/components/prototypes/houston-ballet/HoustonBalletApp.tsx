'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PerformanceList, { type Performance } from './PerformanceList'
import QRCodeView from './QRCodeView'
import SideMenu from './SideMenu'
import AccountSettings from './AccountSettings'
import PlanningYourVisit from './PlanningYourVisit'

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
]

type ViewType = 'tickets' | 'settings' | 'planning' | 'transfers'

export default function HoustonBalletApp() {
  const [selectedPerformance, setSelectedPerformance] = useState<Performance | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState<ViewType>('tickets')

  const handleNavigate = (view: string) => {
    setCurrentView(view as ViewType)
    setSelectedPerformance(null)
  }

  const handleBackToTickets = () => {
    setCurrentView('tickets')
  }

  return (
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
  )
}
