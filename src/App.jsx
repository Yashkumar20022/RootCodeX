import React from "react";
import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/HeroR3F.jsx";
import BackgroundR3F from "./components/BackgroundR3F.jsx";
import Services from "./components/Services.jsx";
import Work from "./components/Work.jsx";
import Process from "./components/Process.jsx";
import Why from "./components/Why.jsx";
import Contact from "./components/ContactNew.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  useEffect(() => {
    const base = 'https://www.rootcodetechnology.com';
    const routes = {
      '/': {
        title: 'RootCode Technology | Website & App Development Company in Nagpur, Maharashtra',
        desc: 'RootCode Technology — Website, app development and digital marketing agency based in Nagpur/Gondia, Maharashtra. Fast websites, reliable apps & SEO.'
      },
      '/website-development': {
        title: 'Website Development in Nagpur | RootCode Technology',
        desc: 'Website development Nagpur — fast, responsive business websites, e-commerce and hosting from RootCode Technology.'
      },
      '/app-development': {
        title: 'App Development Maharashtra | RootCode Technology',
        desc: 'App development Maharashtra — web apps, dashboards and custom tools built by RootCode Technology.'
      },
      '/digital-marketing': {
        title: 'Digital Marketing Agency Nagpur | RootCode Technology',
        desc: 'Digital marketing services — SEO, social media and paid campaigns for small businesses by RootCode Technology.'
      }
    };

    function ensureMeta(selector, attr, value) {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[')) {
          // do nothing, we'll set attributes below
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
      return el;
    }

    function updateForPath(p) {
      const route = routes[p] || routes['/'];
      document.title = route.title;
      // description
      let desc = document.querySelector('meta[name="description"]');
      if (!desc) { desc = document.createElement('meta'); desc.setAttribute('name', 'description'); document.head.appendChild(desc); }
      desc.setAttribute('content', route.desc);

      // open graph / twitter
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) { ogTitle = document.createElement('meta'); ogTitle.setAttribute('property','og:title'); document.head.appendChild(ogTitle); }
      ogTitle.setAttribute('content', route.title);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) { ogDesc = document.createElement('meta'); ogDesc.setAttribute('property','og:description'); document.head.appendChild(ogDesc); }
      ogDesc.setAttribute('content', route.desc);

      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) { ogUrl = document.createElement('meta'); ogUrl.setAttribute('property','og:url'); document.head.appendChild(ogUrl); }
      ogUrl.setAttribute('content', base + p);

      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (!twitterTitle) { twitterTitle = document.createElement('meta'); twitterTitle.setAttribute('name','twitter:title'); document.head.appendChild(twitterTitle); }
      twitterTitle.setAttribute('content', route.title);

      let twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (!twitterDesc) { twitterDesc = document.createElement('meta'); twitterDesc.setAttribute('name','twitter:description'); document.head.appendChild(twitterDesc); }
      twitterDesc.setAttribute('content', route.desc);

      // canonical
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel','canonical'); document.head.appendChild(canonical); }
      canonical.setAttribute('href', base + p);
    }

    // update on load
    updateForPath(window.location.pathname || '/');

    // also update on history navigation
    const onPop = () => updateForPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const editors = Array.from(document.querySelectorAll('.ai-editor, [contenteditable="true"]'));
    const attached = [];

    function attach(editor) {
      if (!editor) return null;
      if (getComputedStyle(editor).position === 'static') editor.style.position = 'relative';

      const glow = document.createElement('div');
      glow.className = 'ai-cursor-glow';
      const caret = document.createElement('div');
      caret.className = 'ai-fake-caret';
      editor.appendChild(glow);
      editor.appendChild(caret);

      function update() {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) {
          caret.style.opacity = '0';
          glow.style.opacity = '0';
          return;
        }
        const range = sel.getRangeAt(0).cloneRange();
        range.collapse(true);

        const anchor = sel.anchorNode;
        if (!anchor || (!editor.contains(anchor) && !editor.contains(sel.focusNode))) {
          caret.style.opacity = '0';
          glow.style.opacity = '0';
          return;
        }

        const rects = range.getClientRects();
        const rect = rects[0];
        if (!rect) {
          caret.style.opacity = '0';
          glow.style.opacity = '0';
          return;
        }
        const parentRect = editor.getBoundingClientRect();
        const x = rect.left - parentRect.left + (rect.width / 2);
        const y = rect.top - parentRect.top + (rect.height / 2);

        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
        caret.style.left = `${x}px`;
        caret.style.top = `${rect.top - parentRect.top}px`;

        glow.style.opacity = '1';
        caret.style.opacity = '1';
      }

      const events = ['keyup', 'mouseup', 'input', 'focus'];
      events.forEach(ev => editor.addEventListener(ev, update));
      document.addEventListener('selectionchange', update);
      editor.addEventListener('blur', () => { caret.style.opacity = '0'; glow.style.opacity = '0'; });

      return () => {
        events.forEach(ev => editor.removeEventListener(ev, update));
        document.removeEventListener('selectionchange', update);
        try { glow.remove(); } catch(e){}
        try { caret.remove(); } catch(e){}
      };
    }

    for (const ed of editors) {
      const cleanup = attach(ed);
      attached.push(cleanup);
    }

    // Trigger reveal after React has mounted elements
    setTimeout(() => {
      try{
        if (window.__sd_runReveal) window.__sd_runReveal();
      }catch(e){}
    }, 160);

    return () => {
      attached.forEach(fn => { try { fn && fn(); } catch(e){} });
    };
  }, []);

  return (
    <div className="sd-root">
      <BackgroundR3F />
      <Header />
      <Hero />
      <Services />
      <Work />
      <Process />
      <Why />
      <Contact />
      <Footer />
    </div>
  );
}
