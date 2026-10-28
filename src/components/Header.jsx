import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiGmail, SiReact, SiNodedotjs, SiLaravel, SiPostgresql } from 'react-icons/si'
import profile from '../assets/Profile.jpg'
import nagi from '../assets/nagi.jpg'
import PixelAvatar from './PixelAvatar'
import SignatureBox from './SignatureBox'

const socials = [
    { href: 'https://github.com/WardMono', label: 'GitHub', Icon: FaGithub, color: '#181717' },
    { href: 'https://www.linkedin.com/in/alfred-de-leon-b9b466278/', label: 'LinkedIn', Icon: FaLinkedin, color: '#0A66C2' },
    { href: 'mailto:Deleonalfredmiguel@gmail.com', label: 'Gmail', Icon: SiGmail, color: '#EA4335' },
]

const chips = [
    { label: 'React', Icon: SiReact, hex: '#61DAFB' },
    { label: 'Node.js', Icon: SiNodedotjs, hex: '#339933' },
    { label: 'Laravel', Icon: SiLaravel, hex: '#FF2D20' },
    { label: 'PostgreSQL', Icon: SiPostgresql, hex: '#336791' },
]

function Header() {
    return (
        <section className="flex flex-col justify-center pb-8 pt-6 sm:pb-8 sm:pt-16">
            <div className="space-y-6 sm:space-y-10">
                <div className="mb-4 flex items-center gap-4 sm:gap-6">
                    <PixelAvatar src={nagi} altSrc={profile} alt="Alfred Miguel De Leon" />
                    <div className="flex h-full flex-col justify-center gap-2.5 sm:gap-3">
                        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-3xl">
                            Alfred Miguel De Leon
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="12" cy="12" r="12" fill="#1D9BF0" />
                                <path d="M6.5 12.5L10 16L17.5 8.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                        </h1>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            {socials.map(({ href, label, Icon, color }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('http') ? '_blank' : undefined}
                                    rel="noreferrer"
                                    className="profile-social"
                                    style={{ '--social': color }}
                                >
                                    <Icon size={15} aria-hidden="true" />
                                    <span>{label}</span>
                                    <svg className="profile-social-arrow" viewBox="0 0 12 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M1.5 12.5 10.5 1.5" />
                                        <path d="M5.2 1.5H10.5V6.8" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-5 sm:space-y-6">
                    <h2 className="max-w-full text-[1.7rem] font-normal leading-tight tracking-tight text-gray-900 dark:text-white sm:text-[2.05rem] md:text-[2.15rem]">
                        Full-Stack Developer
                        <span className="profile-role">UI/UX &amp; Software Engineering</span>
                    </h2>
                    <p className="text-base font-light leading-7 text-gray-500 dark:text-gray-400 sm:text-lg sm:leading-8">
                        I&apos;m a full-stack developer building websites, applications, and backend systems with{' '}
                        <span className="inline-flex flex-wrap items-center gap-1.5 align-middle">
                            {chips.map(({ label, Icon, hex }) => (
                                <SignatureBox key={label} name={label} Icon={Icon} color={hex} inline locked />
                            ))}
                        </span>
                        {' '}from the interface through to the database. I design and ship products that feel clear to use.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2 sm:gap-4">
                        <a
                            href="/Alfred_Miguel_De_Leon_Resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="profile-resume group"
                        >
                            <span>View Resume</span>
                            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header
