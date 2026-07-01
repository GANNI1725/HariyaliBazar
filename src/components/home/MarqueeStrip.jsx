import { motion } from 'framer-motion'

const items = [
  { img: '/Home-Logo_Section_Pics/Flag_of_Nepal.gif', alt: 'Nepal Flag', text: 'Proudly Made in Nepal' },
  { icon: '🍵', text: 'Fresh Ilam Tea Direct from the Hills' },
  { icon: '🥬', text: 'Harvested Fresh Every Morning' },
  { icon: '🧑‍🌾', text: 'Supporting Local Nepali Farmers' },
]

const Track = () => (
  <div className="flex whitespace-nowrap">
    {items.map((item, i) => (
      <span
        key={`${item.text}-${i}`}
        className="inline-flex items-center gap-2 mx-6 text-xs text-[var(--color-text)]/70 font-medium"
      >
        {item.img ? (
          <img src={item.img} alt={item.alt || ''} width="14" height="17" className="rounded" />
        ) : (
          <span className="text-sm">{item.icon}</span>
        )}
        <span>{item.text}</span>
        <span className="text-[var(--color-text)]/30">•</span>
      </span>
    ))}
  </div>
)

const MarqueeStrip = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full bg-[var(--color-surface)] py-1.5 overflow-hidden border-b border-[var(--color-border)]" role="marquee" aria-label="Announcements"
    >
      <div className="flex marquee-track">
        <Track />
        <div aria-hidden="true" className="flex"><Track /></div>
        <div aria-hidden="true" className="flex"><Track /></div>
        <div aria-hidden="true" className="flex"><Track /></div>
      </div>
    </motion.div>
  )
}

export default MarqueeStrip