// src/pages/casestudies/FeelBrightCaseStudy.jsx
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePageReady } from '../../hooks/usePageReady'
import {
    FiTarget, FiZap, FiHome, FiLogIn, FiActivity,
    FiAward, FiGrid, FiSettings, FiDatabase, FiTrendingUp,
    FiCheckCircle, FiBook, FiUsers, FiAlertCircle, FiEye,
    FiMail, FiShield, FiMessageCircle, FiUser, FiHeart,
    FiBarChart2, FiPieChart, FiDownload, FiFileText, FiClock,
    FiArrowLeft, FiArrowRight, FiGlobe, FiX, FiChevronUp, FiChevronDown,
} from 'react-icons/fi'

// ─── RESPONSIVE HOOK ──────────────────────────────────────────────────────────
function useWindowWidth() {
    const [width, setWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    )
    useEffect(() => {
        const handle = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handle)
        return () => window.removeEventListener('resize', handle)
    }, [])
    return width
}

// ─── COLOR PALETTE ───────────────────────────────────────────────────────────
const PALETTE = [
    { base: '#CCFBF1', deep: '#99F6E4', icon: '#0D9488' }, // 0 teal
    { base: '#FEF3C7', deep: '#FDE68A', icon: '#D97706' }, // 1 amber
    { base: '#FFE4E6', deep: '#FECDD3', icon: '#E11D48' }, // 2 rose
    { base: '#CFFAFE', deep: '#A5F3FC', icon: '#0891B2' }, // 3 cyan
    { base: '#D1FAE5', deep: '#A7F3D0', icon: '#059669' }, // 4 emerald
    { base: '#EDE9FE', deep: '#DDD6FE', icon: '#7C3AED' }, // 5 violet
    { base: '#ECFCCB', deep: '#D9F99D', icon: '#65A30D' }, // 6 lime
    { base: '#FFEDD5', deep: '#FED7AA', icon: '#EA580C' }, // 7 orange
    { base: '#E0E7FF', deep: '#C7D2FE', icon: '#4338CA' }, // 8 indigo
    { base: '#FCE7F3', deep: '#FBCFE8', icon: '#DB2777' }, // 9 pink
]

function cardColor(sectionIdx, cardIdx) {
    return PALETTE[(sectionIdx * 4 + cardIdx * 7) % PALETTE.length]
}

// ─── SCROLL-REVEAL FACTORY ────────────────────────────────────────────────────
// Same pattern as App.jsx — fades + slides up as section enters viewport
const reveal = (direction = 'up', delay = 0) => ({
    initial: {
        opacity: 0,
        x: direction === 'left' ? -32 : direction === 'right' ? 32 : 0,
        y: direction === 'up' ? 24 : 0,
    },
    whileInView: { opacity: 1, x: 0, y: 0 },
    transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: delay / 1000,
    },
    viewport: { once: true, amount: 0.15 },
})

// ─── PILL STYLE ──────────────────────────────────────────────────────────────
const pill = {
    display: 'inline-block',
    padding: '0.18rem 0.65rem',
    borderRadius: '100px',
    fontSize: '0.68rem',
    fontWeight: 600,
    background: 'rgba(26,26,26,0.06)',
    color: 'var(--ink-muted)',
    marginRight: '0.3rem',
    marginBottom: '0.3rem',
}

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose }) {
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.88)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 9999, cursor: 'zoom-out',
                animation: 'fadeIn 0.2s ease',
            }}
        >
            <img
                src={src} alt={alt}
                onClick={e => e.stopPropagation()}
                style={{
                    maxWidth: '92vw', maxHeight: '90vh',
                    objectFit: 'contain', borderRadius: '12px',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                    cursor: 'default',
                }}
            />
            <button
                onClick={onClose}
                style={{
                    position: 'absolute', top: '20px', right: '20px',
                    background: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff', borderRadius: '50%',
                    width: '38px', height: '38px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', padding: 0,
                }}
            >
                <FiX size={16} />
            </button>
        </div>
    )
}

