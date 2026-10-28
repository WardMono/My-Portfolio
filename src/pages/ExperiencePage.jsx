import { Link } from 'react-router-dom'
import { ExperienceList } from '../components/Experience'
import SiteFooter from '../components/SiteFooter'

function ExperiencePage() {
    return (
        <main className="mx-auto flex w-full max-w-3xl flex-col px-4 py-10 sm:px-6 sm:py-14">
            <Link to="/" className="group inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Back to Home</span>
            </Link>
            <p className="mt-6 text-2xl font-light tracking-tight text-gray-900 dark:text-white sm:text-3xl">Experience</p>
            <p className="mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Where I&apos;ve worked and what I did there.</p>
            <div className="mt-10">
                <ExperienceList detailed />
            </div>
            <SiteFooter />
        </main>
    )
}

export default ExperiencePage
