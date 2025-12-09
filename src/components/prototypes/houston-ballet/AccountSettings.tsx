'use client'

import { ArrowLeft, User, Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

interface AccountSettingsProps {
  onBack: () => void
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
      <div className="px-[17px] pt-12 pb-4 sticky top-0 bg-[#322F3C] z-10">
        <button
          onClick={onBack}
          className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors mb-3"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-white">Account Settings</h1>
        <p className="text-sm text-white/70 mt-1">Manage your profile information</p>
      </div>

      {/* Profile Section */}
      <div className="px-4 pt-6 space-y-6">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#322F3C] flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">SM</span>
            </div>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border-[2px] border-[#322F3C] hover:bg-[#F6F6F6] transition-colors">
              <User className="size-4 text-[#322F3C]" />
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
          <h2 className="text-gray-900 mb-2">Personal Information</h2>
          
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
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm"
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
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="size-4" />
              Phone Number
            </label>
            <input
              type="tel"
              value="(713) 555-0123"
              readOnly
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm"
            />
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
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
          <h2 className="text-gray-900 mb-2">Preferences</h2>
          
          {/* Email Notifications */}
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-gray-900">Email Notifications</p>
              <p className="text-xs text-gray-500">Receive updates about your tickets</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#322F3C]"></div>
            </label>
          </div>

          {/* SMS Reminders */}
          <div className="flex items-center justify-between py-2 border-t border-gray-100">
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

        {/* Actions */}
        <div className="space-y-3">
          <button className="w-full py-3 bg-[#322F3C] text-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            Edit Profile
          </button>
          <button className="w-full py-3 bg-white text-[#322F3C] border border-[#322F3C] rounded-lg hover:bg-[#F6F6F6] transition-colors">
            Change Password
          </button>
        </div>
      </div>
    </motion.div>
  )
}
