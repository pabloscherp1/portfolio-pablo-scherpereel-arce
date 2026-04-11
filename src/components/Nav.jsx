export default function Nav() {
  return (
    <nav className="nav">
      <a href="#hero" className="nav-name">Pablo Scherpereel Arce</a>
      <div className="nav-right">
        <ul className="nav-links">
          <li><a href="#projects">Work</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a className="nav-cv" href="/pablo-scherpereel-portfolio/media/CV_Pablo_Scherpereel_Arce.pdf" target="_blank" rel="noreferrer">CV ↗</a>
      </div>
    </nav>
  )
}
