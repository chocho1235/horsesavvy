import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  )

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Add event listener
    window.addEventListener("resize", handleResize)
    
    // Initialize on mount
    handleResize()
    
    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [setIsMobile])

  return isMobile
} 