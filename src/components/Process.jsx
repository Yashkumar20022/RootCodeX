const steps = [
  ["01", "Discover", 'A short call to understand the business, the audience, and what "done" looks like.'],
  ["02", "Build", "Design and development happen in the open — you see drafts early, not just a final reveal."],
  ["03", "Launch", "The site or app goes live on your domain, tested across devices before handover."],
  ["04", "Grow", "Marketing setup and ongoing support keep the site working after launch, not just on day one."],
];

export default function Process() {
  return (
    <section id="process" className="sd-wrap sd-section">
      <div className="sd-sec-head">
        <span className="sd-eyebrow">How we work</span>
        <h2 className="sd-serif">Four stages, start to finish.</h2>
      </div>
      <div className="sd-process">
        {steps.map(([num, title, desc]) => (
          <div className="sd-step" key={num}>
            <div className="sd-step-num">{num}</div>
            <div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
