export default function Footer() {
  return (
    <footer className="sd-footer">
      <div className="sd-wrap">
        <div className="sd-footer-grid">
            <div className="sd-foot-col sd-foot-brand">
            <div className="sd-brand">
              <svg role="img" aria-label="RootCode Technology logo" width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="6" cy="18" r="2.4" fill="#3FD6C0" />
                <circle cx="18" cy="6" r="2.4" fill="#FF7A59" />
                <circle cx="18" cy="18" r="2.4" fill="#8B6CFF" />
                <path d="M8 17 L16 7" stroke="#332C57" strokeWidth="1.4" />
                <path d="M8.5 18 L16 18" stroke="#332C57" strokeWidth="1.4" />
              </svg>
              <div>
                <div style={{ fontWeight: 700 }}>RootCode Technology</div>
                <div className="sd-foot-tag">Grow Your Digital Roots</div>
              </div>
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
                <a href="tel:+91934924939">+91 934924939</a>
              </div>
              <div>
                <a href="mailto:bagyashkumar@gmail.com">bagyashkumar@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="sd-foot-row" style={{ marginTop: 22 }}>
          <span>© 2026 RootCode Technology. All rights reserved.</span>
          <span>Websites · Apps · Digital Marketing</span>
        </div>
      </div>
    </footer>
  );
}
