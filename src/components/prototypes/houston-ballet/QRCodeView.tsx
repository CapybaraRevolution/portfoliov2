'use client';

/**
 * 🎫 QR Code View Component
 * 
 * Shows the QR code, seat info, and (when "View Details" is tapped) 
 * the full ticket details.
 * 
 * KEY FEATURE: Multi-ticket carousel
 * - Each ticket is its own card that users swipe through horizontally
 * - Supports touch swipe, mouse drag, trackpad scroll, AND keyboard arrows
 * - The "View Details" panel stays synced to whichever ticket you're viewing
 */

import { ArrowLeft, Eye, Info, ExternalLink } from 'lucide-react';
import QRCode from 'react-qr-code';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import type { Performance } from './mockData';

// Houston Ballet branding
const LOGO_URL = '/images/case-studies/houston-ballet/houston-ballet-logo.png';

interface QRCodeViewProps {
  performance: Performance;
  onBack: () => void;
}

interface IndividualTicket {
  seatNumber: string;
  level: string;
  section: string;
  row: string;
  ticketId: string;
  qrData: string;
  isVIP?: boolean;
}

/**
 * Parse seat string into individual tickets
 * Converts "Orchestra, Section A, Row F, Seats 12-13" into separate ticket objects
 */
function parseSeatsIntoTickets(performance: Performance): IndividualTicket[] {
  const levelMatch = performance.seats.match(/^([^,]+)/);
  const sectionMatch = performance.seats.match(/Section\s+([^,]+)/i);
  const rowMatch = performance.seats.match(/Row\s+([^,]+)/i);
  
  const level = levelMatch ? levelMatch[1].trim() : 'General';
  const section = sectionMatch ? `Section ${sectionMatch[1].trim()}` : '';
  const row = rowMatch ? rowMatch[1].split(',')[0].trim() : '';
  
  const seatsMatch = performance.seats.match(/Seats?\s+(\d+)(?:-(\d+))?/i);
  
  if (!seatsMatch) {
    const ticketId = `${performance.orderNumber}001`;
    return [{
      seatNumber: performance.seats,
      level,
      section,
      row,
      ticketId,
      qrData: JSON.stringify({
        performanceId: performance.id,
        title: performance.title,
        date: performance.date,
        time: performance.time,
        venue: performance.venue,
        seats: performance.seats,
        orderNumber: performance.orderNumber,
        ticketHolder: performance.ticketHolder,
        ticketId
      }),
      isVIP: performance.isVIP
    }];
  }

  const startSeat = parseInt(seatsMatch[1]);
  const endSeat = seatsMatch[2] ? parseInt(seatsMatch[2]) : startSeat;
  const tickets: IndividualTicket[] = [];

  for (let seat = startSeat; seat <= endSeat; seat++) {
    const ticketNumber = String(seat - startSeat + 1).padStart(3, '0');
    const ticketId = `${performance.orderNumber}${ticketNumber}`;
    tickets.push({
      seatNumber: seat.toString(),
      level,
      section,
      row,
      ticketId,
      qrData: JSON.stringify({
        performanceId: performance.id,
        title: performance.title,
        date: performance.date,
        time: performance.time,
        venue: performance.venue,
        seat: seat.toString(),
        level,
        section,
        row,
        orderNumber: performance.orderNumber,
        ticketHolder: performance.ticketHolder,
        ticketId
      }),
      isVIP: performance.isVIP
    });
  }

  return tickets;
}

