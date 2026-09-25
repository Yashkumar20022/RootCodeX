// Reveal elements on page load one-by-one.
// Reveal on scroll: attach sd-reveal / sd-reveal-visible as elements enter viewport.
// This file intentionally does not auto-scroll. It reveals elements on initial view and while the user scrolls.
(function(){
  if (typeof window === 'undefined') return;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function waitForRoot(cb){
    const root = document.querySelector('.sd-root');
    if (root) return cb(root);
    const obs = new MutationObserver(() => {
      const r = document.querySelector('.sd-root');
      if (r){ obs.disconnect(); cb(r); }
    });
    obs.observe(document.documentElement || document.body, { childList: true, subtree: true });
  }

  function collectElements(root){
    const items = [];
    // reveal major direct children and their immediate children for sequencing
    for (const child of Array.from(root.children)){
      if (child instanceof HTMLElement) items.push(child);
      for (const sub of Array.from(child.children)){
        if (sub instanceof HTMLElement) items.push(sub);
      }
    }
    if (items.length === 0){
      for (const el of Array.from(document.body.children)) if (el instanceof HTMLElement) items.push(el);
    }
    // dedupe
    const uniq = [];
    const seen = new Set();
    for (const el of items){
      if (!el || seen.has(el)) continue;
      seen.add(el);
      // skip very small/invisible items
      if (el.offsetWidth <= 8) continue;
      uniq.push(el);
    }
    return uniq;
  }

  function revealSequence(elements, baseDelay = 0, step = 110){
    elements.forEach((el, i) => {
      try{ el.classList.add('sd-reveal'); }catch(e){}
      const delay = baseDelay + i * step;
      setTimeout(() => {
        try{ el.classList.add('sd-reveal-visible'); }catch(e){}
      }, delay);
    });
  }

  function runReveal(){
    if (prefersReduced) return;
    waitForRoot(root => {
      const els = collectElements(root);
      if (!els.length) return;

      // add base class to all candidates
      els.forEach(el => { try{ el.classList.add('sd-reveal'); }catch(e){} });

      // Maintain a queue so elements revealed during scroll come one-by-one.
      // Allow hide on exit so scrolling up/down shows/hides elements each time.
      const inQueue = new Set();
      const queue = [];
      let processing = false;
      const step = 120;

      function enqueue(el){
        if (!el) return;
        // skip if already visible or already queued
        if (el.classList.contains('sd-reveal-visible') || inQueue.has(el)) return;
        inQueue.add(el);
        queue.push(el);
        if (!processing) processQueue();
      }

      async function processQueue(){
        processing = true;
        while(queue.length){
          const next = queue.shift();
          inQueue.delete(next);
          try{ next.classList.add('sd-reveal-visible'); }catch(e){}
          // wait between reveals so items appear one-by-one
          await new Promise(r => setTimeout(r, step));
        }
        processing = false;
      }

      const observer = new IntersectionObserver((entries) => {
        // handle each entry: enqueue on enter, remove visible on exit
        const entering = [];
        for (const en of entries){
          const el = en.target;
          if (en.isIntersecting){
            entering.push(el);
          } else {
            try{ el.classList.remove('sd-reveal-visible'); }catch(e){}
            // allow re-queueing later
            try{ inQueue.delete(el); }catch(e){}
          }
        }
        if (!entering.length) return;
        entering.sort((a,b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        entering.forEach(e => enqueue(e));
      }, { root: null, rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

      // observe all elements
      els.forEach(el => {
        try{ observer.observe(el); }catch(e){}
      });

      // enqueue any elements already in view so they reveal in sequence
      const initiallyVisible = els.filter(el => {
        const r = el.getBoundingClientRect();
        return r.top < (window.innerHeight * 0.88) && r.bottom > 0;
      });
      // add initial ones in document order
      initiallyVisible.forEach(el => enqueue(el));
    });
  }

  // expose runReveal on window for App.jsx to call after mount
  try{ window.__sd_runReveal = runReveal; }catch(e){}

})();
