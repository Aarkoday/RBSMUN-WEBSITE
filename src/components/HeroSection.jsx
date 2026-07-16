import React, { useRef } from 'react';
import { useEffect } from 'react';

export default function HeroSection() {
  const container = useRef();
  
  useEffect(() => {
    // Dynamic import to avoid SSR issues with GSAP ESM
    Promise.all([
      import('gsap'),
      import('@gsap/react')
    ]).then(([{ gsap }, { useGSAP }]) => {
      const tl = gsap.timeline();
      tl.to('#hero-white-overlay', {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 1.2,
          ease: 'power4.inOut',
          delay: 0.2
      })
      .from('.title-line', {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out'
      }, "-=0.5")
      .from('.hero-glass-panel', {
          y: 50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out'
      }, "-=0.8")
      .from('.hero-actions .btn', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.5)'
      }, "-=0.5");
    });
  }, []);

  return (
    <section className="hero flex items-center justify-center min-h-screen relative" id="hero" ref={container} style={{ background: "url('/images/PMS01512.webp') center/cover no-repeat" }}>
        <div className="hero-bg-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}></div>
        <div className="hero-mesh"></div>
        <div className="hero-glass-panel hero-glass-1"></div>
        <div className="hero-glass-panel hero-glass-2"></div>
        <div className="hero-glass-panel hero-glass-3"></div>
        <div className="hero-preloader-white" id="hero-white-overlay"></div>
        
        <div className="hero-content" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%', maxWidth: '900px', padding: '0 1.5rem', marginTop: '5rem' }}>
            <h1 className="hero-title" style={{ marginBottom: '2rem' }}>
                <span className="title-line" style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(4rem, 12vw, 9rem)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1 }}>RBSMUN</span>
                <span className="title-line title-outline" style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(4rem, 12vw, 9rem)', fontWeight: 700, letterSpacing: '-0.04em', WebkitTextStroke: '2px rgba(255,255,255,0.7)', color: 'transparent', lineHeight: 1 }}>2026</span>
            </h1>
            
            <div className="hero-actions" style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="/conference" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>Explore Conference</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
                <a href="/committees" className="btn btn-glass">View Committees</a>
            </div>
        </div>
    </section>
  );
}
