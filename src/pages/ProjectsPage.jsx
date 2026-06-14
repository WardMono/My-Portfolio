// src/pages/ProjectsPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projectsData } from '../data/projects'
import { usePageReady } from '../hooks/usePageReady'
import LoadingScreen from '../components/LoadingScreen'

const FILTER_TAGS = ['Full Stack', 'Frontend', 'Game', 'Platform', 'Landing Page', 'Booking']
const PAGE_SIZE = 4


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

const tagColors = {
    'React': '#61DAFB', 'Node.js': '#339933', 'JavaScript': '#F7DF1E',
    'Tailwind CSS': '#06B6D4', 'HTML': '#E34F26', 'CSS': '#1572B6',
    'PostgreSQL': '#336791', 'Express.js': '#000000', 'Laravel': '#FF2D20',
    'Godot 4.3': '#478CBF', 'GDScript': '#478CBF', 'Vercel': '#000000',
}

function getAccentColor(project) {
    for (const tag of project.tags) {
        if (tagColors[tag]) return tagColors[tag]
    }
    return '#888888'
}

// ── Framer Motion variants ────────────────────────────────────────────────────
const cardContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
}

const cardItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
}

function ProjectCard({ project, fullWidth, isMobile, isTablet }) {
    const navigate = useNavigate()
    const [hovered, setHovered] = useState(false)
    const accentColor = getAccentColor(project)
    const isRowLayout = fullWidth && !isMobile

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? 'var(--card-hover-bg)' : 'var(--card-bg)',
                border: `1px solid ${hovered ? 'var(--card-border-hover)' : 'var(--card-border)'}`,
                borderRadius: 'var(--radius)', overflow: 'hidden',
                transition: 'all 0.22s ease', display: 'flex',
                flexDirection: isRowLayout ? 'row' : 'column',
                transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: hovered ? '0 8px 28px rgba(0,0,0,0.07)' : 'none',
                cursor: 'default',
                height: '100%',
            }}
        >
            <div style={{
                width: isRowLayout ? '320px' : '100%',
                height: isRowLayout ? 'auto' : isMobile ? '180px' : '240px',
                minHeight: isRowLayout ? '200px' : 'unset',
                flexShrink: 0, overflow: 'hidden',
                padding: isMobile ? '0.5rem' : '0.75rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                {project.image ? (
                    <img src={project.image} alt={project.name} style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        borderRadius: '10px', display: 'block',
                    }} />
                ) : (
                    <div style={{
                        width: '100%', height: '100%',
                        background: `linear-gradient(135deg, ${accentColor}22 0%, ${accentColor}44 100%)`,
                        borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <span style={{
                            fontSize: isRowLayout ? '3rem' : isMobile ? '1.75rem' : '2.2rem',
                            fontWeight: 800, color: accentColor,
                            opacity: 0.4, letterSpacing: '-1px', userSelect: 'none',
                        }}>
                            {project.name.slice(0, 2).toUpperCase()}
                        </span>
                    </div>
                )}
            </div>

            <div style={{
                padding: isMobile ? '1rem' : '1.4rem',
                display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1,
            }}>
                <div>
                    <p style={{
                        fontSize: isRowLayout ? '1.1rem' : isMobile ? '0.92rem' : '1rem',
                        fontWeight: 700, color: 'var(--ink)', marginBottom: '0.15rem', lineHeight: 1.3,
                    }}>{project.name}</p>
                    <p style={{ fontSize: isMobile ? '0.72rem' : '0.78rem', color: 'var(--ink-muted)', fontWeight: 500 }}>
                        {project.tagline}
                    </p>
                </div>
                <p style={{ fontSize: isMobile ? '0.75rem' : '0.8rem', color: 'var(--ink-muted)', lineHeight: 1.65, flex: 1 }}>
                    {project.desc}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {project.link && (() => {
                        const domain = new URL(project.link).hostname.replace(/^www\./, '')
                        return (
                            <a href={project.link} target="_blank" rel="noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center',
                                    padding: isMobile ? '0.22rem 0.6rem' : '0.25rem 0.75rem',
                                    borderRadius: '100px', border: '1.5px solid var(--card-border-hover)',
                                    fontSize: isMobile ? '0.68rem' : '0.72rem', fontWeight: 600,
                                    color: 'var(--ink-muted)', textDecoration: 'none',
                                    background: 'transparent', transition: 'background 0.18s, border-color 0.18s',
                                    letterSpacing: '0.01em', WebkitTapHighlightColor: 'transparent',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--btn-disabled-bg)'; e.currentTarget.style.borderColor = 'var(--border-active)' }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--card-border-hover)' }}
                            >{domain}</a>
                        )
                    })()}
                    {project.caseStudy && (
                        <button onClick={() => navigate(project.caseStudy)}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                padding: isMobile ? '0.22rem 0.6rem' : '0.25rem 0.75rem',
                                borderRadius: '100px', border: '1.5px solid var(--card-border-hover)',
                                fontSize: isMobile ? '0.68rem' : '0.72rem', fontWeight: 600,
                                color: 'var(--ink-muted)', background: 'transparent', cursor: 'pointer',
                                fontFamily: 'inherit', transition: 'background 0.18s, border-color 0.18s',
                                letterSpacing: '0.01em', WebkitTapHighlightColor: 'transparent',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--btn-disabled-bg)'; e.currentTarget.style.borderColor = 'var(--border-active)' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--card-border-hover)' }}
                        >View Case Study</button>
                    )}
                </div>
            </div>
        </div>
    )
}

