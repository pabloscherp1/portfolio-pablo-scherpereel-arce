import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ProjectsGrid from './components/ProjectsGrid'
import About from './components/About'
import ProjectOverlay from './components/ProjectOverlay'
import projects from './projects'

export default function App() {
  const [overlayIndex, setOverlayIndex] = useState(null)

  const openProject = (project) => {
    setOverlayIndex(projects.findIndex((p) => p.id === project.id))
  }

  const closeOverlay = () => setOverlayIndex(null)

  const goPrev = () => setOverlayIndex((i) => Math.max(0, i - 1))
  const goNext = () => setOverlayIndex((i) => Math.min(projects.length - 1, i + 1))

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProjectsGrid projects={projects} onProjectClick={openProject} />
        <About />
      </main>

      <AnimatePresence>
        {overlayIndex !== null && (
          <ProjectOverlay
            key={overlayIndex}
            project={projects[overlayIndex]}
            onClose={closeOverlay}
            onPrev={goPrev}
            onNext={goNext}
            hasPrev={overlayIndex > 0}
            hasNext={overlayIndex < projects.length - 1}
            currentIndex={overlayIndex}
            total={projects.length}
          />
        )}
      </AnimatePresence>
    </>
  )
}
