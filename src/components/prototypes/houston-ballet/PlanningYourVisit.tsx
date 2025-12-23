'use client';

import { ArrowLeft, MapPin, Clock, Car, Utensils, Info, Accessibility } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlanningYourVisitProps {
  onBack: () => void;
}

export default function PlanningYourVisit({ onBack }: PlanningYourVisitProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#F6F6F6] h-full overflow-auto pb-6"
    >
      {/* Header */}
      <div className="px-[17px] pt-12 pb-4 sticky top-0 bg-[#322F3C] z-20">
        <button
          onClick={onBack}
          className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors mb-3"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-white text-xl font-semibold">Planning Your Visit</h1>
        <p className="text-sm text-white/70 mt-1">Everything you need to know</p>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 space-y-4">
        {/* Venue Information */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-40 bg-[#F6F6F6] border border-[#888295]/20 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="size-12 text-[#322F3C] mx-auto mb-2" />
              <p className="text-[#322F3C] font-semibold">Wortham Theater Center</p>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <p className="text-sm text-gray-900 font-medium">Address</p>
              <p className="text-sm text-gray-600">501 Texas Ave, Houston, TX 77002</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-[#322F3C] text-white rounded-lg text-sm hover:bg-[#888295] transition-colors">
                Get Directions
              </button>
              <button className="flex-1 py-2 bg-[#F6F6F6] text-[#322F3C] border border-[#888295]/30 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                Call Venue
              </button>
            </div>
          </div>
        </div>

        {/* Timing Information */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-[#F6F6F6] rounded-lg">
              <Clock className="size-5 text-[#322F3C]" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 font-semibold mb-1">Arrival Time</h3>
              <p className="text-sm text-gray-600">
                We recommend arriving 30-45 minutes before showtime. Doors typically open 30 minutes prior to the performance.
              </p>
            </div>
          </div>
          <div className="bg-[#F6F6F6] border border-[#888295]/30 rounded-lg p-3">
            <p className="text-xs text-[#322F3C]">
              <span className="font-semibold">Note:</span> Latecomers will be seated at the discretion of management, typically during intermission.
            </p>
          </div>
        </div>

        {/* Parking & Transportation */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-[#F6F6F6] rounded-lg">
              <Car className="size-5 text-[#322F3C]" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 font-semibold mb-1">Parking & Transit</h3>
              <p className="text-sm text-gray-600 mb-3">
                Multiple parking options are available near the theater.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-gray-700">Valet Parking</span>
                  <span className="text-gray-900 font-medium">$20</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-gray-700">Theater District Garage</span>
                  <span className="text-gray-900 font-medium">$15</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-gray-700">Street Parking</span>
                  <span className="text-gray-900 font-medium">Varies</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-gray-700">METRORail</span>
                  <span className="text-gray-900 font-medium">Theater District Station</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dining Recommendations */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#F6F6F6] rounded-lg">
              <Utensils className="size-5 text-[#322F3C]" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 font-semibold mb-1">Dining Options</h3>
              <p className="text-sm text-gray-600 mb-3">
                Make it a special evening with pre-show dining at these nearby restaurants:
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-900 font-medium">Vic & Anthony&apos;s Steakhouse</p>
                  <p className="text-xs text-gray-500">0.2 miles • Fine Dining</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-900 font-medium">Brennan&apos;s of Houston</p>
                  <p className="text-xs text-gray-500">0.3 miles • Contemporary Creole</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-900 font-medium">The Grove</p>
                  <p className="text-xs text-gray-500">0.4 miles • American Cuisine</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What to Wear */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#F6F6F6] rounded-lg">
              <Info className="size-5 text-[#322F3C]" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 font-semibold mb-1">Dress Code</h3>
              <p className="text-sm text-gray-600">
                While there&apos;s no strict dress code, most guests opt for smart casual to formal attire. Theater-goers often enjoy dressing up for the occasion.
              </p>
            </div>
          </div>
        </div>

        {/* Accessibility */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#F6F6F6] rounded-lg">
              <Accessibility className="size-5 text-[#322F3C]" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 font-semibold mb-1">Accessibility Services</h3>
              <p className="text-sm text-gray-600 mb-2">
                The Wortham Theater Center is fully accessible and offers:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Wheelchair accessible seating</li>
                <li>• Assisted listening devices</li>
                <li>• Accessible restrooms</li>
                <li>• Elevator access to all levels</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                Contact guest services at (713) 227-ARTS for special accommodations.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-[#F6F6F6] border border-[#888295]/30 rounded-xl p-4 text-center">
          <p className="text-sm text-[#322F3C] mb-2">Questions?</p>
          <p className="text-[#322F3C] font-semibold mb-1">(713) 227-ARTS</p>
          <p className="text-sm text-[#888295]">info@houstonballet.org</p>
        </div>
      </div>
    </motion.div>
  );
}
