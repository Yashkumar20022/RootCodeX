
import { useState } from "react";

import { supabase } from "../Supabase.jsx";

export default function Contact() {
  const [form, setForm] = useState({ email: "", mobile: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!form.mobile.trim() || !/^[0-9+\-\s]{7,15}$/.test(form.mobile)) {
      errs.mobile = "Enter a valid mobile number";
    }
    if (!form.message.trim()) {
      errs.message = "Tell me a little about the project";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="sd-wrap sd-section">
      <div className="sd-contact">
        <div>
          <span className="sd-eyebrow">Get a quote</span>
          <h2 className="sd-serif">Have a project in mind?</h2>
          <p style={{ marginTop: 12 }}>
            Reach out directly, or send a quick message and I'll get back with a plan and a price.
          </p>
          <div className="sd-contact-info">
            <a href="mailto:bagyashkumar@gmail.com">
              <span className="sd-contact-icon">✉</span>
              <span>
                bagyashkumar@gmail.com
                <span className="sd-contact-sub">Email</span>
              </span>
            </a>
            <a href="tel:+919834924939">
              <span className="sd-contact-icon">☎</span>
              <span>
                +91 98349 24939
                <span className="sd-contact-sub">Call or WhatsApp</span>
              </span>
            </a>
            <div>
              <span className="sd-contact-icon">📍</span>
              <span>
                Gondia, Nagpur, Maharashtra
                <span className="sd-contact-sub">Based here</span>
              </span>
            </div>
          </div>
        </div>

        <div className="sd-form">
          {submitted ? (
            <div className="sd-success">
              Thanks — your message is ready. Reach out on{' '}
              <a href="mailto:bagyashkumar@gmail.com" style={{ textDecoration: 'underline' }}>
                bagyashkumar@gmail.com
              </a>{' '}
              or call +91 98349 24939 and mention what you shared here.
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="sd-field">
                <label htmlFor="sd-email">Email</label>
                <input
                  id="sd-email"
                  className="sd-input"
                  type="email"
                  placeholder="you@business.com"
                  value={form.email}
                  onChange={handleChange('email')}
                />
                {errors.email && <div className="sd-error">{errors.email}</div>}
              </div>
              <div className="sd-field">
                <label htmlFor="sd-mobile">Mobile number</label>
                <input
                  id="sd-mobile"
                  className="sd-input"
                  type="tel"
                  placeholder="+91 00000 00000"
                  value={form.mobile}
                  onChange={handleChange('mobile')}
                />
                {errors.mobile && <div className="sd-error">{errors.mobile}</div>}
              </div>
              <div className="sd-field">
                <label htmlFor="sd-message">Message</label>
                <textarea
                  id="sd-message"
                  className="sd-textarea"
                  placeholder="Tell me about your business and what you need..."
                  value={form.message}
                  onChange={handleChange('message')}
                />
                {errors.message && <div className="sd-error">{errors.message}</div>}
              </div>
              <button type="submit" className="sd-submit">Send message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
