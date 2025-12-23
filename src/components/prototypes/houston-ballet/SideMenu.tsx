'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, MapPin, Settings, LogOut, X, RefreshCw, History } from 'lucide-react';

// Houston Ballet branding
const LOGO_URL = '/images/case-studies/houston-ballet/houston-ballet-logo.png';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

export default function SideMenu({ isOpen, onClose, onNavigate }: SideMenuProps) {
  const handleNavigate = (view: string) => {
    onNavigate(view);
    onClose();
  };

  const menuItems = [
    { icon: Ticket, label: 'My Tickets', active: true, view: 'tickets' },
    { icon: History, label: 'Performance History', active: false, view: 'history' },
    { icon: RefreshCw, label: 'Transfers', active: false, view: 'transfers', comingSoon: true },
    { icon: MapPin, label: 'Planning Your Visit', active: false, view: 'planning' },
    { icon: Settings, label: 'Account Settings', active: false, view: 'settings' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Side Menu */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 left-0 h-full w-[280px] bg-white z-50 shadow-2xl"
          >
            {/* Header */}
            <div className="pt-12 pb-6 px-6 bg-[#322F3C] relative">
              <button
                onClick={onClose}
                className="absolute top-12 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="size-5" />
              </button>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">SM</span>
                </div>
              </div>
              <h2 className="text-white text-lg font-semibold mb-1">Sarah Mitchell</h2>
              <p className="text-sm text-white/70">Welcome back!</p>
            </div>

            {/* Menu Items */}
            <div className="py-4">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => item.comingSoon ? null : handleNavigate(item.view)}
                  className={`w-full flex items-center gap-4 px-6 py-4 transition-colors ${
                    item.active
                      ? 'bg-[#888295]/10 text-[#322F3C] border-l-4 border-[#888295]'
                      : 'text-[#888295] hover:bg-[#888295]/5 border-l-4 border-transparent'
                  } ${item.comingSoon ? 'cursor-default' : ''}`}
                >
                  <item.icon className="size-5" />
                  <span className="text-sm flex-1 text-left">{item.label}</span>
                  {item.comingSoon && (
                    <span className="px-2.5 py-1 bg-[#322F3C] text-white text-xs rounded-full shadow-sm">
                      Coming Soon
                    </span>
                  )}
                </motion.button>
              ))}

              {/* Divider */}
              <div className="my-4 border-t border-gray-200" />

              {/* Logout */}
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={onClose}
                className="w-full flex items-center gap-4 px-6 py-4 text-red-600 hover:bg-red-50 transition-colors border-l-4 border-transparent"
              >
                <LogOut className="size-5" />
                <span className="text-sm">Log Out</span>
              </motion.button>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs text-gray-400 text-center">
                Houston Ballet App v1.0
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
