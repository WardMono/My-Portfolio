// src/components/Skills.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
    SiHtml5, SiJavascript,
    SiReact, SiTailwindcss, SiBootstrap,
    SiNodedotjs, SiExpress, SiLaravel,
    SiMysql, SiPostgresql,
    SiGit, SiGithub, SiVercel,
    SiFigma, SiCanva,
} from 'react-icons/si'
import { FaCss3Alt } from 'react-icons/fa'
import { TbBrandAdobe } from 'react-icons/tb'
import { BsBraces } from 'react-icons/bs'

// ─── ICON + COLOR MAP ─────────────────────────────────────────────────────────
const skillMeta = {
    'HTML': { Icon: SiHtml5, color: '#E34F26' },
    'CSS': { Icon: FaCss3Alt, color: '#1572B6' },
    'JavaScript': { Icon: SiJavascript, color: '#F7DF1E' },
    'React': { Icon: SiReact, color: '#61DAFB' },
    'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
    'Bootstrap': { Icon: SiBootstrap, color: '#7952B3' },
    'Node.js': { Icon: SiNodedotjs, color: '#339933' },
    'Express.js': { Icon: SiExpress, color: '#000000' },
    'Laravel': { Icon: SiLaravel, color: '#FF2D20' },
    'MySQL': { Icon: SiMysql, color: '#4479A1' },
    'PostgreSQL': { Icon: SiPostgresql, color: '#336791' },
    'Git': { Icon: SiGit, color: '#F05032' },
    'GitHub': { Icon: SiGithub, color: '#181717' },
    'Vercel': { Icon: SiVercel, color: '#000000' },
    'Figma': { Icon: SiFigma, color: '#F24E1E' },
    'Adobe XD': { Icon: TbBrandAdobe, color: '#FF61F6' },
    'Canva': { Icon: SiCanva, color: '#00C4CC' },
}

// ─── STACK DATA ───────────────────────────────────────────────────────────────
const mainStack = [
    {
        group: 'Frontend',
        items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap'],
    },
    {
        group: 'Backend',
        items: ['Node.js', 'Express.js', 'Laravel', 'MySQL', 'PostgreSQL'],
    },
    {
        group: 'Tools & Specialized',
        items: ['Git', 'GitHub', 'Figma', 'Adobe XD', 'Vercel', 'Canva'],
    },
]

// ─── SKILL CHIP ───────────────────────────────────────────────────────────────
function SkillChip({ name, isMobile }) {
    const [hovered, setHovered] = useState(false)
    const meta = skillMeta[name] || { Icon: BsBraces, color: '#555' }
    const { Icon, color } = meta

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isMobile ? '0.3rem' : '0.5rem',
                padding: isMobile ? '0.65rem 0.25rem' : '1rem 0.5rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${hovered ? color : 'var(--card-border)'}`,
                background: hovered ? color : 'var(--card-bg)',
                transition: 'all 0.22s ease',
                transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: hovered ? `0 6px 20px ${color}40` : 'none',
                cursor: 'default',
                minWidth: 0,
            }}
        >
            <div style={{
                width: isMobile ? '32px' : '42px',
                height: isMobile ? '32px' : '42px',
                borderRadius: 'var(--radius-sm)',
                background: hovered ? 'rgba(255,255,255,0.25)' : 'rgba(26,26,26,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.22s ease',
                flexShrink: 0,
            }}>
                <Icon
                    size={isMobile ? 18 : 24}
                    style={{
                        color: hovered ? '#ffffff' : '#999',
                        transition: 'color 0.22s ease',
                    }}
                />
            </div>

            <span style={{
                fontSize: isMobile ? '0.55rem' : '0.62rem',
                fontWeight: 600,
                textAlign: 'center',
                lineHeight: 1.3,
                color: hovered ? 'rgba(255,255,255,0.9)' : 'var(--ink-muted)',
                transition: 'color 0.22s ease',
                letterSpacing: '0.01em',
            }}>
                {name}
            </span>
        </div>
    )
}

// ─── MAIN SKILLS COMPONENT ────────────────────────────────────────────────────
function Skills() {
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
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
            }}>
                <p style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    lineHeight: 1.3,
                }}>Tech Stack</p>

                <Link
                    to="/skills"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--ink-faint)',
                        textDecoration: 'none',
                        transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-faint)'}
                >
                    View All
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* Sections grid: 3 cols on desktop, 1 col on mobile */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '1rem',
            }}>
                {mainStack.map((section) => (
                    <div key={section.group}>
                        <p style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: 'var(--ink)',
                            marginBottom: '0.75rem',
                            letterSpacing: '-0.01em',
                        }}>
                            {section.group}
                        </p>

                        {/* Chips: 4 cols on mobile, 2 cols on desktop */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile
                                ? 'repeat(4, 1fr)'
                                : 'repeat(2, 1fr)',
                            gap: '0.4rem',
                        }}>
                            {section.items.map((item) => (
                                <SkillChip key={item} name={item} isMobile={isMobile} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Skills