function ProjectsGrid({ projects, isMobile, isTablet, ready }) {
    const isOdd = projects.length % 2 !== 0
    const lastIndex = projects.length - 1

    return (
        <motion.div
            variants={cardContainer}
            initial="hidden"
            animate={ready ? 'visible' : 'hidden'}
            style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: isMobile ? '0.75rem' : '1rem',
            }}
        >
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    variants={cardItem}
                    style={{
                        // gridColumn lives here now, not inside ProjectCard
                        gridColumn: isOdd && index === lastIndex && !isMobile ? 'span 2' : 'span 1',
                    }}
                >
                    <ProjectCard
                        project={project}
                        fullWidth={isOdd && index === lastIndex}
                        isMobile={isMobile}
                        isTablet={isTablet}
                    />
                </motion.div>
            ))}
        </motion.div>
    )
}

function Pagination({ current, total, onChange, isMobile }) {
    if (total <= 1) return null
    const btnBase = {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        height: isMobile ? '2.25rem' : '2rem', width: isMobile ? '2.25rem' : '2rem',
        borderRadius: '6px', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
        fontSize: isMobile ? '0.85rem' : '0.8rem', fontWeight: 500,
        transition: 'all 0.15s', WebkitTapHighlightColor: 'transparent',
    }
    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: isMobile ? '0.4rem' : '0.3rem', marginTop: '1.25rem', flexWrap: 'wrap',
        }}>
            <button onClick={() => onChange(current - 1)} disabled={current === 1}
                style={{ ...btnBase, width: 'auto', padding: isMobile ? '0 0.875rem' : '0 0.75rem', gap: '0.35rem', background: 'var(--btn-disabled-bg)', color: current === 1 ? 'var(--ink-faint)' : 'var(--ink)', opacity: current === 1 ? 0.4 : 1, cursor: current === 1 ? 'default' : 'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                Prev
            </button>
            {Array.from({ length: total }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => onChange(page)}
                    style={{ ...btnBase, background: current === page ? 'var(--ink)' : 'var(--btn-disabled-bg)', color: current === page ? 'var(--bg)' : 'var(--ink-light)' }}>
                    {page}
                </button>
            ))}
            <button onClick={() => onChange(current + 1)} disabled={current === total}
                style={{ ...btnBase, width: 'auto', padding: isMobile ? '0 0.875rem' : '0 0.75rem', gap: '0.35rem', background: 'var(--btn-disabled-bg)', color: current === total ? 'var(--ink-faint)' : 'var(--ink)', opacity: current === total ? 0.4 : 1, cursor: current === total ? 'default' : 'pointer' }}>
                Next
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
        </div>
    )
}

