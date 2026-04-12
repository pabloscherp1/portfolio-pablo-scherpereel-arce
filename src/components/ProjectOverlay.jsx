import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Lightbox({ images, index, onClose, onNavigate }) {
  const src = images[index]?.src
  const alt = images[index]?.alt
  const hasPrev = index > 0
  const hasNext = index < images.length - 1

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(index - 1)
      if (e.key === 'ArrowRight' && hasNext) onNavigate(index + 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onNavigate, index, hasPrev, hasNext])

  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      {hasPrev && (
        <button className="lightbox-arrow lightbox-arrow-left" onClick={(e) => { e.stopPropagation(); onNavigate(index - 1) }}>←</button>
      )}
      <motion.img
        key={src}
        src={src}
        alt={alt}
        className="lightbox-img"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      />
      {hasNext && (
        <button className="lightbox-arrow lightbox-arrow-right" onClick={(e) => { e.stopPropagation(); onNavigate(index + 1) }}>→</button>
      )}
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
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const lightboxImages = [
    ...(project.heroImage ? [{ src: `${import.meta.env.BASE_URL}${project.heroImage}`, alt: project.title }] : []),
    ...(project.galleryPlaceholders
      .map((_, i) => project.galleryImages?.[i]
        ? { src: `${import.meta.env.BASE_URL}${project.galleryImages[i]}`, alt: `${project.title} ${i + 1}` }
        : null)
      .filter(Boolean))
  ]

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  // Escape — close lightbox first, then overlay
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { if (lightboxIndex !== null) closeLightbox(); else onClose() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, lightboxIndex])

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
                      onClick={() => openLightbox(0)}
                    />
                  : <div className="img-placeholder">[Add image — filename: {project.heroPlaceholder}]</div>
                }
              </div>

              <div className="overlay-gallery">
                {project.galleryPlaceholders.map((filename, i) => {
                  const src = project.galleryImages?.[i]
                  const fullSrc = src ? `${import.meta.env.BASE_URL}${src}` : null
                  const contain = project.galleryImagesContain?.[i]
                  const lightboxIdx = project.heroImage ? i + 1 : i
                  return fullSrc
                    ? <img
                        key={filename}
                        src={fullSrc}
                        alt={`${project.title} ${i + 1}`}
                        className={`overlay-img-real overlay-img-clickable${contain ? ' overlay-img-contain' : ''}`}
                        onClick={() => openLightbox(lightboxIdx)}
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
              <div className="overlay-badge-row">
                <p className="overlay-badge">{project.badge}</p>
                {project.ongoing && (
                  <span className="ongoing-tag"><span className="ongoing-dot" />Ongoing</span>
                )}
              </div>
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
        {lightboxIndex !== null && (
          <Lightbox
            images={lightboxImages}
            index={lightboxIndex}
            onClose={closeLightbox}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </>
  )
}
