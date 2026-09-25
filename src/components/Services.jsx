const services = [
  {
    num: "01",
    title: "Website Development",
    desc: "Fast, responsive business websites built with React or plain HTML/CSS/JS — built to load quickly and convert visitors into enquiries.",
    items: ["Business & portfolio sites", "E-commerce basics", "Hosting & domain setup", "Ongoing edits & support"],
  },
  {
    num: "02",
    title: "App Development",
    desc: "Web apps and internal tools that solve a real operational problem — dashboards, calculators, booking systems, and employee/customer management.",
    items: ["Custom dashboards", "Internal tools", "API integrations", "React front-ends"],
  },
  {
    num: "03",
    title: "Digital Marketing",
    desc: "Set up the basics that get local businesses found — Google Business Profile, social presence, and simple paid campaigns that fit a small budget.",
    items: ["Google Business setup", "Instagram & Facebook pages", "Content calendar", "Basic ad campaigns"],
  },
];

import ServiceIcon3D from "./ServiceIcon3D.jsx";

export default function Services() {
  return (
    <section id="services" className="sd-wrap sd-section">
      <div className="sd-sec-head">
        <span className="sd-eyebrow">Services</span>
        <h2 className="sd-serif">Three things, done properly.</h2>
        <p>No bloated packages. Pick what your business needs right now, add the rest as you grow.</p>
      </div>

      {services.map((s) => (
        <div className="sd-service-row" key={s.num}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ServiceIcon3D size={64} type={s.num === '01' ? 'torus' : 'box'} />
          </div>
          <div>
            <span className="sd-service-num">{s.num}</span>
            <h3 className="sd-serif">{s.title}</h3>
          </div>
          <div className="sd-service-body">
            <p>{s.desc}</p>
            <ul>
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}
