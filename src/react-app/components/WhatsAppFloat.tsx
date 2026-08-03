import { MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCountry } from '@/react-app/context/CountryContext'

export default function WhatsAppFloat() {
  const { country } = useCountry()
  const phoneNumber = country === 'Indonesia' ? '6281353698905' : country === 'Philippines' ? '639457157904' : '61488898835'
  const whatsappUrl = `https://wa.me/${phoneNumber}`
  const [bottomOffset, setBottomOffset] = useState(24)

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer')
      if (!footer) return

      const footerRect = footer.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const minBottom = 24 // 6 * 4 = 24px (bottom-6)
      
      // If footer is visible in viewport
      if (footerRect.top < windowHeight) {
        const overlap = windowHeight - footerRect.top
        const newBottom = Math.max(overlap + minBottom, minBottom)
        setBottomOffset(newBottom)
      } else {
        setBottomOffset(minBottom)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ bottom: `${bottomOffset}px` }}
      className="fixed right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="font-semibold text-sm hidden sm:inline group-hover:inline">
        Chat with us
      </span>
    </a>
  )
}
