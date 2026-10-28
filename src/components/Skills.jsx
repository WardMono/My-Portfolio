import { Link } from 'react-router-dom'
import {
    SiHtml5, SiJavascript, SiReact, SiTailwindcss, SiBootstrap,
    SiNodedotjs, SiExpress, SiLaravel, SiMysql, SiPostgresql,
    SiGit, SiGithub, SiVercel, SiFigma, SiCanva,
} from 'react-icons/si'
import { FaCss3Alt } from 'react-icons/fa'
import { TbBrandAdobe } from 'react-icons/tb'
import Reveal from './Reveal'

const skillMeta = {
    HTML: { Icon: SiHtml5, color: '#E34F26' },
    CSS: { Icon: FaCss3Alt, color: '#1572B6' },
    JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
    React: { Icon: SiReact, color: '#61DAFB' },
    'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
    Bootstrap: { Icon: SiBootstrap, color: '#7952B3' },
    'Node.js': { Icon: SiNodedotjs, color: '#339933' },
    'Express.js': { Icon: SiExpress, color: '#888888' },
    Laravel: { Icon: SiLaravel, color: '#FF2D20' },
    MySQL: { Icon: SiMysql, color: '#4479A1' },
    PostgreSQL: { Icon: SiPostgresql, color: '#336791' },
    Git: { Icon: SiGit, color: '#F05032' },
    GitHub: { Icon: SiGithub, color: '#181717' },
    Vercel: { Icon: SiVercel, color: '#111111' },
    Figma: { Icon: SiFigma, color: '#F24E1E' },
    'Adobe XD': { Icon: TbBrandAdobe, color: '#FF61F6' },
    Canva: { Icon: SiCanva, color: '#00C4CC' },
}

const rows = [
    ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap'],
    ['Node.js', 'Express.js', 'Laravel', 'MySQL', 'PostgreSQL'],
    ['Git', 'GitHub', 'Figma', 'Adobe XD', 'Vercel', 'Canva'],
]

export function SkillMarquee({ rows, meta }) {
    return (
        <div className="space-y-1">
            {rows.map((row, index) => {
                const once = Array.from({ length: 4 }, () => row).flat()
                const track = [...once, ...once]
                return (
                    <div key={index} className="skill-marquee-row">
                        <div className={`tech-track${index === 1 ? ' tech-track-right' : ''}`}>
                            {track.map((name, i) => {
                                const item = meta[name]
                                if (!item) return null
                                const Icon = item.Icon
                                return (
                                    <span key={`${name}-${i}`} className="skill-chip" style={{ '--sig': item.color }}>
                                        <Icon size={18} aria-hidden="true" />
                                        <span>{name}</span>
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function Skills() {
    return (
        <Reveal className="w-full space-y-5">
            <div className="flex items-center justify-between">
                <p className="text-2xl font-light tracking-tight text-gray-900 dark:text-white sm:text-3xl">Technologies</p>
                <Link to="/skills" className="group inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                    <span>View All</span>
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                </Link>
            </div>
            <SkillMarquee rows={rows} meta={skillMeta} />
        </Reveal>
    )
}

export default Skills
