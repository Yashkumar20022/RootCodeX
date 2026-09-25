const points = [
  {
    title: "You talk to the person building it",
    desc: "No account managers or hand-offs — every project is built directly by the person you're talking to.",
  },
  {
    title: "Pricing that fits a small business",
    desc: "Packages start small and scale as your needs grow, instead of one large upfront cost.",
  },
  {
    title: "Built to actually launch",
    desc: "Every project ships with hosting and a working handover — not a file left half-finished.",
  },
  {
    title: "Support after handover",
    desc: "A month of edits and fixes is included after launch, so the site keeps working once it's live.",
  },
];

export default function Why() {
  return (
    <section className="sd-wrap sd-section">
      <div className="sd-sec-head">
        <span className="sd-eyebrow">Why RootCode</span>
        <h2 className="sd-serif">Small by design.</h2>
      </div>
      <div className="sd-why-grid">
        {points.map((p) => (
          <div className="sd-why-item" key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
