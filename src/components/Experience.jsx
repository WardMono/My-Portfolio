// src/components/Experience.jsx
import { useState, useEffect } from 'react'

const experienceData = [
    {
        role: 'Technical Support Specialist Intern',
        company: 'New Simulator Center of the Philippines Inc.',
        location: 'Makati City',
        date: 'November 2025 – February 2026',
        current: true,
    },
]

function Experience() {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640)

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 640)
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])

    return (
        <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius)',
            padding: '1.5rem',
            height: '100%',
            boxSizing: 'border-box',
        }}>
            <p style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: '0.2rem',
                lineHeight: 1.3,
            }}>Experience</p>

            {experienceData.map((exp, index) => (
                <div key={index} style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '0.9rem 0',
                    borderBottom: index < experienceData.length - 1 ? '1px solid var(--card-border)' : 'none',
                }}>
                    {/* Dot */}
                    <div style={{ paddingTop: '5px' }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: exp.current ? 'var(--ink)' : 'var(--ink-faint)',
                            boxShadow: exp.current ? '0 0 0 1.5px var(--ink)' : '0 0 0 1.5px var(--ink-faint)',
                            flexShrink: 0,
                        }} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Role + Date: side-by-side on desktop, stacked on mobile */}
                        <div style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            justifyContent: 'space-between',
                            alignItems: isMobile ? 'flex-start' : 'flex-start',
                            gap: isMobile ? '0.15rem' : '1rem',
                            marginBottom: '0.15rem',
                        }}>
                            <p style={{
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                color: 'var(--ink)',
                                lineHeight: 1.4,
                                minWidth: 0,
                            }}>{exp.role}</p>
                            <span style={{
                                fontSize: '0.75rem',
                                color: 'var(--ink-faint)',
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                                paddingTop: isMobile ? '0' : '2px',
                            }}>{exp.date}</span>
                        </div>

                        <p style={{
                            fontSize: '0.80rem',
                            color: 'var(--ink-muted)',
                            marginBottom: '0.5rem',
                        }}>{exp.company} · {exp.location}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Experience