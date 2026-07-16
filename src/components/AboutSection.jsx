import React, { useRef, useEffect } from 'react';

export default function AboutSection() {
    const sectionRef = useRef();

    useEffect(() => {
        // Dynamic imports to avoid SSR issues
        Promise.all([
            import('gsap'),
            import('gsap/ScrollTrigger')
        ]).then(([{ gsap }, { ScrollTrigger }]) => {
            gsap.registerPlugin(ScrollTrigger);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "bottom 25%",
                    scrub: 1,
                }
            });

            tl.from('.about-content-block', {
                y: 80,
                opacity: 0,
                stagger: 0.2,
                ease: "power2.out",
                duration: 1
            }).to('.about-floating-element', {
                y: -80,
                rotation: 15,
                ease: "none",
                duration: 1
            }, "<");

            const numberBlock = document.querySelector('.about-number-block');
            if (numberBlock) {
                numberBlock.addEventListener('mouseenter', () => {
                    gsap.to(numberBlock, { scale: 1.05, duration: 0.3, ease: "back.out(2)" });
                });
                numberBlock.addEventListener('mouseleave', () => {
                    gsap.to(numberBlock, { scale: 1, duration: 0.3, ease: "power2.out" });
                });
            }
        });
    }, []);

    return (
        <section ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', padding: '8rem 0' }} id="about">
            {/* Unique animated background elements */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}>
                <div className="about-floating-element" style={{ position: 'absolute', right: '-10%', top: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(90, 19, 254, 0.1) 0%, transparent 70%)', borderRadius: '50%' }}></div>
                <div className="about-floating-element" style={{ position: 'absolute', left: '-5%', bottom: '-10%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(74, 144, 226, 0.1) 0%, transparent 70%)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center' }}>

                    {/* Wrapper for side-by-side layout on large screens */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', width: '100%' }}>

                        {/* Left: The "21" block */}
                        <div className="about-content-block" style={{ flex: '0 0 min(420px, 100%)', minWidth: 0 }}>
                            <div
                                className="about-number-block"
                                style={{
                                    position: 'relative', borderRadius: '1.5rem', overflow: 'hidden',
                                    padding: '3rem 2.5rem', cursor: 'pointer',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                                    backdropFilter: 'blur(20px)',
                                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                                }}
                            >
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #3b82f6, #a855f7)' }}></div>
                                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                                    <span style={{
                                        display: 'block', fontSize: 'clamp(7rem, 20vw, 11rem)', fontWeight: 700,
                                        lineHeight: 1, letterSpacing: '-0.05em',
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        WebkitTextFillColor: 'transparent',
                                        WebkitTextStroke: '2px rgba(255,255,255,0.85)',
                                        textShadow: '0 0 40px rgba(74,144,226,0.25)'
                                    }}>21</span>
                                    <span style={{ display: 'block', fontSize: '1.1rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '1rem', fontWeight: 500 }}>Iterations</span>
                                </div>
                                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Est. 2005</p>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', animation: 'pulse 2s infinite' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Text */}
                        <div className="about-content-block" style={{ flex: '1 1 300px', minWidth: 0 }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem 1rem', borderRadius: '9999px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', marginBottom: '1.5rem' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60a5fa' }}></span>
                                <span style={{ color: '#60a5fa', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.75rem' }}>About RBSMUN</span>
                            </div>

                            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', marginBottom: '2rem', lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: "'Syne', sans-serif" }}>
                                Nepal's <span style={{ WebkitTextFillColor: 'transparent', background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #60a5fa)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', animation: 'textGradient 4s linear infinite' }}>Most Prestigious</span><br />Conference
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 300 }}>
                                <p>
                                    Two decades of building a space where students transform into diplomats.
                                    Hosted entirely by the students of Rato Bangala School, this conference is
                                    the nexus for debate, negotiation, and drafting solutions to the world's
                                    most pressing challenges.
                                </p>

                                <div style={{ position: 'relative', paddingLeft: '1.5rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', borderLeft: '2px solid rgba(168,85,247,0.5)', marginTop: '0.5rem' }}>
                                    <strong style={{ display: 'block', color: '#fff', marginBottom: '0.25rem', fontSize: '1.1rem', fontWeight: 500 }}>Conflict Prevention &amp; Peace</strong>
                                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>This year's theme confronts a polarised world head-on, exploring the structures that hold societies together.</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '2.5rem' }}>
                                <a href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 2rem', borderRadius: '9999px', background: '#fff', color: '#000', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem', transition: 'background 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                                    Read our full history
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes textGradient {
                    0% { background-position: 0% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
            `}</style>
        </section>
    );
}
