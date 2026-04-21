export default function About() {
  return (
    <>
      <section className="about-section" id="about">
        <div className="about-left">
          <p className="about-eyebrow">About</p>
          <h2 className="about-name">
            Building things that<br />
            have to work.
          </h2>
          <p className="about-bio">
            MSc Mechanical Engineering at ETH Zurich, finishing a Master's thesis
            on the Endurance lunar rover at NASA JPL. Former Chief Engineer of ARIS
            Hermes, structural and recovery lead at EPFL Rocket Team and GNC
            researcher on multi-spacecraft interferometry. Based in Zurich. Open to
            space systems, structural and GNC engineering roles from November 2026.
          </p>
        </div>

        <div className="about-right" id="contact">
          <h3 className="contact-heading">Contact</h3>

          <div className="contact-item">
            <span className="contact-label">Email</span>
            <a
              className="contact-value"
              href="mailto:pabloscherpereel@gmail.com"
            >
              pabloscherpereel@gmail.com
            </a>
          </div>

          <div className="contact-item">
            <span className="contact-label">LinkedIn</span>
            <a
              className="contact-value"
              href="https://linkedin.com/in/pablo-scherpereel-arce"
              target="_blank"
              rel="noreferrer"
            >
              pablo-scherpereel-arce
            </a>
          </div>

          <div className="contact-item">
            <span className="contact-label">Location</span>
            <span className="contact-value">Zurich, Switzerland</span>
          </div>

          <div className="contact-item">
            <span className="contact-label">Available</span>
            <span className="contact-value">November 2026</span>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span className="footer-copy">Pablo Scherpereel Arce — Portfolio 2026</span>
      </footer>
    </>
  )
}
