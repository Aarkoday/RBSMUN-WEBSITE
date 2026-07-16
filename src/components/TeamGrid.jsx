import React, { useState } from 'react';

const teams = [
    {
        id: 'logistics',
        role: 'Head of Logistics',
        title: 'Logistics',
        desc: 'The Logistics team handles all on-ground operations — from venue management and delegate registration to transportation coordination and material procurement. They are the backbone that keeps the conference running seamlessly behind the scenes.',
    },
    {
        id: 'secretariat',
        role: 'Secretariat',
        title: 'Secretariat',
        desc: 'The Secretariat is the executive leadership of RBSMUN. Led by the Secretary-General and Deputy Secretary-Generals, this team sets the academic vision, oversees all committee operations, and ensures the conference upholds the highest standards of Model UN excellence.',
    },
    {
        id: 'it',
        role: 'Head of IT',
        title: 'Information Technology',
        desc: 'The IT team is responsible for all things digital — the conference website, registration systems, live updates, audio-visual support during sessions, and ensuring seamless technical infrastructure throughout the event.',
    },
    {
        id: 'art',
        role: 'Head of Art',
        title: 'Art & Design',
        desc: 'The Art team crafts the entire visual identity of RBSMUN — from branding, posters, and social media graphics to stage design and conference-day decor. They bring the creative vision that defines the aesthetic of each iteration.',
    },
    {
        id: 'media',
        role: 'Head of Media',
        title: 'Media & Communications',
        desc: 'The Media team captures and communicates the RBSMUN story — through photography, videography, social media coverage, press releases, and the official conference newsletter.',
    },
    {
        id: 'photography',
        role: 'Head of Photography',
        title: 'Photography',
        desc: 'The Photography team is responsible for capturing the essence of the conference in still frames. From intense committee debates to the vibrant social events, they freeze the best moments of RBSMUN in time.',
    },
];

function TeamOverlay({ team, onClose }) {
    if (!team) return null;
    return (
        <div
            style={{
                position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(5,5,5,0.95)',
                backdropFilter: 'blur(20px)', overflowY: 'auto', padding: '2rem'
            }}
        >
            <button
                onClick={onClose}
                style={{
                    position: 'fixed', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)', color: '#fff', width: '48px', height: '48px',
                    borderRadius: '50%', cursor: 'pointer', fontSize: '1.25rem', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}
            >✕</button>

            <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 700, color: '#fff' }}>{team.title}</h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', marginTop: '0.5rem' }}>{team.role}</p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.75rem', color: '#fff', marginBottom: '1.5rem' }}>About This Team</h3>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '2rem' }}>
                        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>{team.desc}</p>
                    </div>
                </div>

                <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.75rem', color: '#fff', marginBottom: '1.5rem' }}>Contact</h3>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.5rem' }}>
                        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>Have questions about this department? Reach out to us directly.</p>
                        <a href="mailto:contact@ratobangala.edu.np" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#fff', textDecoration: 'none', fontSize: '0.85rem' }}>contact@ratobangala.edu.np</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TeamGrid() {
    const [activeTeam, setActiveTeam] = useState(null);

    return (
        <>
            <div className="team-grid">
                {teams.map(t => (
                    <div key={t.id} className="team-card-wrapper">
                        <div
                            className="glass-card team-card"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setActiveTeam(t)}
                        >
                            <div className="team-card-overlay"></div>
                            <div className="team-card-content">
                                <h3>To be announced</h3>
                                <p className="team-role">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {activeTeam && (
                <TeamOverlay team={activeTeam} onClose={() => setActiveTeam(null)} />
            )}
        </>
    );
}
