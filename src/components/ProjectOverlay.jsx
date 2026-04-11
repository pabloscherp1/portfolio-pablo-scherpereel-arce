import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.img
        src={src}
        alt={alt}
        className="lightbox-img"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      />
      <button className="lightbox-close" onClick={onClose}>✕</button>
    </motion.div>
  )
}

const overlayVariants = {
  initial: (dir) => ({
    y: dir === 0 ? '100%' : 0,
    x: dir === 1 ? '100%' : dir === -1 ? '-100%' : 0,
  }),
  animate: { y: 0, x: 0 },
  exit: (dir) => ({
    y: dir === 0 ? '100%' : 0,
    x: dir === 1 ? '-100%' : dir === -1 ? '100%' : 0,
  }),
}

export default function ProjectOverlay({ project, onClose, onNext, onPrev, hasPrev, hasNext, currentIndex, total, direction = 0 }) {
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const [lightboxAlt, setLightboxAlt] = useState('')

  const openLightbox = (src, alt) => { setLightboxSrc(src); setLightboxAlt(alt) }
  const closeLightbox = () => setLightboxSrc(null)

  // Escape — close lightbox first, then overlay
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { if (lightboxSrc) closeLightbox(); else onClose() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, lightboxSrc])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      <motion.div
        className="overlay"
        custom={direction}
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: 'spring', stiffness: 280, damping: 32 }}
      >
        <div className="overlay-header">
          <button className="overlay-back" onClick={onClose}>
            <span className="overlay-back-arrow" />
            Back
          </button>
          <span className="overlay-number">Project {project.id} / {String(total).padStart(2, '0')}</span>
        </div>

        <div className="overlay-scroll">
          <div className="overlay-body">
            <div className="overlay-left">
              <div className="overlay-hero-img">
                {project.heroImage
                  ? <img
                      src={`${import.meta.env.BASE_URL}${project.heroImage}`}
                      alt={project.title}
                      className={`overlay-img-real overlay-img-clickable${project.heroImageContain ? ' overlay-img-contain' : ''}`}
                      style={project.heroImagePosition ? { objectPosition: project.heroImagePosition } : undefined}
                      onClick={() => openLightbox(`${import.meta.env.BASE_URL}${project.heroImage}`, project.title)}
                    />
                  : <div className="img-placeholder">[Add image — filename: {project.heroPlaceholder}]</div>
                }
              </div>

              <div className="overlay-gallery">
                {project.galleryPlaceholders.map((filename, i) => {
                  const src = project.galleryImages?.[i]
                  const fullSrc = src ? `${import.meta.env.BASE_URL}${src}` : null
                  const contain = project.galleryImagesContain?.[i]
                  return fullSrc
                    ? <img
                        key={filename}
                        src={fullSrc}
                        alt={`${project.title} ${i + 1}`}
                        className={`overlay-img-real overlay-img-clickable${contain ? ' overlay-img-contain' : ''}`}
                        onClick={() => openLightbox(fullSrc, `${project.title} ${i + 1}`)}
                        onError={e => { e.currentTarget.style.display = 'none' }}
                      />
                    : null
                })}
              </div>

              <div className="overlay-skills">
                {project.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="overlay-right">
              {project.ongoing && (
                <span className="ongoing-tag"><span className="ongoing-dot" />Ongoing</span>
              )}
              <p className="overlay-badge">{project.badge}</p>
              <h1 className="overlay-title">{project.title}</h1>
              <p className="overlay-subtitle">{project.subtitle}</p>
              <p className="overlay-overview">{project.overview}</p>
              <p className="overlay-details-title">Key Details</p>
              <div>
                {project.keyDetails.map((d) => (
                  <div key={d.label} className="key-detail">
                    <span className="key-detail-label">{d.label}</span>
                    <span className="key-detail-value">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="overlay-footer">
          <button className="overlay-nav-btn" onClick={onPrev} disabled={!hasPrev}>
            <span style={{ fontSize: '16px', lineHeight: 1 }}>←</span>
            Prev
          </button>
          <span className="overlay-nav-center">{currentIndex + 1} / {total}</span>
          <button className="overlay-nav-btn" onClick={onNext} disabled={!hasNext}>
            Next
            <span style={{ fontSize: '16px', lineHeight: 1 }}>→</span>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxSrc && <Lightbox src={lightboxSrc} alt={lightboxAlt} onClose={closeLightbox} />}
      </AnimatePresence>
    </>
  )
}
