import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Country = 'UK' | 'USA' | 'Australia' | 'Indonesia' | 'Europe' | 'UAE' | 'Philippines'

interface CountryPricing {
  price: string
  currency: string
  label: string
  flag: string
  setupFee?: string
  setupFeeValue?: string
  optimizationValue?: string
  inclusions?: string
  tapCardPrice?: string
  qrDisplayPrice?: string
  yearlyPrice?: string
  yearlySavings?: string
}

export const PRICING: Record<Country, CountryPricing> = {
  UK: { price: '£75', currency: 'GBP', label: '£75 per month', flag: '🇬🇧', setupFee: '£150', setupFeeValue: '£150', optimizationValue: '£750', tapCardPrice: '£15', qrDisplayPrice: '£7.50', yearlyPrice: '£630', yearlySavings: '£270' },
  USA: { price: '$99', currency: 'USD', label: '$99 per month', flag: '🇺🇸', setupFee: '$200', setupFeeValue: '$200', optimizationValue: '$850', tapCardPrice: '$25', qrDisplayPrice: '$10', yearlyPrice: '$832', yearlySavings: '$356' },
  Australia: { price: '$149', currency: 'AUD', label: '$149 per month', flag: '🇦🇺', setupFee: '$300', setupFeeValue: '$300', optimizationValue: '$1,200', tapCardPrice: '$49', qrDisplayPrice: '$12', yearlyPrice: '$1,252', yearlySavings: '$536' },
  Indonesia: { price: '1.5jt', currency: 'IDR', label: '1.5jt per month', flag: '🇮🇩', setupFee: '3jt', setupFeeValue: '3jt', optimizationValue: '15jt', tapCardPrice: '200k', qrDisplayPrice: '99k', yearlyPrice: '12.6jt', yearlySavings: '5.4jt' },
  Europe: { price: '€89', currency: 'EUR', label: '€89 per month', flag: '🇪🇺', setupFee: '€165', setupFeeValue: '€165', optimizationValue: '€850', tapCardPrice: '€19.90', qrDisplayPrice: '€9', yearlyPrice: '€748', yearlySavings: '€320' },
  UAE: { price: 'AED 449', currency: 'AED', label: '449 Dirhams per month', flag: '🇦🇪', setupFee: 'AED 750', setupFeeValue: 'AED 750', optimizationValue: 'AED 3,500', tapCardPrice: 'AED 99', qrDisplayPrice: 'AED 35', yearlyPrice: 'AED 3,772', yearlySavings: 'AED 1,616' },
  Philippines: { price: '₱6,300', currency: 'PHP', label: '₱6,300 per month', flag: '🇵🇭', setupFee: '₱12,000', setupFeeValue: '₱12,000', optimizationValue: '₱55,000', tapCardPrice: '₱1,200', qrDisplayPrice: '₱600', yearlyPrice: '₱52,920', yearlySavings: '₱22,680' },
}

// Map country codes to our pricing regions
const COUNTRY_MAP: Record<string, Country> = {
  // UK
  GB: 'UK',
  // USA
  US: 'USA',
  // Australia
  AU: 'Australia',
  // Indonesia
  ID: 'Indonesia',
  // UAE
  AE: 'UAE',
  // Philippines
  PH: 'Philippines',
  // Europe - common EU countries
  DE: 'Europe', AT: 'Europe', BE: 'Europe', BG: 'Europe', HR: 'Europe',
  CY: 'Europe', CZ: 'Europe', DK: 'Europe', EE: 'Europe', FI: 'Europe',
  FR: 'Europe', GR: 'Europe', HU: 'Europe', IE: 'Europe', IT: 'Europe',
  LV: 'Europe', LT: 'Europe', LU: 'Europe', MT: 'Europe', NL: 'Europe',
  PL: 'Europe', PT: 'Europe', RO: 'Europe', SK: 'Europe', SI: 'Europe',
  ES: 'Europe', SE: 'Europe', CH: 'Europe', NO: 'Europe',
}

interface CountryContextType {
  country: Country | null
  setCountry: (country: Country) => void
  pricing: CountryPricing | null
  showSelector: boolean
  setShowSelector: (show: boolean) => void
  detectedCountry: Country | null
  isDetecting: boolean
}

const CountryContext = createContext<CountryContextType | undefined>(undefined)

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<Country | null>(null)
  const [detectedCountry, setDetectedCountry] = useState<Country | null>(null)
  const [isDetecting, setIsDetecting] = useState(true)
  const [showSelector, setShowSelector] = useState(false)

  useEffect(() => {
    const detectCountry = async () => {
      const saved = localStorage.getItem('selectedCountry') as Country | null
      if (saved && PRICING[saved]) {
        setCountryState(saved)
        setIsDetecting(false)
        return
      }

      try {
        // Use ipapi.co for free HTTPS IP geolocation
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        const countryCode = data.country_code
        const mapped = COUNTRY_MAP[countryCode] || 'USA' // Default to USA if unknown
        setDetectedCountry(mapped)
        // Auto-set the country without showing the spin wheel
        setCountryState(mapped)
        localStorage.setItem('selectedCountry', mapped)
      } catch {
        // If detection fails, default to USA
        setDetectedCountry('USA')
        setCountryState('USA')
        localStorage.setItem('selectedCountry', 'USA')
      }
      setIsDetecting(false)
    }

    detectCountry()
  }, [])

  const setCountry = (newCountry: Country) => {
    setCountryState(newCountry)
    localStorage.setItem('selectedCountry', newCountry)
    setShowSelector(false)
  }

  const pricing = country ? PRICING[country] : null

  return (
    <CountryContext.Provider value={{ country, setCountry, pricing, showSelector, setShowSelector, detectedCountry, isDetecting }}>
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry() {
  const context = useContext(CountryContext)
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider')
  }
  return context
}
