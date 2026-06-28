import { useEffect, useRef, useState } from 'react'

export const useCountUp = (target, duration = 1500, decimals = 0) => {
  const [display, setDisplay] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)
  const valueRef = useRef(0)

  useEffect(() => {
    if (!ref.current || hasStarted) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    let raf
    const start = performance.now()
    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const raw = eased * target
      const next = decimals === 0 ? Math.round(raw) : Number(raw.toFixed(decimals))
      if (next !== valueRef.current) {
        valueRef.current = next
        setDisplay(next)
      }
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [hasStarted, target, duration, decimals])

  return [ref, display]
}