export default function QRCodeView({ performance, onBack }: QRCodeViewProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [, setDragDirection] = useState<'left' | 'right' | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  
  const tickets = parseSeatsIntoTickets(performance);
  const currentTicket = tickets[currentTicketIndex];

  // Update carousel width when container resizes
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });
    
    if (carouselRef.current) {
      resizeObserver.observe(carouselRef.current);
    }
    
    window.addEventListener('resize', updateWidth);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  /**
   * Handle drag/swipe gestures
   */
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;
    
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    const swipedRight = offset > swipeThreshold || velocity > velocityThreshold;
    const swipedLeft = offset < -swipeThreshold || velocity < -velocityThreshold;
    
    if (swipedRight && currentTicketIndex > 0) {
      setCurrentTicketIndex(currentTicketIndex - 1);
    } else if (swipedLeft && currentTicketIndex < tickets.length - 1) {
      setCurrentTicketIndex(currentTicketIndex + 1);
    }
    
    setIsDragging(false);
    setDragDirection(null);
  };

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 10) {
      setDragDirection('right');
    } else if (info.offset.x < -10) {
      setDragDirection('left');
    } else {
      setDragDirection(null);
    }
  };

  /**
   * Handle mouse wheel for desktop horizontal scrolling
   */
  const handleWheel = useCallback((e: WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
      e.preventDefault();
      
      const threshold = 50;
      const delta = e.shiftKey ? e.deltaY : e.deltaX;
      
      if (delta > threshold && currentTicketIndex < tickets.length - 1) {
        setCurrentTicketIndex(prev => Math.min(prev + 1, tickets.length - 1));
      } else if (delta < -threshold && currentTicketIndex > 0) {
        setCurrentTicketIndex(prev => Math.max(prev - 1, 0));
      }
    }
  }, [currentTicketIndex, tickets.length]);

  // Attach wheel listener
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel && tickets.length > 1) {
      carousel.addEventListener('wheel', handleWheel, { passive: false });
      return () => carousel.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel, tickets.length]);

  const handlePrevious = () => {
    if (currentTicketIndex > 0) {
      setCurrentTicketIndex(currentTicketIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentTicketIndex < tickets.length - 1) {
      setCurrentTicketIndex(currentTicketIndex + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showDetails) return;
      
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDetails, currentTicketIndex]);

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
          <div className="w-[120px] h-[50px] flex items-center justify-center">
            <img src={LOGO_URL} alt="Houston Ballet" className="w-full h-full object-contain" />
          </div>
        </div>
      </motion.div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-auto bg-[#F6F6F6] relative">
        {/* Ticket Carousel Container */}
        <div className="w-full px-4 py-4 relative z-10">
          <div 
            ref={carouselRef}
            className="w-full max-w-sm mx-auto overflow-hidden"
            style={{ position: 'relative' }}
          >
            {/* Carousel Track */}
            <motion.div
              className="flex"
              animate={{ 
                x: carouselWidth > 0 ? -currentTicketIndex * carouselWidth : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag={tickets.length > 1 ? "x" : false}
              dragConstraints={carouselRef}
              dragElastic={0.1}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              onDrag={handleDrag}
              onDragStart={() => setIsDragging(true)}
              style={{ 
                cursor: tickets.length > 1 ? 'grab' : 'default',
                display: 'flex',
                width: carouselWidth > 0 ? `${tickets.length * carouselWidth}px` : `${tickets.length * 100}%`,
                gap: 0,
                margin: 0,
                padding: 0
              }}
            >
              {tickets.map((ticket, index) => (
                <div
                  key={ticket.ticketId}
                  style={{ 
                    flex: '0 0 auto',
                    width: carouselWidth > 0 ? `${carouselWidth}px` : '100%',
                    minWidth: carouselWidth > 0 ? `${carouselWidth}px` : '100%',
                    maxWidth: carouselWidth > 0 ? `${carouselWidth}px` : '100%',
                    margin: 0,
                    padding: 0
                  }}
                >
                  <div className={`bg-white rounded-2xl p-6 select-none transition-shadow w-full ${
                    isDragging && index === currentTicketIndex ? 'shadow-2xl' : 'shadow-lg'
                  }`}>
                    {/* Performance Title */}
                    <div className="text-center mb-4">
                      <h2 className="text-[#322F3C] mb-2 text-left font-semibold text-lg">{performance.title}</h2>
                      <div className="space-y-1">
                        <p className="text-sm text-[#888295] text-left">{performance.date} at {performance.time}</p>
                        <p className="text-sm text-[#888295] text-left">{performance.venue}</p>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="flex justify-center mb-2 relative">
                      <div className="bg-white p-4 rounded-xl border-2 border-[#F6F6F6] relative">
                        <QRCode
                          value={ticket.qrData}
                          size={200}
                          level="H"
                          bgColor="#ffffff"
                          fgColor="#322F3C"
                        />
                      </div>
                    </div>

                    {/* Ticket Counter */}
                    {tickets.length > 1 && (
                      <div className="flex items-center justify-center mb-4">
                        <p className="text-xs text-[#888295]">
                          Ticket {index + 1} of {tickets.length}
                        </p>
                      </div>
                    )}

                    {/* Seat Information */}
                    <div className="relative bg-[#322F3C]/10 border-2 border-[#322F3C]/20 rounded-xl p-4 text-center mb-4">
                      <p className="text-[rgb(70,53,105)] text-xs mb-1 text-[14px] font-bold text-left">Your Seat</p>
                      <p className="text-[#322F3C] text-left">{ticket.level} • {ticket.section} • Row {ticket.row}</p>
                      <p className="text-[#322F3C] text-lg font-semibold text-left mt-1">Seat {ticket.seatNumber}</p>
                      
                      {/* Info Icon with Tooltip */}
                      <button 
                        className="absolute -top-2 -right-2 bg-[#888295] text-white rounded-full p-1.5 shadow-lg hover:bg-[#322F3C] transition-colors"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        onTouchStart={() => setShowTooltip(true)}
                        onTouchEnd={() => setTimeout(() => setShowTooltip(false), 2000)}
                      >
                        <Info className="size-3" />
                      </button>
                      
                      <AnimatePresence>
                        {showTooltip && index === currentTicketIndex && (
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

                    {/* Order & Ticket Info */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-[#888295]">Ticket ID:</p>
                        <p className="text-xs text-[#322F3C] font-medium">{ticket.ticketId}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-[#888295]">Order Number:</p>
                        <p className="text-xs text-[#322F3C] font-medium">{performance.orderNumber}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-[#888295]">Ticket Holder:</p>
                        <p className="text-xs text-[#322F3C] font-medium">{performance.ticketHolder}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          {tickets.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {tickets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTicketIndex(index)}
                  className={`transition-all duration-200 rounded-full ${
                    index === currentTicketIndex
                      ? 'w-6 h-2 bg-[#322F3C]'
                      : 'w-2 h-2 bg-[#888295]/30 hover:bg-[#888295]/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Content */}
        <div className="flex flex-col items-center px-4 pb-4 relative z-10 bg-[#dedede]">
          {/* Scanning Instructions */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[#888295] text-center px-6 mt-3"
          >
            Present this QR code at the entrance for scanning
          </motion.p>

          {/* View Details Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDetails(!showDetails)}
            className="mt-4 flex items-center gap-2 px-6 py-3 bg-[#888295] text-white rounded-full shadow-lg hover:shadow-xl hover:bg-[#322F3C] transition-all"
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
            className="absolute inset-0 bg-white z-40 overflow-auto"
          >
            {/* Fixed Header */}
            <div 
              className="sticky top-0 z-[100] px-6 pt-12 pb-4 flex items-center gap-4 bg-[#888295]"
            >
              <button
                onClick={() => setShowDetails(false)}
                className="text-white hover:text-white/80 transition-colors -ml-2 p-2"
              >
                <ArrowLeft className="size-6" />
              </button>
              <h2 className="text-white text-lg font-semibold">Ticket Details</h2>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 pt-6">
              <div className="max-w-md mx-auto space-y-6">
                {/* Performance Image */}
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={performance.image}
                    alt={performance.title}
                    className="w-full h-48 object-cover"
                  />
                </div>

                {/* Ticket Counter */}
                {tickets.length > 1 && (
                  <div className="text-center">
                    <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                      Viewing Ticket {currentTicketIndex + 1} of {tickets.length}
                    </span>
                  </div>
                )}

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
                    <p className="text-gray-900">{currentTicket.level} • {currentTicket.section} • Row {currentTicket.row} • Seat {currentTicket.seatNumber}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-xs text-gray-500 mb-1">Order Number</p>
                    <p className="text-gray-900">{performance.orderNumber}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-xs text-gray-500 mb-1">Ticket Holder</p>
                    <p className="text-gray-900">{performance.ticketHolder}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-xs text-gray-500 mb-1">Patron Number</p>
                    <p className="text-gray-900">{performance.patronNumber}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-xs text-gray-500 mb-1">Ticket Price</p>
                    <p className="text-gray-900">${performance.ticketPrice.toFixed(2)}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-xs text-gray-500 mb-1">Doors Open</p>
                    <p className="text-gray-900">6:30 PM</p>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
                  <h3 className="text-pink-900 mb-2 text-sm font-semibold">Important Information</h3>
                  <ul className="text-xs text-pink-800 space-y-1">
                    <li>• Please arrive 30 minutes before showtime</li>
                    <li>• Latecomers will be seated at intermission</li>
                    <li>• Photography and recording are prohibited</li>
                    <li>• Dress code: Smart casual or formal attire</li>
                  </ul>
                </div>

                {/* About This Performance */}
                <div className="space-y-4">
                  <h3 className="text-gray-900 font-semibold">About This Performance</h3>
                  
                  {/* Performance History Card */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-white/50 rounded-full flex items-center justify-center mb-2">
                          <span className="text-2xl">📖</span>
                        </div>
                        <p className="text-xs text-gray-600">Performance History</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 mb-2">The Nutcracker</p>
                      <p className="text-xs text-gray-600">
                        First premiered in 1892 at the Mariinsky Theatre in St. Petersburg, The Nutcracker has become 
                        one of the most beloved ballets worldwide. This timeless holiday classic tells the magical story 
                        of Clara&apos;s journey through a winter wonderland.
                      </p>
                    </div>
                  </div>

                  {/* Composer Card */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-white/50 rounded-full flex items-center justify-center mb-2">
                          <span className="text-2xl">🎵</span>
                        </div>
                        <p className="text-xs text-gray-600">Composer</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 mb-2">Pyotr Ilyich Tchaikovsky</p>
                      <p className="text-xs text-gray-600">
                        Composed by the legendary Russian composer Tchaikovsky, The Nutcracker features iconic pieces 
                        including the &quot;Dance of the Sugar Plum Fairy,&quot; &quot;Waltz of the Flowers,&quot; and the &quot;Russian Dance.&quot; 
                        The orchestral score is performed live by the Houston Ballet Orchestra.
                      </p>
                    </div>
                  </div>

                  {/* Ticket Policy Card */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-white/50 rounded-full flex items-center justify-center mb-2">
                          <span className="text-2xl">🎫</span>
                        </div>
                        <p className="text-xs text-gray-600">Ticket Policy</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 mb-2">Policies & Guidelines</p>
                      <p className="text-xs text-gray-600 mb-2">
                        <strong>Exchanges:</strong> May be made up to 24 hours before the performance for a $10 fee per ticket.
                      </p>
                      <p className="text-xs text-gray-600 mb-2">
                        <strong>Refunds:</strong> Non-refundable unless the performance is canceled.
                      </p>
                      <p className="text-xs text-gray-600 mb-3">
                        <strong>Age Policy:</strong> All patrons must have a ticket, regardless of age. Children under 3 are not permitted.
                      </p>
                      
                      {/* View Full Policy Link */}
                      <a
                        href="https://www.houstonballet.org/ticket-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full py-3 px-4 bg-[#F6F6F6] text-[#322F3C] border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-sm">View Full Ticket Policy</span>
                        <ExternalLink className="size-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Block */}
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
  );
}
