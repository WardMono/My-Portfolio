// src/pages/SkillsPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fullStack } from '../data/skills'
import { usePageReady } from '../hooks/usePageReady'

import {
    SiHtml5, SiJavascript, SiPhp, SiXml,
    SiReact, SiTailwindcss, SiBootstrap, SiJquery,
    SiNodedotjs, SiExpress, SiLaravel,
    SiMysql, SiPostgresql,
    SiGit, SiGithub, SiGitlab, SiVercel,
    SiFigma, SiCanva, SiDavinciresolve,
    SiGodotengine, SiJson, SiOpenai,
} from 'react-icons/si'
import { FaCss3Alt, FaJava, FaGamepad } from 'react-icons/fa'
import { TbBrandAdobe, TbApi, TbDeviceGamepad2 } from 'react-icons/tb'
import { MdPhotoSizeSelectSmall, MdDesignServices } from 'react-icons/md'
import { BsBraces } from 'react-icons/bs'
import { VscSymbolColor } from 'react-icons/vsc'

function useBreakpoint() {
    const [width, setWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    )
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])
    return {
        isMobile: width < 480,
        isTablet: width >= 480 && width < 768,
        isDesktop: width >= 768,
        width,
    }
}

const skillMeta = {
    'HTML': { Icon: SiHtml5, color: '#E34F26' },
    'CSS': { Icon: FaCss3Alt, color: '#1572B6' },
    'JavaScript': { Icon: SiJavascript, color: '#F7DF1E' },
    'PHP': { Icon: SiPhp, color: '#777BB4' },
    'Java': { Icon: FaJava, color: '#007396' },
    'XML': { Icon: SiXml, color: '#FF6600' },
    'React': { Icon: SiReact, color: '#61DAFB' },
    'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
    'Bootstrap': { Icon: SiBootstrap, color: '#7952B3' },
    'jQuery': { Icon: SiJquery, color: '#0769AD' },
    'Responsive Design': { Icon: MdDesignServices, color: '#FF7043' },
    'Wireframing': { Icon: VscSymbolColor, color: '#9C27B0' },
    'Node.js': { Icon: SiNodedotjs, color: '#339933' },
    'Express.js': { Icon: SiExpress, color: '#000000' },
    'Laravel': { Icon: SiLaravel, color: '#FF2D20' },
    'REST APIs': { Icon: TbApi, color: '#FF6B35' },
    'MySQL': { Icon: SiMysql, color: '#4479A1' },
    'PostgreSQL': { Icon: SiPostgresql, color: '#336791' },
    'Git': { Icon: SiGit, color: '#F05032' },
    'GitHub': { Icon: SiGithub, color: '#181717' },
    'GitLab': { Icon: SiGitlab, color: '#FC6D26' },
    'Vercel': { Icon: SiVercel, color: '#000000' },
    'Figma': { Icon: SiFigma, color: '#F24E1E' },
    'Adobe XD': { Icon: TbBrandAdobe, color: '#FF61F6' },
    'Canva': { Icon: SiCanva, color: '#00C4CC' },
    'CapCut': { Icon: TbDeviceGamepad2, color: '#000000' },
    'DaVinci Resolve': { Icon: SiDavinciresolve, color: '#FF6B35' },
    'Prompt Engineering': { Icon: SiOpenai, color: '#10A37F' },
    'AI API Integration': { Icon: TbApi, color: '#10A37F' },
    'Godot': { Icon: SiGodotengine, color: '#478CBF' },
    'GDScript': { Icon: BsBraces, color: '#478CBF' },
    '2D Game Development': { Icon: FaGamepad, color: '#43A047' },
}

function SkillChip({ name, isMobile }) {
    const [hovered, setHovered] = useState(false)
    const meta = skillMeta[name] || { Icon: BsBraces, color: '#555' }
    const { Icon, color } = meta
    const iconBoxSize = isMobile ? '40px' : '52px'
    const iconSize = isMobile ? 22 : 32
    const chipPadding = isMobile ? '0.75rem 0.4rem 0.65rem' : '1rem 0.5rem 0.85rem'

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: isMobile ? '0.35rem' : '0.5rem',
                padding: chipPadding, borderRadius: 'var(--radius-sm)',
                border: `1px solid ${hovered ? color : 'var(--card-border)'}`,
                background: hovered ? color : 'var(--card-bg)',
                transition: 'all 0.22s ease',
                transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: hovered ? `0 6px 20px ${color}40` : 'none',
                cursor: 'default', minWidth: 0,
            }}
        >
            <div style={{
                width: iconBoxSize, height: iconBoxSize, borderRadius: 'var(--radius-sm)',
                background: hovered ? 'rgba(255,255,255,0.25)' : 'rgba(26,26,26,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.22s ease', flexShrink: 0,
            }}>
                <Icon size={iconSize} style={{ color: hovered ? '#ffffff' : '#999', transition: 'color 0.22s ease' }} />
            </div>
            <span style={{
                fontSize: isMobile ? '0.58rem' : '0.65rem', fontWeight: 600,
                textAlign: 'center', lineHeight: 1.3,
                color: hovered ? 'rgba(255,255,255,0.9)' : 'var(--ink-muted)',
                transition: 'color 0.22s ease', letterSpacing: '0.01em',
                wordBreak: 'break-word', hyphens: 'auto',
            }}>
                {name}
            </span>
        </div>
    )
}

