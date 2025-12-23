'use client';

import { ArrowLeft, User, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface AccountSettingsProps {
  onBack: () => void;
}

export default function AccountSettings({ onBack }: AccountSettingsProps) {
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
        <h1 className="text-white text-xl font-semibold">Account Settings</h1>
        <p className="text-sm text-white/70 mt-1">Manage your profile information</p>
      </div>

      {/* Profile Section */}
      <div className="px-4 pt-6 space-y-6">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#322F3C] flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-semibold">SM</span>
            </div>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border-2 border-[#322F3C] hover:bg-[#F6F6F6] transition-colors">
              <User className="size-4 text-[#322F3C]" />
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-gray-900 font-semibold">Personal Information</h2>
            <a
              href="https://houstonballet.org/account/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[#888295] hover:text-[#322F3C] transition-colors"
            >
              Edit Account
              <ExternalLink className="size-3" />
            </a>
          </div>
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <User className="size-4" />
              Full Name
            </label>
            <input
              type="text"
              value="Sarah Mitchell"
              readOnly
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="size-4" />
              Email Address
            </label>
            <input
              type="email"
              value="sarah.mitchell@email.com"
              readOnly
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm cursor-not-allowed"
            />
          </div>

          {/* Phone Numbers */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="size-4" />
              Phone Numbers
            </label>
            
            {/* Cell Number */}
            <div className="space-y-1">
              <p className="text-xs text-gray-500 px-4">Cell</p>
              <input
                type="tel"
                value="(713) 555-0123"
                readOnly
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm cursor-not-allowed"
              />
            </div>

            {/* Home Primary Number */}
            <div className="space-y-1">
              <p className="text-xs text-gray-500 px-4">Home Primary</p>
              <input
                type="tel"
                value="(713) 555-0456"
                readOnly
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm cursor-not-allowed"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="size-4" />
              Location
            </label>
            <input
              type="text"
              value="Houston, TX"
              readOnly
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm cursor-not-allowed"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
          <h2 className="text-gray-900 font-semibold mb-2">Notification Preferences</h2>
          
          {/* SMS Reminders */}
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-gray-900">SMS Reminders</p>
              <p className="text-xs text-gray-500">Get text reminders before shows</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#322F3C]"></div>
            </label>
          </div>
        </div>

        {/* Password Management */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-gray-900 font-semibold mb-3">Security</h2>
          <a
            href="https://houstonballet.org/account/login"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full py-3 px-4 bg-[#F6F6F6] text-[#322F3C] border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm">Change Password</span>
            <ExternalLink className="size-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