// ─── IMAGE CAROUSEL ──────────────────────────────────────────────────────────
function ImageCarousel({ images, height = '220px', sectionColor, onOpen }) {
    const [idx, setIdx] = useState(0)
    const [visible, setVis] = useState(true)
    const [errors, setErrors] = useState({})
    const width = useWindowWidth()
    const isMobile = width < 640

    const goTo = useCallback((next) => {
        setVis(false)
        setTimeout(() => { setIdx(next); setVis(true) }, 280)
    }, [])

    useEffect(() => {
        if (images.length <= 1) return
        const t = setInterval(() => {
            goTo((idx + 1) % images.length)
        }, 4000)
        return () => clearInterval(t)
    }, [idx, images.length, goTo])

    const cur = images[idx]
    const hasError = errors[cur?.src]
    const c = sectionColor
    // Reduce carousel height on mobile
    const displayHeight = isMobile ? '240px' : height

    return (
        <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', background: c.base }}>
            <div
                onClick={() => !hasError && onOpen && onOpen(cur)}
                style={{
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.28s ease',
                    cursor: hasError ? 'default' : 'zoom-in',
                    height: displayHeight,
                }}
            >
                {hasError ? (
                    <div style={{
                        width: '100%', height: '100%',
                        background: c.base,
                        border: `1.5px dashed ${c.deep}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: c.icon, fontSize: '0.72rem', fontWeight: 600,
                    }}>
                        {cur.alt}
                    </div>
                ) : (
                    <img
                        key={cur.src} src={cur.src} alt={cur.alt} loading="lazy"
                        onError={() => setErrors(p => ({ ...p, [cur.src]: true }))}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                )}
            </div>

            {images.length > 1 && (
                <div style={{
                    position: 'absolute', bottom: '10px', left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex', gap: '5px', pointerEvents: 'none',
                }}>
                    {images.map((_, i) => (
                        <div
                            key={i}
                            style={{
                                width: i === idx ? '18px' : '6px',
                                height: '6px',
                                borderRadius: '3px',
                                background: i === idx ? c.icon : `${c.icon}66`,
                                transition: 'all 0.3s ease',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── SUB-CARD ────────────────────────────────────────────────────────────────
function SubCard({ color, Icon, title, description }) {
    const [hov, setHov] = useState(false)

    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                position: 'relative',
                borderRadius: '18px',
                padding: '1.25rem',
                display: 'flex', flexDirection: 'column', gap: '0.7rem',
                overflow: 'hidden', cursor: 'default',
                backgroundColor: hov ? color.deep : color.base,
                transition: 'background-color 0.3s ease',
            }}
        >
            <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '80px', height: '80px', borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.04)', pointerEvents: 'none',
            }} />

            <div style={{
                width: '42px', height: '42px', borderRadius: '11px',
                backgroundColor: hov ? color.base : '#FFFFFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)', flexShrink: 0,
                transition: 'background-color 0.3s ease',
            }}>
                <Icon size={18} color={hov ? color.icon : '#94A3B8'} />
            </div>

            <div>
                <h3 style={{
                    fontSize: '0.87rem', fontWeight: 700, color: '#0F172A',
                    marginBottom: '0.28rem', lineHeight: 1.3,
                }}>{title}</h3>
                <p style={{ fontSize: '0.76rem', lineHeight: 1.65, color: '#64748B' }}>
                    {description}
                </p>
            </div>
        </div>
    )
}

// ─── SECTION CARD ────────────────────────────────────────────────────────────
function SectionCard({ id, num, sectionColor, Icon, title, children }) {
    const c = sectionColor
    return (
        <div id={id} style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius)',
            padding: '1.5rem',
            marginBottom: '1rem',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.1rem' }}>
                <span style={{
                    fontSize: '0.58rem', fontWeight: 700, color: c.icon,
                    background: c.base, borderRadius: '5px', padding: '2px 7px',
                    letterSpacing: '0.05em', flexShrink: 0,
                }}>
                    {String(num).padStart(2, '0')}
                </span>
                <p style={{
                    fontSize: '0.95rem', fontWeight: 700,
                    color: 'var(--ink)', letterSpacing: '-0.01em',
                }}>{title}</p>
            </div>
            {children}
        </div>
    )
}

// ─── COLLAPSIBLE SIDEBAR CARD ─────────────────────────────────────────────────
function CollapsibleSidebarCard({ title, children, defaultOpen = true }) {
    const [open, setOpen] = useState(defaultOpen)

    return (
        <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius)',
            marginBottom: '0.75rem',
            overflow: 'hidden',
        }}>
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.75rem 1.1rem 0.55rem',
            }}>
                <p style={{
                    fontSize: '0.63rem', textTransform: 'uppercase', letterSpacing: '0.13em',
                    color: 'var(--ink-faint)', fontWeight: 700, margin: 0,
                }}>{title}</p>
            </div>

            <div style={{
                maxHeight: open ? '1000px' : '0px',
                opacity: open ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.35s ease, opacity 0.25s ease',
            }}>
                <div style={{ padding: '0 1.1rem 0.5rem' }}>
                    {children}
                </div>
            </div>

            <div style={{
                display: 'flex', justifyContent: 'center',
                padding: open ? '0 0 0.6rem' : '0 0 0.55rem',
                borderTop: open ? '1px solid var(--card-border)' : 'none',
                marginTop: open ? '0.25rem' : 0,
            }}>
                <button
                    onClick={() => setOpen(o => !o)}
                    title={open ? 'Minimize' : 'Expand'}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.3rem',
                        background: 'none', border: '1px solid var(--card-border)',
                        borderRadius: '100px', padding: '0.2rem 0.7rem',
                        cursor: 'pointer', fontSize: '0.62rem', fontWeight: 600,
                        color: 'var(--ink-faint)', fontFamily: 'inherit',
                        transition: 'color 0.15s, border-color 0.15s, background 0.15s',
                        marginTop: open ? '0' : '0.4rem',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--ink)'
                        e.currentTarget.style.background = 'rgba(26,26,26,0.04)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--ink-faint)'
                        e.currentTarget.style.background = 'none'
                    }}
                >
                    {open
                        ? <><FiChevronUp size={11} /> Minimize</>
                        : <><FiChevronDown size={11} /> Expand</>
                    }
                </button>
            </div>
        </div>
    )
}

// ─── SIDEBAR CARD ─────────────────────────────────────────────────────────────
function SidebarCard({ children, style = {} }) {
    return (
        <div style={{
            background: 'var(--card-bg)', border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius)', padding: '1.1rem',
            marginBottom: '0.75rem', ...style,
        }}>{children}</div>
    )
}

function SidebarLabel({ children, style = {} }) {
    return (
        <p style={{
            fontSize: '0.63rem', textTransform: 'uppercase', letterSpacing: '0.13em',
            color: 'var(--ink-faint)', fontWeight: 700, marginBottom: '0.65rem',
            ...style,
        }}>{children}</p>
    )
}

function MetaRow({ label, value, valueStyle = {}, last = false }) {
    return (
        <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            padding: '0.32rem 0',
            borderBottom: last ? 'none' : '1px solid var(--card-border)', gap: '0.5rem',
        }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--ink-faint)' }}>{label}</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--ink)', textAlign: 'right', ...valueStyle }}>
                {value}
            </span>
        </div>
    )
}

// ─── CLICKABLE IMAGE TILE ─────────────────────────────────────────────────────
function ImgTile({ src, alt, height, radius = '12px', sectionColor, onOpen }) {
    const [err, setErr] = useState(false)
    const c = sectionColor || PALETTE[0]

    if (err) {
        return (
            <div style={{
                height, borderRadius: radius,
                background: c.base, border: `1.5px dashed ${c.deep}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: c.icon, fontSize: '0.68rem', fontWeight: 600,
            }}>{alt}</div>
        )
    }

    return (
        <div
            onClick={() => onOpen && onOpen({ src, alt })}
            style={{
                height, borderRadius: radius, overflow: 'hidden',
                cursor: 'zoom-in', flexShrink: 0,
                border: '1px solid rgba(26,26,26,0.08)',
            }}
        >
            <img src={src} alt={alt} loading="lazy" onError={() => setErr(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
        </div>
    )
}

// ─── DB TABLE ────────────────────────────────────────────────────────────────
function DbTable({ sectionColor }) {
    const c = sectionColor
    const width = useWindowWidth()
    const isMobile = width < 640

    const rows = [
        { table: 'users', stores: 'Account data', desc: 'Every registered user\'s name, email, profile photo, and timestamps.' },
        { table: 'assessments', stores: 'Test structure', desc: 'The EQ assessment blueprint — five domains, descriptions, and question count.' },
        { table: 'results', stores: 'Score records', desc: 'Each completed assessment\'s overall EI score, per-domain scores, and generated feedback text.' },
        { table: 'resources', stores: 'Content library', desc: 'All articles, wellness exercises, and guides available to users in the dashboard.' },
        { table: 'sessions', stores: 'Activity log', desc: 'A record of every assessment session — start time, completion time, and status.' },
    ]

    if (isMobile) {
        // On mobile, render as stacked cards instead of a table
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {rows.map((row) => (
                    <div key={row.table} style={{
                        borderRadius: '10px',
                        border: '1px solid var(--card-border)',
                        padding: '0.85rem 1rem',
                        background: 'var(--card-bg)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                            <span style={{
                                fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 700,
                                color: c.icon, background: c.base,
                                padding: '2px 8px', borderRadius: '5px',
                                display: 'inline-block', whiteSpace: 'nowrap',
                            }}>{row.table}</span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--ink)', fontWeight: 600 }}>{row.stores}</span>
                        </div>
                        <p style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', lineHeight: 1.65, margin: 0 }}>{row.desc}</p>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div style={{
            borderRadius: '12px', overflow: 'hidden',
            border: '1px solid var(--card-border)',
        }}>
            <div style={{
                display: 'grid', gridTemplateColumns: '110px 130px 1fr',
                background: c.base, padding: '0.65rem 1rem', gap: '0.75rem',
            }}>
                {['Table', 'Stores', 'Description'].map(h => (
                    <span key={h} style={{
                        fontSize: '0.63rem', fontWeight: 700,
                        color: c.icon, textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>{h}</span>
                ))}
            </div>
            {rows.map((row, i) => (
                <div key={row.table} style={{
                    display: 'grid', gridTemplateColumns: '110px 130px 1fr',
                    padding: '0.7rem 1rem', gap: '0.75rem', alignItems: 'start',
                    background: i % 2 === 0 ? 'var(--card-bg)' : 'rgba(26,26,26,0.015)',
                    borderTop: '1px solid var(--card-border)',
                }}>
                    <span style={{
                        fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 700,
                        color: c.icon, background: c.base,
                        padding: '2px 8px', borderRadius: '5px',
                        display: 'inline-block', whiteSpace: 'nowrap',
                    }}>{row.table}</span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--ink)', fontWeight: 600 }}>{row.stores}</span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--ink-muted)', lineHeight: 1.65 }}>{row.desc}</span>
                </div>
            ))}
        </div>
    )
}

// ─── SECTION TEXT ─────────────────────────────────────────────────────────────
function SText({ children }) {
    return (
        <p style={{
            fontSize: '0.82rem', color: 'var(--ink-muted)',
            lineHeight: 1.8, marginBottom: '1rem',
        }}>
            {children}
        </p>
    )
}

// ─── MOBILE SIDEBAR DRAWER ────────────────────────────────────────────────────
function MobileSidebarDrawer({ tocItems, scrollTo, open, onClose }) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [open])

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    background: 'rgba(0,0,0,0.45)',
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? 'all' : 'none',
                    transition: 'opacity 0.3s ease',
                }}
            />
            {/* Drawer panel */}
            <div style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 1001,
                width: '280px', maxWidth: '85vw',
                background: 'var(--card-bg)',
                borderLeft: '1px solid var(--card-border)',
                transform: open ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s ease',
                overflowY: 'auto',
                padding: '1.25rem',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink)' }}>Navigation</span>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(26,26,26,0.06)', border: '1px solid var(--card-border)',
                            borderRadius: '8px', width: '30px', height: '30px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'var(--ink-muted)',
                        }}
                    >
                        <FiX size={14} />
                    </button>
                </div>

                {/* Project meta */}
                <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-faint)', fontWeight: 700, marginBottom: '0.5rem' }}>Project Overview</p>
                    <MetaRow label="Role" value="Full Stack Developer" />
                    <MetaRow label="Platform" value="Web Application" />
                    <MetaRow label="Institution" value="Arellano University" />
                    <MetaRow label="Timeline" value="May – Oct 2025" last />
                </div>

                {/* Tech stack */}
                <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-faint)', fontWeight: 700, marginBottom: '0.5rem' }}>Tech Stack</p>
                    {['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'Git'].map(t => (
                        <span key={t} style={pill}>{t}</span>
                    ))}
                </div>

                {/* TOC */}
                <div>
                    <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-faint)', fontWeight: 700, marginBottom: '0.5rem' }}>Contents</p>
                    {tocItems.map((item, i) => {
                        const c = PALETTE[item.sIdx]
                        return (
                            <div
                                key={item.id}
                                onClick={() => { scrollTo(item.id); onClose() }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.42rem 0.4rem', borderRadius: '6px',
                                    borderBottom: i < tocItems.length - 1 ? '1px solid var(--card-border)' : 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <span style={{ fontSize: '0.6rem', color: 'var(--ink-faint)', minWidth: '18px', fontWeight: 700 }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>{item.label}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

// ─── SIDEBAR (desktop) ────────────────────────────────────────────────────────
function Sidebar({ tocItems, scrollTo }) {
    const [overviewOpen, setOverviewOpen] = useState(true)
    const [stackOpen, setStackOpen] = useState(true)
    const [contentsOpen, setContentsOpen] = useState(true)

    const ChevronBtn = ({ open, onToggle }) => (
        <div
            onClick={onToggle}
            style={{
                width: '22px', height: '22px', borderRadius: '6px',
                border: '1px solid var(--card-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: open ? '#64748B' : '#94A3B8',
                flexShrink: 0, cursor: 'pointer',
                background: 'rgba(26,26,26,0.04)',
                transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--card-border-hover)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--card-border)' }}
        >
            <FiChevronDown
                size={13}
                style={{
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                }}
            />
        </div>
    )

    return (
        <div style={{ position: 'sticky', top: '2rem', alignSelf: 'start' }}>

            {/* Project Overview */}
            <SidebarCard>
                <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: overviewOpen ? '0.65rem' : '0',
                    transition: 'margin 0.3s ease',
                }}>
                    <SidebarLabel style={{ marginBottom: 0 }}>Project Overview</SidebarLabel>
                    <ChevronBtn open={overviewOpen} onToggle={() => setOverviewOpen(!overviewOpen)} />
                </div>
                <div style={{
                    overflow: 'hidden',
                    maxHeight: overviewOpen ? '500px' : '0px',
                    opacity: overviewOpen ? 1 : 0,
                    transition: 'max-height 0.35s ease, opacity 0.25s ease',
                }}>
                    <MetaRow label="Role" value="Full Stack Developer" />
                    <MetaRow label="Platform" value="Web Application" />
                    <MetaRow label="Institution" value="Arellano University" />
                    <MetaRow label="Timeline" value="May – Oct 2025" last />

                    <div style={{
                        paddingTop: '0.32rem',
                        borderTop: '1px solid var(--card-border)',
                        marginTop: '0.1rem',
                    }}>
                        <span style={{
                            fontSize: '0.70rem', color: 'var(--ink-faint)',
                            display: 'block', marginBottom: '0.5rem', marginTop: '0.5rem', fontStyle: 'italic',
                        }}>
                            Developed in collaboration with
                        </span>
                        <span style={{
                            fontSize: '0.72rem', fontWeight: 600,
                            color: 'var(--ink)', lineHeight: 1.6, display: 'block',
                        }}>
                            Edznahar Pineda Junaz
                        </span>
                        <span style={{
                            fontSize: '0.72rem', fontWeight: 600,
                            color: 'var(--ink)', lineHeight: 1.6, display: 'block',
                        }}>
                            Benigno Rodrigo O. Mandras
                        </span>
                    </div>
                </div>
            </SidebarCard>

            {/* Tech Stack */}
            <SidebarCard>
                <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: stackOpen ? '0.65rem' : '0',
                    transition: 'margin 0.3s ease',
                }}>
                    <SidebarLabel style={{ marginBottom: 0 }}>Tech Stack</SidebarLabel>
                    <ChevronBtn open={stackOpen} onToggle={() => setStackOpen(!stackOpen)} />
                </div>
                <div style={{
                    overflow: 'hidden',
                    maxHeight: stackOpen ? '500px' : '0px',
                    opacity: stackOpen ? 1 : 0,
                    transition: 'max-height 0.35s ease, opacity 0.25s ease',
                }}>
                    {['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'Git'].map(t => (
                        <span key={t} style={pill}>{t}</span>
                    ))}
                </div>
            </SidebarCard>

            {/* Contents */}
            <SidebarCard style={{ marginBottom: 0 }}>
                <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: contentsOpen ? '0.65rem' : '0',
                    transition: 'margin 0.3s ease',
                }}>
                    <SidebarLabel style={{ marginBottom: 0 }}>Contents</SidebarLabel>
                    <ChevronBtn open={contentsOpen} onToggle={() => setContentsOpen(!contentsOpen)} />
                </div>
                <div style={{
                    overflow: 'hidden',
                    maxHeight: contentsOpen ? '1000px' : '0px',
                    opacity: contentsOpen ? 1 : 0,
                    transition: 'max-height 0.35s ease, opacity 0.25s ease',
                }}>
                    {tocItems.map((item, i) => {
                        return (
                            <div
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.32rem 0.3rem', borderRadius: '6px',
                                    border: '1px solid transparent',
                                    borderBottom: i < tocItems.length - 1 ? '1px solid var(--card-border)' : '1px solid transparent',
                                    cursor: 'pointer', transition: 'border-color 0.15s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--card-border-hover)' }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'transparent'
                                    e.currentTarget.style.borderBottomColor = i < tocItems.length - 1 ? 'var(--card-border)' : 'transparent'
                                }}
                            >
                                <span style={{ fontSize: '0.6rem', color: 'var(--ink-faint)', minWidth: '18px', fontWeight: 700 }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span style={{ fontSize: '0.73rem', color: 'var(--ink-muted)' }}>{item.label}</span>
                            </div>
                        )
                    })}
                </div>
            </SidebarCard>

        </div>
    )
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
function FeelBrightCaseStudy() {
    const navigate = useNavigate()
    const [lightbox, setLightbox] = useState(null)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const width = useWindowWidth()
    const isMobile = width < 768
    const isTablet = width >= 768 && width < 1024

    const scrollTo = (id) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    // Fires at 650ms — just after the page-transition LoadingScreen exits
    const ready = usePageReady()

    const i = (name) => new URL(`../../assets/${name}.jpg`, import.meta.url).href

    const imgs = {
        s03: [
            { src: i('3-landing-a'), alt: 'Landing page hero' },
            { src: i('3-landing-b'), alt: 'Resource preview' },
            { src: i('3-landing-c'), alt: 'CTA section' },
        ],
        s04: [
            { src: i('4-auth-a'), alt: 'Registration screen' },
            { src: i('4-auth-b'), alt: 'Email verification' },
            { src: i('4-auth-c'), alt: 'Welcome modal' },
        ],
        s05: [
            { src: i('5-assessment-a'), alt: 'Assessment progress bar' },
            { src: i('5-assessment-b'), alt: 'Domain question view' },
            { src: i('5-assessment-c'), alt: 'Mid-assessment state' },
        ],
        s06: [
            { src: i('6-results-a'), alt: 'EI score circle' },
            { src: i('6-results-b'), alt: 'Domain breakdown' },
            { src: i('6-results-c'), alt: 'Download panel' },
        ],
        s07: [
            { src: i('7-dashboard-a'), alt: 'Dashboard overview' },
            { src: i('7-dashboard-b'), alt: 'Wellness exercises' },
            { src: i('7-dashboard-c'), alt: 'Progress chart' },
        ],
        s08: [
            { src: i('8-admin-a'), alt: 'Admin analytics' },
            { src: i('8-admin-b'), alt: 'Content management' },
            { src: i('8-admin-c'), alt: 'User management' },
        ],
        s09: [
            { src: i('9-arch-a'), alt: 'System architecture' },
            { src: i('9-arch-b'), alt: 'Database diagram' },
        ],
    }

    const heroSrc = new URL('../../assets/feelbright.jpg', import.meta.url).href
    const headerSmall = [
        { src: new URL('../../assets/admin.jpg', import.meta.url).href, alt: 'Admin portal' },
        { src: new URL('../../assets/EQ.jpg', import.meta.url).href, alt: 'EQ Assessment' },
        { src: new URL('../../assets/user.jpg', import.meta.url).href, alt: 'User dashboard' },
        { src: new URL('../../assets/results.jpg', import.meta.url).href, alt: 'Results page' },
    ]

    const tocItems = [
        { id: 's01', label: 'Overview', sIdx: 0 },
        { id: 's02', label: 'Problem & Solution', sIdx: 1 },
        { id: 's03', label: 'Landing Page', sIdx: 2 },
        { id: 's04', label: 'Auth & Onboarding', sIdx: 3 },
        { id: 's05', label: 'EQ Assessment', sIdx: 4 },
        { id: 's06', label: 'Results & Feedback', sIdx: 5 },
        { id: 's07', label: 'User Dashboard', sIdx: 6 },
        { id: 's08', label: 'Admin Portal', sIdx: 7 },
        { id: 's09', label: 'Database Architecture', sIdx: 8 },
        { id: 's10', label: 'Reflections & Next', sIdx: 9 },
    ]

    // Responsive hero title size
    const heroTitleSize = isMobile ? '1.85rem' : isTablet ? '2.2rem' : '2.6rem'

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: isMobile ? '1.25rem 1rem 4rem' : '2rem 1.25rem 5rem' }}>

            {lightbox && (
                <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
            )}

            {/* Mobile sidebar drawer */}
            {isMobile && (
                <MobileSidebarDrawer
                    tocItems={tocItems}
                    scrollTo={scrollTo}
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                />
            )}

            {/* ── Top bar: Back + mobile TOC button ── */}
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                }}
            >
                <button
                    onClick={() => navigate('/projects')}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        background: 'none', border: 'none',
                        cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500,
                        color: 'var(--ink-muted)', padding: 0, fontFamily: 'inherit',
                        transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-muted)')}
                >
                    <FiArrowLeft size={14} /> Back to Projects
                </button>

                {/* Mobile nav trigger — only visible on mobile */}
                {isMobile && (
                    <button
                        onClick={() => setDrawerOpen(true)}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                            background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                            borderRadius: '8px', padding: '0.35rem 0.75rem',
                            cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600,
                            color: 'var(--ink-muted)', fontFamily: 'inherit',
                        }}
                    >
                        <FiGrid size={13} /> Contents
                    </button>
                )}
            </motion.div>

            {/* ── Hero card ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                style={{
                    background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                    borderRadius: 'var(--radius)', padding: isMobile ? '1.1rem' : '1.5rem',
                    marginBottom: '1.25rem',
                }}
            >
                <p style={{
                    fontSize: '0.63rem', textTransform: 'uppercase', letterSpacing: '0.13em',
                    color: 'var(--ink-faint)', fontWeight: 600, marginBottom: '0.5rem',
                }}>
                    Case Study · Capstone Project · October 2025
                </p>
                <h1 style={{
                    fontSize: heroTitleSize, fontWeight: 800, letterSpacing: '-1px',
                    color: 'var(--ink)', marginBottom: '0.25rem', lineHeight: 1.1,
                }}>FeelBright</h1>
                <p style={{
                    fontSize: isMobile ? '1rem' : '1.25rem',
                    color: 'var(--ink)', marginBottom: '1.1rem', fontWeight: 500,
                }}>
                    A Web-Based Emotional Intelligence Assessment and Improvement System
                </p>

                <ImgTile
                    src={heroSrc} alt="FeelBright platform overview"
                    height={isMobile ? '220px' : '480px'}
                    sectionColor={PALETTE[0]}
                    onOpen={setLightbox}
                />

                {/* Thumbnail strip: 4-col on desktop, 2-col on mobile */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: '0.5rem',
                    margin: '0.6rem 0 1.1rem',
                }}>
                    {headerSmall.map((img) => (
                        <ImgTile
                            key={img.src}
                            src={img.src} alt={img.alt}
                            height={isMobile ? '80px' : '100px'}
                            radius="10px"
                            sectionColor={PALETTE[0]}
                            onOpen={setLightbox}
                        />
                    ))}
                </div>
            </motion.div>

            {/* ── Two-column layout (single column on mobile) ── */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 220px' : '1fr 260px',
                gap: '1rem',
                alignItems: 'start',
            }}>

                {/* ════ MAIN CONTENT ════ */}
                <div>

                    {/* 01 Overview */}
                    <motion.div {...reveal('up')}>
                        <SectionCard id="s01" num={1} sectionColor={PALETTE[0]} Icon={FiTarget} title="Overview">
                            <SText>
                                FeelBright is a free, web-based Emotional Intelligence Assessment and
                                Self-Learning Platform developed by IT students from Arellano University –
                                Jose Abad Santos Campus. Rooted in Human-Computer Interaction and Web
                                Application Development, it integrates psychology and technology to help
                                students evaluate their emotional skills, gain insights into their strengths
                                and weaknesses, and participate in self-guided learning activities. The system
                                also serves as a monitoring tool for the Psychology Department, supporting
                                their educational and outreach goals under{' '}
                                <strong style={{ color: 'var(--ink)', fontWeight: 700 }}>Project HR</strong>.
                            </SText>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                                <SubCard color={cardColor(0, 0)} Icon={FiGlobe} title="Free & Accessible"
                                    description="FeelBright is available at no cost to any student with a browser. It was built specifically to address the lack of accessible, research-driven EQ tools in educational settings — where most existing alternatives are costly or designed for clinical use." />
                                <SubCard color={cardColor(0, 1)} Icon={FiBook} title="Research-Backed Assessment"
                                    description="The EQ assessment is grounded in Daniel Goleman's five-domain Emotional Intelligence model — covering self-awareness, self-regulation, motivation, empathy, and social skills — and was reviewed and validated by a licensed Psychometrician." />
                                <SubCard color={cardColor(0, 2)} Icon={FiUsers} title="Built for Students & Faculty"
                                    description="Designed in direct collaboration with Arellano University's Psychology Department, the system serves a dual purpose — a self-learning tool for students and a monitoring instrument for faculty managing Project HR outcomes." />
                            </div>
                        </SectionCard>
                    </motion.div>

                    {/* 02 Problem & Solution */}
                    <motion.div {...reveal('up')}>
                        <SectionCard id="s02" num={2} sectionColor={PALETTE[1]} Icon={FiZap} title="Problem & Solution">
                            <SText>
                                The Psychology Department of Arellano University – Jose Abad Santos Campus
                                currently provides I.Q. testing but lacks an equivalent tool for Emotional Quotient
                                assessment. This gap limits their ability to fully evaluate and monitor students'
                                emotional growth — particularly within{' '}
                                <strong style={{ color: 'var(--ink)', fontWeight: 700 }}>Project HR: From Hiring to
                                    Healing</strong>, an outreach program where measuring emotional development is
                                central to its goals. Existing tools are either costly, clinically oriented, or not
                                designed for continuous personal development in an academic setting.
                            </SText>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                gap: '0.7rem',
                            }}>
                                <SubCard color={cardColor(1, 0)} Icon={FiAlertCircle} title="The Problem"
                                    description="No EQ assessment tool existed at the institution. Without it, Project HR had no way to measure emotional growth, track participant progress, or evaluate outcomes — making the program's impact difficult to demonstrate." />
                                <SubCard color={cardColor(1, 1)} Icon={FiCheckCircle} title="The Solution"
                                    description="FeelBright was developed in direct response — a free, research-backed platform combining a validated EQ self-assessment, personalized feedback, wellness exercises, progress tracking, and a faculty-facing admin panel." />
                            </div>
                        </SectionCard>
                    </motion.div>

                    {/* 03 Landing Page */}
                    <motion.div {...reveal('up')}>
                        <SectionCard id="s03" num={3} sectionColor={PALETTE[2]} Icon={FiHome} title="Public Landing Page">
                            <SText>
                                The public landing page is the first point of contact for any visitor before
                                creating an account. It introduces FeelBright's purpose, previews the
                                available resource library, and presents clear paths for registration and
                                exploration — designed to communicate the platform's value without relying
                                on technical language or requiring any commitment upfront.
                            </SText>
                            <ImageCarousel images={imgs.s03} height="450px" sectionColor={PALETTE[2]} onOpen={setLightbox} />
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                                gap: '0.7rem', marginTop: '0.85rem',
                            }}>
                                <SubCard color={cardColor(2, 0)} Icon={FiEye} title="First Impressions"
                                    description="A clean hero section immediately communicates what FeelBright is and who it's for — students and young adults looking to understand and improve their emotional intelligence." />
                                <SubCard color={cardColor(2, 1)} Icon={FiBook} title="Resource Preview"
                                    description="Visitors can browse available articles, wellness guides, and educational materials before signing up — reducing hesitation and showing the platform's value from the very first visit." />
                                <SubCard color={cardColor(2, 2)} Icon={FiLogIn} title="Clear Entry Points"
                                    description="Sign Up and Explore call-to-actions are prominently placed throughout the page, guiding first-time visitors into the platform naturally and without confusion." />
                            </div>
                        </SectionCard>
                    </motion.div>

                    {/* 04 Auth & Onboarding */}
                    <motion.div {...reveal('up')}>
                        <SectionCard id="s04" num={4} sectionColor={PALETTE[3]} Icon={FiLogIn} title="Authentication & Onboarding">
                            <SText>
                                Account creation is kept intentionally straightforward. Users register with
                                their name, email, and password, then confirm access via an emailed
                                verification link. First-time users are guided through a welcome modal on
                                their initial login — reducing the learning curve and orienting them to the
                                platform from the very first session.
                            </SText>
                            <ImageCarousel images={imgs.s04} height="450px" sectionColor={PALETTE[3]} onOpen={setLightbox} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.85rem' }}>
                                <SubCard color={cardColor(3, 0)} Icon={FiMail} title="Simple Registration"
                                    description="Users sign up with just their name, email, and password — no unnecessary fields, no complicated steps. The form is clean and quick to complete on any device." />
                                <SubCard color={cardColor(3, 1)} Icon={FiShield} title="Email Verification"
                                    description="A confirmation link is sent immediately after registration, keeping accounts secure without adding friction to the signup flow." />
                                <SubCard color={cardColor(3, 2)} Icon={FiMessageCircle} title="Welcome Onboarding"
                                    description="A guided welcome modal activates on first login, orienting new users to the platform's key features so they know exactly where to go and what to do next." />
                            </div>
                        </SectionCard>
                    </motion.div>

                    {/* 05 EQ Assessment */}
                    <motion.div {...reveal('up')}>
                        <SectionCard id="s05" num={5} sectionColor={PALETTE[4]} Icon={FiActivity} title="EQ Assessment">
                            <ImageCarousel images={imgs.s05} height="450px" sectionColor={PALETTE[4]} onOpen={setLightbox} />
                            <div style={{ marginTop: '0.85rem' }}>
                                <SText>
                                    The assessment is the platform's core feature. Users work through five
                                    emotional intelligence domains in sequence, responding to reflective
                                    prompts on a scale from <em>Not at All</em> to <em>Completely</em>.
                                    A visible progress bar shows completion at each step, keeping the
                                    experience structured and approachable rather than open-ended. Each
                                    domain targets a distinct dimension of emotional intelligence as defined
                                    by Daniel Goleman's framework, validated by a licensed Psychometrician.
                                </SText>
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                                gap: '0.7rem', marginBottom: '0.7rem',
                            }}>
                                <SubCard color={cardColor(4, 0)} Icon={FiUser} title="Self-Awareness"
                                    description="Measures how well a person recognizes their own emotions and understands how those emotions affect their thinking and behavior." />
                                <SubCard color={cardColor(4, 1)} Icon={FiActivity} title="Self-Regulation"
                                    description="Evaluates the ability to manage disruptive emotions and impulses constructively rather than reactively." />
                                <SubCard color={cardColor(4, 2)} Icon={FiZap} title="Motivation"
                                    description="Assesses internal drive and goal orientation — the capacity to pursue goals beyond immediate external rewards." />
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                gap: '0.7rem',
                            }}>
                                <SubCard color={cardColor(4, 3)} Icon={FiHeart} title="Empathy"
                                    description="Captures the degree to which a person understands and genuinely responds to the emotional states of others around them." />
                                <SubCard color={cardColor(4, 4)} Icon={FiUsers} title="Social Skills"
                                    description="Evaluates effectiveness in managing relationships, communicating clearly, and navigating conflict with others." />
                            </div>
                        </SectionCard>
                    </motion.div>

                    {/* 06 Results & Feedback */}
                    <motion.div {...reveal('up')}>
                        <SectionCard id="s06" num={6} sectionColor={PALETTE[5]} Icon={FiAward} title="Results & Feedback">
                            <SText>
                                After completing the assessment, users are presented with a comprehensive
                                results page that reflects their emotional intelligence across all five domains.
                                A circular score indicator displays the overall EI percentage alongside an
                                interpretation label — ranging from Developing to Strong Emotional
                                Intelligence. Domain-level scores highlight specific strengths and areas for
                                growth, and users can save or export the full report for future reference or
                                faculty submission under Project HR.
                            </SText>
                            <ImageCarousel images={imgs.s06} height="450px" sectionColor={PALETTE[5]} onOpen={setLightbox} />
                            <div style={{ marginTop: '0.85rem', marginBottom: '0.7rem' }}>
                                <SubCard color={cardColor(5, 0)} Icon={FiBarChart2} title="Overall EI Score"
                                    description="A circular percentage display shows the user's overall Emotional Intelligence score alongside a descriptive interpretation label — such as Developing, Moderate, or Strong Emotional Intelligence — giving an immediate, easy-to-understand summary of results." />
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                gap: '0.7rem',
                            }}>
                                <SubCard color={cardColor(5, 1)} Icon={FiPieChart} title="Domain Breakdown"
                                    description="Individual scores across all five domains — Self-Awareness, Self-Regulation, Motivation, Empathy, and Social Skills — identify which areas are strongest and which need more attention." />
                                <SubCard color={cardColor(5, 2)} Icon={FiDownload} title="Save or Download"
                                    description="Users can store results directly in their dashboard history or export a complete PDF report at any time — useful for personal tracking or submission to Project HR faculty." />
                            </div>
                        </SectionCard>
                    </motion.div>

                    {/* 07 User Dashboard */}
                    <motion.div {...reveal('up')}>
                        <SectionCard id="s07" num={7} sectionColor={PALETTE[6]} Icon={FiGrid} title="User Dashboard">
                            <SText>
                                The user dashboard is where ongoing engagement takes place after the initial
                                assessment. Students return here to complete wellness activities, access the
                                curated resource library, and track their EQ progress through visual charts.
                                It transforms FeelBright from a one-time evaluation tool into a continuing
                                self-improvement platform — giving students a personal space to grow
                                emotionally at their own pace under the guidance of Project HR.
                            </SText>
                            <ImageCarousel images={imgs.s07} height="450px" sectionColor={PALETTE[6]} onOpen={setLightbox} />
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                gap: '0.7rem', marginTop: '0.85rem',
                            }}>
                                <SubCard color={cardColor(6, 0)} Icon={FiHeart} title="Wellness Exercises"
                                    description="Guided breathing, journaling prompts, and mindfulness activities designed for regular short-session use — helping students build emotional resilience over time." />
                                <SubCard color={cardColor(6, 1)} Icon={FiBook} title="Resource Library"
                                    description="Curated articles and guides covering personal growth, leadership development, mindfulness, and emotional intelligence — all accessible directly from the dashboard." />
                                <SubCard color={cardColor(6, 2)} Icon={FiTrendingUp} title="Progress Tracking"
                                    description="A visual chart updated after each assessment showing EQ score movement across all five domains over time — making emotional growth visible and measurable." />
                                <SubCard color={cardColor(6, 3)} Icon={FiUser} title="Profile & History"
                                    description="Past assessment results, account settings, and the full session history are all managed from one central location — giving students a complete picture of their journey." />
                            </div>
                        </SectionCard>
                    </motion.div>

                    {/* 08 Admin Portal */}
                    <motion.div {...reveal('up')}>
                        <SectionCard id="s08" num={8} sectionColor={PALETTE[7]} Icon={FiSettings} title="Admin Portal">
                            <SText>
                                Faculty and program facilitators access the system through a separate admin portal that runs
                                independently of the student-facing interface. The portal allows administrators to monitor
                                participation, manage the content library, and pull reports — without disrupting the user experience on the other side.
                            </SText>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                                gap: '0.7rem', marginBottom: '0.85rem',
                            }}>
                                <SubCard color={cardColor(7, 0)} Icon={FiBarChart2} title="Analytics"
                                    description="Live dashboards showing participation rates, assessment completion trends, and average EQ scores across the user base." />
                                <SubCard color={cardColor(7, 1)} Icon={FiFileText} title="Content Management"
                                    description="Administrators can upload, edit, and organize articles, exercises, and resource guides directly from the portal." />
                                <SubCard color={cardColor(7, 2)} Icon={FiUsers} title="User Management"
                                    description="Profiles can be reviewed, activity can be monitored, and reports can be generated for faculty or program use." />
                            </div>
                            <ImageCarousel images={imgs.s08} height="450px" sectionColor={PALETTE[7]} onOpen={setLightbox} />
                        </SectionCard>
                    </motion.div>

                    {/* 09 Database Architecture */}
                    <motion.div {...reveal('up')}>
                        <SectionCard id="s09" num={9} sectionColor={PALETTE[8]} Icon={FiDatabase} title="Database Architecture">
                            <ImageCarousel images={imgs.s09} height="450px" sectionColor={PALETTE[8]} onOpen={setLightbox} />
                            <SText>
                                FeelBright is structured across three layers: a React and Tailwind frontend for the interface,
                                a Node.js and Express backend handling server logic, and a PostgreSQL database for persistent
                                storage. The database schema is organized around five core tables — each responsible for one
                                distinct area of the system's data.
                            </SText>
                            <DbTable sectionColor={PALETTE[8]} />
                        </SectionCard>
                    </motion.div>

                    {/* 10 Reflections */}
                    <motion.div {...reveal('up')}>
                        <SectionCard id="s10" num={10} sectionColor={PALETTE[9]} Icon={FiTrendingUp} title="Reflections & What's Next">
                            <SText>
                                The development of FeelBright surfaced challenges that extended well beyond
                                writing code — particularly the work of translating a psychological framework
                                into a product that feels intuitive to non-technical users. Real user testing
                                sessions consistently revealed friction points that internal assumptions alone
                                would not have caught, reinforcing the value of iterating with actual
                                participants throughout the build.
                            </SText>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                gap: '0.7rem', marginBottom: '1.25rem',
                            }}>
                                <SubCard color={cardColor(9, 0)} Icon={FiCheckCircle} title="What Went Well"
                                    description="The five-domain EQ assessment engine, auto-generated personalized feedback, and the admin monitoring panel all performed well and received positive responses from real users during evaluation sessions." />
                                <SubCard color={cardColor(9, 1)} Icon={FiArrowRight} title="What's Next"
                                    description="Planned additions include dark mode, a dedicated mobile app, Filipino language support, AI-powered personalized recommendations, and long-term integration with Arellano University's learning management system." />
                            </div>
                        </SectionCard>
                    </motion.div>

                </div>

                {/* ════ STICKY SIDEBAR — hidden on mobile (drawer instead) ════ */}
                {!isMobile && (
                    <Sidebar tocItems={tocItems} scrollTo={scrollTo} />
                )}

            </div>

            {/* ── Footer ── */}
            <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.75rem', color: 'var(--ink-faint)' }}>
                © 2026 Alfred Miguel De Leon · Pasay City, Philippines
            </p>

        </div>
    )
}

export default FeelBrightCaseStudy