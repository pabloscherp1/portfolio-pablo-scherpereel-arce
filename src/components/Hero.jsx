import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 12, suffix: '',  label: 'Engineering Projects' },
  { value: 2,  suffix: '',  label: 'NASA JPL Stays' },
  { value: 60, suffix: '+', label: 'Team Members Led' },
  { value: 3,  suffix: '',  label: 'Student Rocket Programs' },
]

function StatCounter({ value, suffix, label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView) return
    let start = null
    const duration = 1400
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, value])

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-number">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <motion.div
        className="hero-top"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-orbit" aria-hidden="true">
          {/* Sun at (950, 80) — orbits sweep left and down into the hero */}
          <svg viewBox="0 0 1000 900" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Sun + crosshair */}
            <circle cx="950" cy="80" r="3.5" fill="#B0AEA9"/>
            <line x1="924" y1="80" x2="976" y2="80" stroke="#B0AEA9" strokeWidth="0.7"/>
            <line x1="950" y1="54" x2="950" y2="106" stroke="#B0AEA9" strokeWidth="0.7"/>

            {/* Orbit 1 — r=65 */}
            <circle cx="950" cy="80" r="65" stroke="#C0BEB9" strokeWidth="0.9"/>
            {/* planet @ 210° */}
            <circle cx="894" cy="47" r="2.5" fill="#B0AEA9"/>

            {/* Orbit 2 — r=118 */}
            <circle cx="950" cy="80" r="118" stroke="#C0BEB9" strokeWidth="0.9"/>
            {/* planet @ 190° */}
            <circle cx="834" cy="59" r="2" fill="#B0AEA9"/>

            {/* Orbit 3 — r=180 */}
            <circle cx="950" cy="80" r="180" stroke="#C0BEB9" strokeWidth="0.8"/>
            {/* planet @ 160° — accent */}
            <circle cx="781" cy="142" r="3" fill="#C4602A"/>

            {/* Orbit 4 — r=258 */}
            <circle cx="950" cy="80" r="258" stroke="#C0BEB9" strokeWidth="0.7"/>
            {/* planet @ 145° */}
            <circle cx="739" cy="228" r="2.5" fill="#B0AEA9"/>

            {/* Orbit 5 — r=355 */}
            <circle cx="950" cy="80" r="355" stroke="#C0BEB9" strokeWidth="0.6"/>
            {/* planet @ 125° — accent */}
            <circle cx="746" cy="371" r="3.5" fill="#C4602A"/>

            {/* Orbit 6 — r=468 */}
            <circle cx="950" cy="80" r="468" stroke="#C0BEB9" strokeWidth="0.5"/>
            {/* planet @ 115° */}
            <circle cx="752" cy="504" r="2" fill="#B0AEA9"/>
          </svg>
        </div>

        <div className="hero-content">
          <motion.p className="hero-eyebrow" variants={itemVariants}>
            MSc Mechanical Engineering · ETH Zurich · NASA JPL
          </motion.p>

          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="hero-title-line">Aerospace &amp;</span>
            <em className="hero-title-line">Systems Engineer</em>
          </motion.h1>

          <motion.p className="hero-bio" variants={itemVariants}>
            I design and build flight systems, autonomy architectures,
            and spacecraft mechanisms, from concept to hardware.
          </motion.p>

          <motion.a href="#projects" className="hero-scroll-hint" variants={itemVariants}>
            ↓ Scroll to projects
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        className="hero-stats"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        {STATS.map((s) => (
          <StatCounter key={s.label} {...s} />
        ))}
      </motion.div>
    </section>
  )
}
