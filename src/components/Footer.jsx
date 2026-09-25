import ServiceIcon3D from './ServiceIcon3D.jsx';



export default function Footer() {
  return (
    <footer className="sd-footer">
      <div className="sd-wrap">
        <div className="sd-footer-grid">
            <div className="sd-foot-col sd-foot-brand">
            <div className="sd-brand">
              <a href="https://www.rootcodetechnology.com" target="_blank" rel="noopener noreferrer" className="sd-foot-link">
                <div>
                  <div className="sd-brand-text" style={{ lineHeight: 1 }}>
                    <span className="sd-brand-title">Root<span className="sd-brand-accent">CodeX</span></span>
                    <div className="sd-brand-sub">rootcodetechnology.com</div>
                  </div>
                  <div className="sd-foot-tag">Grow Your Digital Roots</div>
                </div>
              </a>
            </div>
          </div>

          <div className="sd-foot-col">
            <h4>Services</h4>
            <ul className="sd-foot-list">
              <li>Website Development</li>
              <li>Web App Development</li>
              <li>E-commerce Development</li>
              <li>UI/UX Design</li>
              <li>Digital Marketing</li>
              <li>SEO</li>
              <li>Social Media Marketing</li>
            </ul>
          </div>

          <div className="sd-foot-col">
            <h4>Quick Links</h4>
            <ul className="sd-foot-list">
              <li><a href="#services">Services</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#contact">Get a Quote</a></li>
            </ul>
          </div>

          <div className="sd-foot-col">
            <h4>Our Presence & Contact</h4>
            <div className="sd-foot-contact">
              <div>Gondia, Nagpur, Maharashtra</div>
              <div>
                <a href="tel:+919834924939">+91 98349 24939</a>
              </div>
              <div>
                <a href="mailto:bagyashkumar@gmail.com">bagyashkumar@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="sd-foot-row" style={{ marginTop: 22 }}>
          <span>© 2026 <span className="sd-brand-title" style={{ fontSize: '1rem' }}>Root<span className="sd-brand-accent">CodeX</span></span>. All rights reserved.</span>
          <span>Websites · Apps · Digital Marketing</span>
        </div>
      </div>
    </footer>
  );
}
