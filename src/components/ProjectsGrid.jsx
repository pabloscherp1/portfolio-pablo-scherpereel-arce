import ProjectCard from './ProjectCard'

export default function ProjectsGrid({ projects, onProjectClick }) {
  const featured   = projects.filter((p) => p.featured)
  const regular    = projects.filter((p) => !p.featured && !p.coursework)
  const coursework = projects.filter((p) => p.coursework)

  return (
    <section className="projects-section" id="projects">
      <div className="section-eyebrow-row">
        <span className="section-eyebrow">Selected Work</span>
      </div>
      <div className="section-header">
        <h2 className="section-title">Projects</h2>
        <span className="section-count">{projects.length} total</span>
      </div>

      {/* Featured — 2 col */}
      <div className="featured-grid">
        {featured.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            variant="featured"
            onClick={onProjectClick}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* Regular — 3 col */}
      <div className="regular-grid">
        {regular.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            variant="regular"
            onClick={onProjectClick}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* Coursework — 4 col */}
      <div className="coursework-header">
        <span className="coursework-label">Coursework</span>
        <span className="section-count">{coursework.length} projects</span>
      </div>
      <div className="coursework-grid">
        {coursework.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            variant="coursework"
            onClick={onProjectClick}
            delay={i * 0.08}
          />
        ))}
      </div>
    </section>
  )
}
