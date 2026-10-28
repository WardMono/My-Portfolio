import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import ttecLogo from '../assets/ttec.svg'
import newsimLogo from '../assets/newsim.png'

function tenure(start, end) {
    const from = new Date(start)
    const to = end ? new Date(end) : new Date()
    let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth())
    if (end) months += 1
    else if (to.getDate() < from.getDate()) months -= 1
    months = Math.max(months, 1)
    const years = Math.floor(months / 12)
    const mos = months % 12
    const parts = []
    if (years) parts.push(years === 1 ? '1 yr' : `${years} yrs`)
    if (mos) parts.push(mos === 1 ? '1 mo' : `${mos} mos`)
    return parts.join(' ')
}

export const experienceData = [
    {
        role: 'Customer Service Representative',
        company: 'TeleTech',
        logo: ttecLogo,
        logoInk: true,
        type: 'Full-time',
        place: 'Pasay City, MOA',
        mode: 'On-site',
        startLabel: 'Jul 2026',
        endLabel: 'Present',
        start: '2026-07-17',
        end: null,
        points: [
            'Managed inbound and outbound customer calls, resolving each inquiry from initial contact through to a documented outcome.',
            'Maintained accurate customer records in the CRM throughout each interaction, ensuring account information remained complete and current.',
            'Met daily performance standards by balancing resolution quality with established productivity targets.',
            'Coordinated the live conversation and the customer record simultaneously, addressing the issue without requiring the customer to restate it.',
            'Prepared clear case documentation so subsequent updates could proceed from a complete and reliable record.',
        ],
    },
    {
        role: 'Technical Support Specialist Intern',
        company: 'New Simulator Center of the Philippines Inc.',
        logo: newsimLogo,
        type: 'Internship',
        place: 'Makati City',
        mode: 'On-site',
        startLabel: 'Nov 2025',
        endLabel: 'Feb 2026',
        start: '2025-11-01',
        end: '2026-02-28',
        points: [
            'Diagnosed and resolved hardware and software issues through telephone, email, and in-person support.',
            'Managed support tickets from initial logging through resolution, maintaining accurate documentation for team reference.',
            'Executed assigned technical tasks in accordance with established procedures, delivering timely and properly documented support.',
        ],
    },
]

function Arrow() {
    return (
        <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    )
}

export function ExperienceList({ detailed = false }) {
    return (
        <div className="exp-map">
            {experienceData.map((exp, index) => {
                const length = tenure(exp.start, exp.end)
                return (
                <article key={`${exp.company}-${exp.start}`} className={`exp-stop${index === 0 ? ' is-current' : ''}${detailed ? ' has-logo' : ''}`}>
                    {detailed && (
                        <span className="exp-logo">
                            <img src={exp.logo} alt="" className={exp.logoInk ? 'is-ink' : ''} />
                        </span>
                    )}
                    <div className="exp-rail" aria-hidden="true" />
                    <div className="exp-body">
                        {detailed ? (
                            <>
                                <h3 className="text-base font-semibold leading-tight text-gray-900 dark:text-white sm:text-[17px]">{exp.company}</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{exp.type} · {length}</p>
                                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{exp.place} · {exp.mode}</p>
                                <p className="mt-3 text-sm font-medium text-gray-800 dark:text-gray-200">{exp.role}</p>
                                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{exp.startLabel} – {exp.endLabel} · {length}</p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-base font-semibold leading-tight text-gray-900 dark:text-white sm:text-[17px]">{exp.role}</h3>
                                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">{exp.company}</p>
                                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{exp.place} · {exp.mode} · {exp.type}</p>
                            </>
                        )}
                        {detailed && (
                            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                {exp.points.map(point => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </article>
                )
            })}
        </div>
    )
}

function Experience() {
    return (
        <Reveal id="experience" className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <p className="text-2xl font-light tracking-tight text-gray-900 dark:text-white sm:text-3xl">Experience</p>
                <Link to="/experience" className="group inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                    <span>View Details</span>
                    <Arrow />
                </Link>
            </div>
            <ExperienceList />
        </Reveal>
    )
}

export default Experience
