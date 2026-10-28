import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projectsData } from '../data/projects'
import { ProjectCard } from '../components/Projects'
import SiteFooter from '../components/SiteFooter'

const PAGE_SIZE = 4

function ProjectsPage() {
    const [page, setPage] = useState(1)
    const total = Math.ceil(projectsData.length / PAGE_SIZE)
    const visible = projectsData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    return (
        <main className="mx-auto flex w-full max-w-3xl flex-col px-4 py-10 sm:px-6 sm:py-14">
            <Link to="/" className="group inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Back to Home</span>
            </Link>
            <p className="mt-6 text-2xl font-light tracking-tight text-gray-900 dark:text-white sm:text-3xl">Selected Projects</p>
            <p className="mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                A collection of web apps and sites I&apos;ve designed and built.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                {visible.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
            {total > 1 && (
                <div className="soft-line mt-10 flex items-center justify-between border-t border-dotted pt-6">
                    <button
                        type="button"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="group inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 disabled:opacity-30 dark:hover:text-white"
                    >
                        <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                        <span className="hidden sm:inline">Previous</span>
                    </button>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: total }, (_, i) => i + 1).map(n => (
                            <button
                                key={n}
                                type="button"
                                onClick={() => setPage(n)}
                                className={`stroke-page flex h-8 w-8 items-center justify-center rounded-lg text-sm ${n === page ? 'is-on' : ''}`}
                            >
                                {n}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => setPage(p => Math.min(total, p + 1))}
                        disabled={page === total}
                        className="group inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 disabled:opacity-30 dark:hover:text-white"
                    >
                        <span className="hidden sm:inline">Next</span>
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </button>
                </div>
            )}
            <SiteFooter />
        </main>
    )
}

export default ProjectsPage
