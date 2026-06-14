// src/components/Projects.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectsData } from '../data/projects'

const tagColors = {
    'React': '#61DAFB',
    'Node.js': '#339933',
    'JavaScript': '#F7DF1E',
    'Tailwind CSS': '#06B6D4',
    'HTML': '#E34F26',
    'CSS': '#1572B6',
    'PostgreSQL': '#336791',
    'Express.js': '#000000',
    'Laravel': '#FF2D20',
    'Godot 4.3': '#478CBF',
    'GDScript': '#478CBF',
    'Vercel': '#000000',
}

function getAccentColor(project) {
    for (const tag of project.tags) {
        if (tagColors[tag]) return tagColors[tag]
    }
    return '#888888'
}

function ProjectCard({ project, index }) {
    const navigate = useNavigate()
    const [hovered, setHovered] = useState(false)
    const accentColor = getAccentColor(project)

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="anim-up"
            style={{
                animationDelay: `${index * 80}ms`,
                background: hovered ? 'var(--card-hover-bg)' : 'var(--card-bg)',
                border: `1px solid ${hovered ? 'var(--card-border-hover)' : 'var(--card-border)'}`,
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease',
                display: 'flex',
                flexDirection: 'column',
                transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: hovered ? '0 8px 28px rgba(0,0,0,0.07)' : 'none',
            }}
        >
            {/* Image */}
            <div style={{
                width: '100%',
                height: '200px',
                overflow: 'hidden',
                padding: '0.75rem',
                boxSizing: 'border-box',
            }}>
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            display: 'block',
                        }}
                    />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(135deg, ${accentColor}22 0%, ${accentColor}44 100%)`,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <span style={{
                            fontSize: '2.2rem',
                            fontWeight: 800,
                            color: accentColor,
                            opacity: 0.4,
                            letterSpacing: '-1px',
                            userSelect: 'none',
                        }}>
                            {project.name.slice(0, 2).toUpperCase()}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div style={{
                padding: '1.4rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                flex: 1,
            }}>
                <div>
                    <p style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--ink)',
                        marginBottom: '0.15rem',
                        lineHeight: 1.3,
                    }}>
                        {project.name}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', fontWeight: 500 }}>
                        {project.tagline}
                    </p>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', lineHeight: 1.65, flex: 1 }}>
                    {project.desc}
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {project.link && (() => {
                        const domain = new URL(project.link).hostname.replace(/^www\./, '')
                        return (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    minHeight: '28px',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '100px',
                                    border: '1.5px solid var(--card-border-hover)',
                                    fontSize: '0.72rem',
                                    fontWeight: 600,
                                    color: 'var(--ink-muted)',
                                    textDecoration: 'none',
                                    background: 'transparent',
                                    transition: 'background 0.18s, border-color 0.18s',
                                    letterSpacing: '0.01em',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'var(--btn-disabled-bg)'
                                    e.currentTarget.style.borderColor = 'var(--border-active)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'transparent'
                                    e.currentTarget.style.borderColor = 'var(--card-border-hover)'
                                }}
                            >
                                {domain}
                            </a>
                        )
                    })()}

                    {project.caseStudy && (
                        <button
                            onClick={() => navigate(project.caseStudy)}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                minHeight: '28px',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '100px',
                                border: '1.5px solid var(--card-border-hover)',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                color: 'var(--ink-muted)',
                                background: 'transparent',
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                transition: 'background 0.18s, border-color 0.18s',
                                letterSpacing: '0.01em',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'var(--btn-disabled-bg)'
                                e.currentTarget.style.borderColor = 'var(--border-active)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.borderColor = 'var(--card-border-hover)'
                            }}
                        >
                            View Case Study
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

function ProjectsGrid({ projects }) {
    return (
        <>
            <style>{`
                .projects-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
                @media (min-width: 640px) {
                    .projects-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            `}</style>
            <div className="projects-grid">
                {projects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </div>
        </>
    )
}

function Projects() {
    const navigate = useNavigate()
    const visibleProjects = projectsData.slice(0, 4)

    return (
        <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius)',
            padding: '1.5rem',
            marginBottom: '1rem',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
            }}>
                <p style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    lineHeight: 1.3,
                }}>
                    Projects
                </p>
                <button
                    onClick={() => navigate('/projects')}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--ink-faint)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.5rem 0',
                        minHeight: '44px',
                        transition: 'color 0.15s',
                        fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-faint)'}
                >
                    View All
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <ProjectsGrid projects={visibleProjects} />
        </div>
    )
}

export default Projects