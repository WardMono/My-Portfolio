import { Link } from 'react-router-dom'
import { SiReact, SiNodedotjs, SiJavascript, SiTailwindcss, SiHtml5, SiPostgresql, SiLaravel, SiGodotengine } from 'react-icons/si'
import { FaCss3Alt } from 'react-icons/fa'
import { projectsData } from '../data/projects'
import Reveal from './Reveal'
import AccordionGallery from './AccordionGallery'

const tagIcons = {
    React: { Icon: SiReact, color: '#61DAFB' },
    'Node.js': { Icon: SiNodedotjs, color: '#339933' },
    JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
    'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
    HTML: { Icon: SiHtml5, color: '#E34F26' },
    CSS: { Icon: FaCss3Alt, color: '#1572B6' },
    PostgreSQL: { Icon: SiPostgresql, color: '#336791' },
    Laravel: { Icon: SiLaravel, color: '#FF2D20' },
    'Godot 4.3': { Icon: SiGodotengine, color: '#478CBF' },
}

function Arrow({ className = 'h-3.5 w-3.5' }) {
    return (
        <svg className={`${className} transition-transform group-hover:translate-x-1`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    )
}

export function ProjectCard({ project }) {
    const moveLight = (event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
        event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
    }
    const icons = project.tags.map(tag => tagIcons[tag]).filter(Boolean).slice(0, 6)

    return (
        <div
            onMouseMove={moveLight}
            className="card-spotlight project-card flex h-full w-full flex-col gap-2 rounded-xl p-2"
        >
            {project.image ? (
                project.link ? (
                    <a href={project.link} target="_blank" rel="noreferrer" className="group/image block overflow-hidden rounded-lg">
                        <img src={project.image} alt="" className="h-40 w-full object-cover transition-transform duration-500 ease-out group-hover/image:scale-105" />
                    </a>
                ) : (
                    <Link to={project.caseStudy || '/projects'} className="group/image block overflow-hidden rounded-lg">
                        <img src={project.image} alt="" className="h-40 w-full object-cover transition-transform duration-500 ease-out group-hover/image:scale-105" />
                    </Link>
                )
            ) : (
                <div className="flex h-40 items-center justify-center rounded-lg text-sm tracking-[0.14em] text-gray-500">
                    {project.name.slice(0, 2).toUpperCase()}
                </div>
            )}
            <div className="mt-3 flex flex-1 flex-col px-2">
                <div className="flex min-h-0 flex-1 flex-col">
                    <p className="text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-white">{project.name}</p>
                    <p className="mt-1 text-xs font-semibold text-gray-700 dark:text-gray-300">{project.tagline}</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{project.desc}</p>
                </div>
                {icons.length > 0 && (
                    <div className="mt-auto pt-3">
                        <div className="flex items-center gap-3">
                            {icons.map(({ Icon, color }) => (
                                <span key={color + Icon.name} className="project-logo" style={{ '--sig': color }}>
                                    <Icon size={18} color={color} aria-hidden="true" />
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-auto">
                <div className="project-card-rule mb-1 mt-1.5 border-t border-dotted" />
                <div className="flex min-h-[34px] items-center justify-end gap-3 px-2 pb-1">
                    {project.caseStudy && (
                        <Link to={project.caseStudy} className="group inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <span>Read case study</span>
                            <Arrow className="h-3 w-3" />
                        </Link>
                    )}
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <span>Visit site</span>
                            <Arrow className="h-3 w-3" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

function Projects() {
    const featured = projectsData.filter(project => project.image).slice(0, 3)
    const gallery = featured.map(project => ({
        id: project.id,
        image: project.image,
        alt: project.name,
        category: project.tagline,
        title: project.name,
        cta: project.caseStudy ? 'Read case study' : 'Visit site',
        href: project.caseStudy || project.link,
        collapsedLabel: project.name.split(' ')[0],
        collapsedCategory: project.category?.[0] || 'Project',
    }))

    return (
        <>
            <Reveal className="w-full space-y-5">
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-light tracking-tight text-gray-900 dark:text-white sm:text-3xl">Featured Work</p>
                    <Link to="/projects" className="group inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                        <span>View All</span>
                        <Arrow />
                    </Link>
                </div>
                <AccordionGallery items={gallery} />
            </Reveal>
        </>
    )
}

export default Projects
