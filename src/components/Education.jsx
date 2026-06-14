// src/components/Education.jsx
import { useState, useEffect } from 'react'

const educationData = [
    {
        degree: 'Bachelor of Science in Information Technology',
        school: 'Arellano University, Pasay City',
        year: '2022 — 2026',
    },
    {
        degree: 'Senior High School — STEM',
        school: 'Olivarez College, Parañaque City',
        year: '2020 — 2022',
    },
]

function Education() {
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
            transition: 'border-color 0.2s, box-shadow 0.2s',
        }}>
            <p style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: '0.4rem',
                lineHeight: 1.3,
            }}>Education</p>

            {educationData.map((edu, index) => (
                <div key={index} style={{
                    paddingBottom: index < educationData.length - 1 ? '25px' : 0,
                    borderBottom: index < educationData.length - 1 ? '1px solid var(--card-border)' : 'none',
                    marginBottom: index < educationData.length - 1 ? '25px' : 0,
                }}>
                    {/* Degree + Date: side-by-side on desktop, stacked on mobile */}
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: isMobile ? '0.15rem' : '1rem',
                        marginBottom: '0.2rem',
                    }}>
                        <p style={{
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            color: 'var(--ink)',
                            lineHeight: 1.4,
                            minWidth: 0,
                        }}>{edu.degree}</p>
                        <span style={{
                            fontSize: '0.75rem',
                            color: 'var(--ink-faint)',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            paddingTop: isMobile ? '0' : '2px',
                        }}>{edu.year}</span>
                    </div>

                    <p style={{
                        fontSize: '0.80rem',
                        color: 'var(--ink-muted)',
                    }}>{edu.school}</p>
                </div>
            ))}
        </div>
    )
}

export default Education