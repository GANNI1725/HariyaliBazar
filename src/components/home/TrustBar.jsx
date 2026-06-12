import { useEffect, useRef, useState } from 'react'

const stats = [
  { icon: '🌱', value: 41, suffix: '', label: 'Organic Products' },
  { icon: '👨‍🌾', value: 6, suffix: '', label: 'Partner Farmers' },
  { icon: '🚚', value: 65, suffix: '', label: 'Delivery Zones' },
  { icon: '⭐', value: 1, suffix: '', label: 'Same-Day Delivery', noValue: true },
  { icon: '📍', value: 1, suffix: '', label: 'Rupandehi & Beyond', noValue: true },
]

const useCountUp = (target, duration = 1500, decimals = 0) => {
  const [value, setValue] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)

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
      setValue(eased * target)
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [hasStarted, target, duration])

  return [ref, decimals === 0 ? Math.round(value) : Number(value.toFixed(decimals))]
}

const StatItem = ({ stat }) => {
  const [ref, display] = useCountUp(stat.value, 1400, stat.decimals || 0)
  return (
    <span ref={ref} className="inline-flex items-center gap-2 text-sm font-medium">
      <span aria-hidden>{stat.icon}</span>
      {stat.noValue ? (
        <span>{stat.label}</span>
      ) : (
        <span>{display}{stat.suffix} {stat.label}</span>
      )}
    </span>
  )
}

const TrustBar = () => {
  return (
    <div className="w-full bg-[var(--color-surface)] text-[var(--color-text)] overflow-hidden border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {stats.map((s) => (
            <StatItem key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrustBar