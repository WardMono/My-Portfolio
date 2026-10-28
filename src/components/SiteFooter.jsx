import VisitedBy from './VisitedBy'

function SiteFooter() {
    return (
        <footer className="site-footer soft-line mt-14 border-t pt-6 text-sm sm:mt-16 sm:pt-8">
            <div className="site-footer-copy">
                <p className="text-sm italic text-gray-400 dark:text-gray-500">Building things that feel effortless to use.</p>
                <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-normal tracking-tight text-gray-900 dark:text-white">Alfred Miguel De Leon</span>
                    <span className="text-gray-300 dark:text-gray-600">/</span>
                    <span>Full-Stack Developer</span>
                    <span className="text-gray-300 dark:text-gray-600">/</span>
                    <span>Pasay City, PH</span>
                </p>
            </div>
            <VisitedBy />
        </footer>
    )
}

export default SiteFooter
