import React, { useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { usePage } from '@inertiajs/react'

export default function ContactFloatButtons() {
  const [isExpanded, setIsExpanded] = useState(false)
  const {app_settings}:any = usePage().props

  const handleWhatsApp = () => {
    // Replace with your WhatsApp number (international format without + or -)
    const phoneNumber = app_settings?.phone 
    const message = encodeURIComponent('Hello! I would like to know more about your services.')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  const handleContact = () => {
    // Scroll to contact section or open contact modal
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      {/* Buttons Container - Shows when expanded */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          isExpanded
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 pr-5 pl-5 py-3 hover:scale-105"
          aria-label="Contact us on WhatsApp"
        >
          <div className="absolute right-full mr-3 whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat on WhatsApp
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-4 border-transparent border-l-gray-900"></div>
          </div>
          <MessageCircle className="w-6 h-6" />
          <span className="font-medium">WhatsApp</span>
        </button>

        {/* Contact Button */}
        <button
          onClick={handleContact}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 pr-5 pl-5 py-3 hover:scale-105"
          aria-label="Contact us"
        >
          <div className="absolute right-full mr-3 whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Get in Touch
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-4 border-transparent border-l-gray-900"></div>
          </div>
          <Phone className="w-6 h-6" />
          <span className="font-medium">Contact</span>
        </button>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 ${
          isExpanded ? 'rotate-45' : ''
        }`}
        aria-label={isExpanded ? 'Close contact menu' : 'Open contact menu'}
      >
        <div className="relative">
          {isExpanded ? (
            <svg
              className="w-8 h-8 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-8 h-8 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          )}
        </div>
        
        {/* Ripple Effect */}
        <span className="absolute inset-0 rounded-full bg-purple-400 opacity-0 animate-ping"></span>
      </button>

      {/* Pulsing Indicator - Shows when not expanded */}
      {!isExpanded && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
      )}
    </div>
  )
}
