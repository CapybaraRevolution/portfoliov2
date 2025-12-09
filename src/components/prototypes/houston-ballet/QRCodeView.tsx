'use client'

import { ArrowLeft, Eye, Info } from 'lucide-react'
import QRCode from 'react-qr-code'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import type { Performance } from './PerformanceList'

interface QRCodeViewProps {
  performance: Performance
  onBack: () => void
}

export default function QRCodeView({ performance, onBack }: QRCodeViewProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Generate a unique ticket ID for the QR code
  const ticketData = JSON.stringify({
    performanceId: performance.id,
    title: performance.title,
    date: performance.date,
    time: performance.time,
    venue: performance.venue,
    ticketId: `HB-${performance.id}-${Date.now()}`
  })

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white h-full flex flex-col relative overflow-hidden"
    >
      {/* Header - Dark Purple with Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-[17px] pt-12 pb-4 bg-[#322F3C] relative"
      >
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute left-4 top-12 text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
        >
          <ArrowLeft className="size-5" />
        </button>
        
        {/* Logo */}
        <div className="flex items-center justify-center">
          <div className="w-[120px] h-[50px] flex items-center justify-center relative">
            <Image 
              src="/images/case-studies/houston-ballet/houston-ballet-logo.png" 
              alt="Houston Ballet" 
              fill
              className="object-contain"
            />
          </div>
        </div>
      </motion.div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-auto bg-[#F6F6F6]">
        <div className="flex flex-col items-center px-4 py-6">
          {/* QR Code Card with All Key Info */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 w-full"
          >
            {/* Performance Title */}
            <div className="text-center mb-4">
              <h2 className="text-[#322F3C] mb-2 text-left">{performance.title}</h2>
              <div className="space-y-1">
                <p className="text-sm text-[#888295] text-left">{performance.date} at {performance.time}</p>
                <p className="text-sm text-[#888295] text-left">{performance.venue}</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-4">
              <div className="bg-white p-4 rounded-xl border-2" style={{ borderColor: '#F6F6F6' } as React.CSSProperties}>
                <QRCode
                  value={ticketData}
                  size={200}
                  level="H"
                  bgColor="#ffffff"
                  fgColor="#322F3C"
                />
              </div>
            </div>

            {/* Seat Information - Ghosted Style with Info Icon */}
            <div className="relative bg-[#322F3C]/10 border-2 rounded-xl p-4 text-center" style={{ borderColor: 'rgb(50, 47, 60 / 0.2)' } as React.CSSProperties}>
              <p className="text-[rgb(70,53,105)] text-xs mb-1 text-[14px] font-bold text-left">Your Seats</p>
              <p className="text-[#322F3C] text-left">Orchestra • Row A5 • Seats 12-13</p>
              
              {/* Info Icon with Tooltip */}
              <button 
                className="absolute -top-2 -right-2 bg-[#888295] text-white rounded-full p-1.5 shadow-lg hover:bg-[#322F3C] transition-colors"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <Info className="size-3" />
              </button>
              
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -top-12 right-0 bg-[#322F3C] text-white text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap z-50"
                  >
                    Have your seat info ready for ushers
                    <div className="absolute -bottom-1 right-4 w-2 h-2 bg-[#322F3C] transform rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Ticket ID */}
            <div className="mt-4 text-center">
              <p className="text-xs text-[#888295] text-left">Ticket ID: HB-{performance.id}</p>
            </div>
          </motion.div>

          {/* Instruction Text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#888295] text-sm mt-4 text-center max-w-xs"
          >
            Present this QR code at the entrance for scanning
          </motion.p>

          {/* View Details Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDetails(!showDetails)}
            className="mt-6 flex items-center gap-2 px-6 py-3 bg-[#888295] text-white rounded-full shadow-lg hover:shadow-xl hover:bg-[#322F3C] transition-all"
          >
            <Eye className="size-4" />
            <span className="text-sm">{showDetails ? 'Hide Details' : 'View Details'}</span>
          </motion.button>
        </div>
      </div>

      {/* Details Panel */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute inset-0 bg-white z-50 p-6 pt-12 overflow-auto"
          >
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-6 left-6 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="size-6" />
            </button>

            <div className="max-w-md mx-auto">
              <h2 className="text-gray-900 mb-6 text-center">Ticket Details</h2>

              <div className="space-y-6">
                {/* Performance Image */}
                <div className="rounded-xl overflow-hidden shadow-lg relative h-48">
                  <Image 
                    src={performance.image}
                    alt={performance.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Details */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Performance</p>
                    <p className="text-gray-900">{performance.title}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-xs text-gray-500 mb-1">Date & Time</p>
                    <p className="text-gray-900">{performance.date} at {performance.time}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-xs text-gray-500 mb-1">Venue</p>
                    <p className="text-gray-900">{performance.venue}</p>
                    <p className="text-sm text-gray-600 mt-1">501 Texas Ave, Houston, TX 77002</p>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-xs text-gray-500 mb-1">Seat Information</p>
                    <p className="text-gray-900">Orchestra • Section A • Row 5 • Seats 12-13</p>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-xs text-gray-500 mb-1">Order Number</p>
                    <p className="text-gray-900">#HB2025-{performance.id}892</p>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-xs text-gray-500 mb-1">Doors Open</p>
                    <p className="text-gray-900">6:30 PM</p>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
                  <h3 className="text-pink-900 mb-2 text-sm">Important Information</h3>
                  <ul className="text-xs text-pink-800 space-y-1">
                    <li>• Please arrive 30 minutes before showtime</li>
                    <li>• Latecomers will be seated at intermission</li>
                    <li>• Photography and recording are prohibited</li>
                    <li>• Dress code: Smart casual or formal attire</li>
                  </ul>
                </div>

                {/* What to Expect Section */}
                <div className="space-y-4">
                  <h3 className="text-gray-900">What to Expect at Houston Ballet</h3>
                  
                  {/* Arrival & Check-in */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-white/50 rounded-full flex items-center justify-center mb-2">
                          <span className="text-2xl">🎭</span>
                        </div>
                        <p className="text-xs text-gray-600">Arrival & Check-in</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 mb-2">Getting In</p>
                      <p className="text-xs text-gray-600">
                        Present your QR code at the entrance. Our staff will scan it and direct you to your seats. 
                        Coat check is available in the lobby.
                      </p>
                    </div>
                  </div>

                  {/* The Theater Experience */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-white/50 rounded-full flex items-center justify-center mb-2">
                          <span className="text-2xl">🏛️</span>
                        </div>
                        <p className="text-xs text-gray-600">Theater Experience</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 mb-2">Inside the Theater</p>
                      <p className="text-xs text-gray-600">
                        The Wortham Theater features world-class acoustics and sightlines. 
                        Refreshments available at intermission. Please silence all devices.
                      </p>
                    </div>
                  </div>

                  {/* Parking & Transportation */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-white/50 rounded-full flex items-center justify-center mb-2">
                          <span className="text-2xl">🚗</span>
                        </div>
                        <p className="text-xs text-gray-600">Getting Here</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 mb-2">Parking & Transit</p>
                      <p className="text-xs text-gray-600">
                        Valet parking available at entrance. Public parking nearby on Texas Ave. 
                        METRORail Theater District station is 2 blocks away.
                      </p>
                    </div>
                  </div>

                  {/* Dining Recommendations */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-white/50 rounded-full flex items-center justify-center mb-2">
                          <span className="text-2xl">🍽️</span>
                        </div>
                        <p className="text-xs text-gray-600">Dining</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 mb-2">Pre-Show Dining</p>
                      <p className="text-xs text-gray-600">
                        Make it a night out! Reserve dinner at nearby restaurants in Theater District. 
                        Popular spots: Vic & Anthony&apos;s, Brennan&apos;s, and The Grove.
                      </p>
                    </div>
                  </div>

                  {/* Accessibility */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-teal-100 to-green-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-white/50 rounded-full flex items-center justify-center mb-2">
                          <span className="text-2xl">♿</span>
                        </div>
                        <p className="text-xs text-gray-600">Accessibility</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 mb-2">We Welcome Everyone</p>
                      <p className="text-xs text-gray-600">
                        Wheelchair accessible seating, assisted listening devices, and accessible restrooms available. 
                        Contact guest services for special accommodations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-2">Questions?</p>
                  <p className="text-sm text-gray-900">Contact: (713) 227-ARTS</p>
                  <p className="text-xs text-gray-600 mt-1">info@houstonballet.org</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
