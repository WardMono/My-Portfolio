import { Link } from 'react-router-dom'
import Reveal from './Reveal'

export const experienceData = [
    {
        role: 'Customer Service Representative',
        company: 'TeleTech',
        location: 'Pasay City, MOA · On-site · Full-time',
        date: 'Jul 2026 – Present',
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
        location: 'Makati City · On-site · Internship',
        date: 'Nov 2025 – Feb 2026',
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
            {experienceData.map((exp, index) => (
                <article key={`${exp.company}-${exp.date}`} className={`exp-stop${index === 0 ? ' is-current' : ''}`}>
                    <p className="exp-date">{exp.date}</p>
                    <div className="exp-rail" aria-hidden="true" />
                    <div className="exp-body">
                        <h3 className="text-base font-semibold leading-tight text-gray-900 dark:text-white sm:text-[17px]">{exp.role}</h3>
                        <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">{exp.company}</p>
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{exp.location}</p>
                        {detailed && (
                            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                {exp.points.map(point => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </article>
            ))}
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