function ProjectsPage() {
    const navigate = useNavigate()
    const { isMobile, isTablet } = useBreakpoint()
    const [activeFilter, setActiveFilter] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [paging, setPaging] = useState(false)
    const ready = usePageReady()

    const filtered = activeFilter
        ? projectsData.filter(p => p.category?.includes(activeFilter))
        : projectsData
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
    const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

    const handlePageChange = (newPage) => {
        if (paging || newPage === currentPage) return
        setPaging(true)
        setTimeout(() => {
            setCurrentPage(newPage)
            setPaging(false)
        }, 600)
    }

    const handleFilter = (tag) => {
        if (paging) return
        setPaging(true)
        setTimeout(() => {
            setActiveFilter(tag)
            setCurrentPage(1)
            setPaging(false)
        }, 600)
    }

    const pagePadding = isMobile ? '1.25rem 0.875rem 3rem' : isTablet ? '1.5rem 1rem 3.5rem' : '2rem 1.25rem 4rem'
    const headerPadding = isMobile ? '1.25rem' : isTablet ? '1.5rem' : '1.75rem 2rem'

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: pagePadding, boxSizing: 'border-box', width: '100%' }}>

            {/* Back nav ─ fades + slides up on ready */}
            <motion.button
                initial={{ opacity: 0, y: 14 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => navigate('/')}
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    marginBottom: '1.25rem', background: 'none', border: 'none',
                    cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500,
                    color: 'var(--ink-muted)', padding: 0, fontFamily: 'inherit',
                    transition: 'color 0.15s', WebkitTapHighlightColor: 'transparent',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-muted)'}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Back to Portfolio
            </motion.button>

            {/* Header card ─ 80ms after back button */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                style={{
                    background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                    borderRadius: 'var(--radius)', padding: headerPadding, marginBottom: '1rem',
                }}
            >
                <h1 style={{ fontSize: isMobile ? '1.35rem' : '1.75rem', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--ink)', marginBottom: '0.35rem' }}>Featured Work</h1>
                <p style={{ fontSize: isMobile ? '0.8rem' : '0.85rem', color: 'var(--ink-muted)', marginBottom: '1.25rem' }}>
                    Selected projects in web and software development.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                    {[null, ...FILTER_TAGS].map(tag => (
                        <button key={tag ?? 'all'} onClick={() => handleFilter(tag)}
                            style={{
                                padding: isMobile ? '0.3rem 0.65rem' : '0.28rem 0.72rem',
                                borderRadius: '100px', fontSize: isMobile ? '0.72rem' : '0.75rem',
                                fontWeight: 500, cursor: 'pointer', border: 'none', fontFamily: 'inherit',
                                background: activeFilter === tag ? 'var(--ink)' : 'var(--btn-disabled-bg)',
                                color: activeFilter === tag ? 'var(--bg)' : 'var(--ink-light)',
                                transition: 'all 0.15s', WebkitTapHighlightColor: 'transparent',
                            }}
                        >{tag ?? 'All'}</button>
                    ))}
                </div>
            </motion.div>

            {paginated.length > 0 ? (
                <>
                    {/*
                      key changes on filter/page → ProjectsGrid remounts →
                      motion resets to "hidden" → stagger replays even when ready is already true
                    */}
                    <ProjectsGrid
                        key={`${activeFilter ?? 'all'}-${currentPage}`}
                        projects={paginated}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        ready={ready}
                    />
                    <Pagination current={currentPage} total={totalPages} onChange={handlePageChange} isMobile={isMobile} />
                </>
            ) : (
                <div style={{ padding: '4rem 0', color: 'var(--ink-faint)', fontSize: '0.88rem', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    No projects match this filter.
                </div>
            )}

            <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.75rem', color: 'var(--ink-faint)' }}>
                © 2026 Alfred Miguel De Leon · Pasay City, Philippines
            </p>
        </div>
    )
}

export default ProjectsPage