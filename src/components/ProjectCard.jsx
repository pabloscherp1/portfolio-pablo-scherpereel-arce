import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function ProjectCard({ project, variant = 'regular', onClick, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const showImage = variant !== 'coursework'
  const imgClass = variant === 'featured' ? 'card-img-featured' : 'card-img-regular'

  return (
    <motion.article
      ref={ref}
      className={`project-card ${variant}`}
      onClick={() => onClick(project)}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(project)}
    >
      {showImage && (
        <div className={`card-img ${imgClass}`}>
          {project.heroImage
            ? <img
                src={`${import.meta.env.BASE_URL}${project.heroImage}`}
                alt={project.title}
                className={`card-img-real${project.heroImageContain ? ' card-img-contain' : ''}`}
                style={project.heroImagePosition ? { objectPosition: project.heroImagePosition } : undefined}
              />
            : <div className="img-placeholder">[Add image — filename: {project.heroPlaceholder}]</div>
          }
        </div>
      )}

      <div className="card-badge-row">
        <p className="card-badge">{project.badge}</p>
        {project.ongoing && (
          <span className="ongoing-tag"><span className="ongoing-dot" />Ongoing</span>
        )}
      </div>
      <h2 className="card-title">{project.title}</h2>
      <p className="card-subtitle">{project.subtitle}</p>

      <div className="card-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="card-tag">{tag}</span>
        ))}
      </div>

      <p className="card-brief">{project.brief}</p>
    </motion.article>
  )
}