function getGridCols(itemCount, isMobile, isTablet) {
    if (isMobile) return `repeat(${Math.min(itemCount, 4)}, 1fr)`
    if (isTablet) return `repeat(${Math.min(itemCount, 5)}, 1fr)`
    return `repeat(${Math.min(itemCount, 8)}, 1fr)`
}

function SkillsPage() {
    const navigate = useNavigate()
    const { isMobile, isTablet, isDesktop } = useBreakpoint()
    const ready = usePageReady()

    const pagePadding = isMobile
        ? '1.25rem 0.875rem 3rem'
        : isTablet ? '1.5rem 1rem 3.5rem'
            : '2rem 1.25rem 4rem'

    const headerPadding = isMobile ? '1.25rem' : isTablet ? '1.5rem' : '1.75rem 2rem'
    const cardPadding = isMobile ? '1rem 1rem' : isTablet ? '1.2rem 1.25rem' : '1.4rem 1.5rem'

    return (
        <div style={{
            maxWidth: '900px', margin: '0 auto',
            padding: pagePadding, boxSizing: 'border-box', width: '100%',
        }}>
            {/* Back nav */}
            <button
                onClick={() => navigate('/')}
                className={ready ? 'anim-fade' : ''}
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    marginBottom: '1.25rem', background: 'none', border: 'none',
                    cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500,
                    color: 'var(--ink-muted)', padding: 0, fontFamily: 'inherit',
                    transition: 'color 0.15s', WebkitTapHighlightColor: 'transparent',
                    opacity: ready ? undefined : 0,
                    animationDelay: '0ms',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-muted)'}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Back to Portfolio
            </button>

            {/* Page header card */}
            <div
                className={ready ? 'anim-up' : ''}
                style={{
                    background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                    borderRadius: 'var(--radius)', padding: headerPadding, marginBottom: '1rem',
                    opacity: ready ? undefined : 0,
                    animationDelay: '80ms',
                }}
            >
                <h1 style={{
                    fontSize: isMobile ? '1.35rem' : '1.75rem', fontWeight: 700,
                    letterSpacing: '-0.3px', color: 'var(--ink)', marginBottom: '0.5rem',
                }}>
                    Tools I Work With
                </h1>
                <p style={{
                    fontSize: isMobile ? '0.8rem' : '0.88rem', color: 'var(--ink-muted)',
                    lineHeight: 1.65, maxWidth: '560px', margin: 0,
                }}>
                    A complete overview of the technologies, frameworks, and tools I use across
                    frontend, backend, design, and beyond.
                </p>
            </div>

            {/* Category sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {fullStack.map((cat, index) => (
                    <div
                        key={cat.category}
                        className={ready ? 'anim-up' : ''}
                        style={{
                            background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                            borderRadius: 'var(--radius)', padding: cardPadding,
                            opacity: ready ? undefined : 0,
                            animationDelay: `${160 + index * 80}ms`,
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <span style={{
                                fontSize: '0.75rem', color: 'var(--ink-faint)',
                                fontFamily: 'monospace', lineHeight: 1, flexShrink: 0,
                            }}>
                                {cat.icon}
                            </span>
                            <p style={{
                                fontSize: '0.71rem', fontWeight: 700, textTransform: 'uppercase',
                                letterSpacing: '0.1em', color: 'var(--ink-muted)', margin: 0,
                            }}>
                                {cat.category}
                            </p>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: getGridCols(cat.items.length, isMobile, isTablet),
                            gap: isMobile ? '0.375rem' : '0.5rem',
                        }}>
                            {cat.items.map(item => (
                                <SkillChip key={item} name={item} isMobile={isMobile} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <p style={{
                textAlign: 'center', marginTop: '2.5rem',
                fontSize: '0.75rem', color: 'var(--ink-faint)',
            }}>
                © 2026 Alfred Miguel De Leon · Pasay City, Philippines
            </p>
        </div>
    )
}

export default SkillsPage