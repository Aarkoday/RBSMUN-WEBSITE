import React, { useState } from 'react';

const committees = [
    { id: 'disec', acronym: 'DISEC', fullname: 'Disarmament & International Security Committee', bg: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800' },
    { id: 'ecofin', acronym: 'ECOFIN', fullname: 'Economic & Financial Committee', bg: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800' },
    { id: 'icj', acronym: 'ICJ', fullname: 'International Court of Justice', bg: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800' },
    { id: 'irc', acronym: 'IRC', fullname: 'The Imperial Romanov Court', bg: 'https://images.unsplash.com/photo-1533052157796-0309191d4e78?auto=format&fit=crop&q=80&w=800' },
    { id: 'who', acronym: 'WHO', fullname: 'World Health Organization', bg: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800' },
    { id: 'hor', acronym: 'HoR', fullname: 'House of Representatives', bg: 'https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?auto=format&fit=crop&q=80&w=800' },
    { id: 'gcmr', acronym: 'GCMR', fullname: 'The Grand Convocation of the Mythical Realms', bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800' },
    { id: 'unsc', acronym: 'UNSC', fullname: 'UN Security Council', bg: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?auto=format&fit=crop&q=80&w=800' },
    { id: 'picc', acronym: 'PICC', fullname: 'Paris International Conference on Cambodia', bg: 'https://images.unsplash.com/photo-1502602898657-3e90760a92d8?auto=format&fit=crop&q=80&w=800' },
    { id: 'unwomen', acronym: 'UNWOMEN', fullname: 'UN Women', bg: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&q=80&w=800' },
    { id: 'hrc', acronym: 'HRC', fullname: 'Human Rights Council', bg: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800' },
    { id: 'uscc', acronym: 'US Senate', fullname: 'United States Congressional Committee (Senate)', bg: 'https://images.unsplash.com/photo-1541887088-294b2a8d381c?auto=format&fit=crop&q=80&w=800' },
    { id: 'sochum', acronym: 'SOCHUM', fullname: 'Social, Humanitarian & Cultural Committee', bg: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800' },
    { id: 'ipc', acronym: 'IPC', fullname: 'International Press Corps', bg: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800' },
];

function CommitteeOverlay({ committee, onClose }) {
    if (!committee) return null;
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

            <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '4rem' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{committee.acronym}</h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', marginTop: '0.5rem', letterSpacing: '0.05em' }}>{committee.fullname}</p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', marginBottom: '1rem' }}>Information</p>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', color: '#fff', marginBottom: '1.5rem' }}>Committee Mandate</h3>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '2rem' }}>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                            Committee mandate and agenda details coming soon. Background guides will be published prior to the conference.
                        </p>
                    </div>
                </div>

                <div>
                    <p style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', marginBottom: '1rem' }}>Resources</p>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', color: '#fff', marginBottom: '1.5rem' }}>Preparation</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.5rem' }}>
                            <h4 style={{ color: '#fff', marginBottom: '0.5rem', fontFamily: "'Space Grotesk', sans-serif" }}>Background Guide</h4>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1rem' }}>Download the official study guide designed by your Executive Board.</p>
                            <a href="#" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.5rem', color: '#fff', textDecoration: 'none', fontSize: '0.85rem' }}>Download PDF</a>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.5rem' }}>
                            <h4 style={{ color: '#fff', marginBottom: '0.5rem', fontFamily: "'Space Grotesk', sans-serif" }}>Contact Us</h4>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1rem' }}>Reach out with questions about the agenda or position papers.</p>
                            <a href="mailto:committee@ratobangala.edu.np" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#fff', textDecoration: 'none', fontSize: '0.75rem' }}>committee@ratobangala.edu.np</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CommitteesGrid() {
    const [activeCommittee, setActiveCommittee] = useState(null);

    return (
        <>
            <div className="committees-grid">
                {committees.map(c => (
                    <div
                        key={c.id}
                        className="glass-card committee-logo-card"
                        style={{ '--bg-url': `url('${c.bg}')`, cursor: 'pointer' }}
                        onClick={() => setActiveCommittee(c)}
                    >
                        <div className="card-glow"></div>
                        <h2 className="committee-massive-acronym">{c.acronym}</h2>
                    </div>
                ))}
            </div>

            {activeCommittee && (
                <CommitteeOverlay committee={activeCommittee} onClose={() => setActiveCommittee(null)} />
            )}
        </>
    );
}
