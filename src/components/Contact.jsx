import { SiGmail } from 'react-icons/si'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import Reveal from './Reveal'

const items = [
    { label: 'Email', title: 'Deleonalfredmiguel@gmail.com', href: 'mailto:Deleonalfredmiguel@gmail.com', Icon: SiGmail, color: '#EA4335' },
    { label: 'LinkedIn', title: 'Alfred Miguel De Leon', href: 'https://www.linkedin.com/in/alfred-de-leon-b9b466278/', Icon: FaLinkedin, color: '#0A66C2', external: true },
    { label: 'GitHub', title: 'WardMono', href: 'https://github.com/WardMono', Icon: FaGithub, color: '#24292F', external: true },
]

function Contact() {
    return (
        <Reveal id="contact" className="w-full space-y-5">
            <p className="text-2xl font-light tracking-tight text-gray-900 dark:text-white sm:text-3xl">Let&apos;s work together.</p>
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <p className="max-w-xl text-sm leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
                    Open to freelance, collaborations, and full-time roles. I build full-stack products from the first screen through to the database.
                </p>
                <div className="grid gap-3">
                    {items.map(({ label, title, href, Icon, color, external }) => (
                        <a
                            key={label}
                            href={href}
                            target={external ? '_blank' : undefined}
                            rel="noreferrer"
                            className="sig-card"
                            style={{ '--sig': color }}
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="sig-card-icon">
                                    <Icon size={18} aria-hidden="true" />
                                </div>
                                <div className="min-w-0">
                                    <small>{label}</small>
                                    <strong className="block truncate">{title}</strong>
                                </div>
                            </div>
                            <svg className="sig-card-arrow h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </a>
                    ))}
                </div>
            </div>
        </Reveal>
    )
}

export default Contact
