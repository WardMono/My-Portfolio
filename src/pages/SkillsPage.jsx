import { Link } from 'react-router-dom'
import { fullStack } from '../data/skills'
import SiteFooter from '../components/SiteFooter'
import {
    SiHtml5, SiJavascript, SiPhp, SiXml,
    SiReact, SiTailwindcss, SiBootstrap, SiJquery,
    SiNodedotjs, SiExpress, SiLaravel,
    SiMysql, SiPostgresql,
    SiGit, SiGithub, SiGitlab, SiVercel,
    SiFigma, SiCanva, SiDavinciresolve,
    SiGodotengine, SiOpenai, SiAnthropic, SiClaude,
    SiWebflow, SiDiscord, SiJira, SiTrello,
} from 'react-icons/si'
import { FaCss3Alt, FaJava, FaGamepad } from 'react-icons/fa'
import { TbBrandAdobe, TbApi, TbDeviceGamepad2, TbBinaryTree, TbBrandVscode, TbBrandTeams } from 'react-icons/tb'
import { MdDesignServices } from 'react-icons/md'
import { BsBraces } from 'react-icons/bs'
import { VscSymbolColor } from 'react-icons/vsc'

const skillMeta = {
    'HTML': { Icon: SiHtml5, color: '#E34F26' },
    'CSS': { Icon: FaCss3Alt, color: '#1572B6' },
    'JavaScript': { Icon: SiJavascript, color: '#F7DF1E' },
    'PHP': { Icon: SiPhp, color: '#777BB4' },
    'Java': { Icon: FaJava, color: '#007396' },
    'XML': { Icon: SiXml, color: '#FF6600' },
    'React': { Icon: SiReact, color: '#61DAFB' },
    'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
    'Bootstrap': { Icon: SiBootstrap, color: '#7952B3' },
    'jQuery': { Icon: SiJquery, color: '#0769AD' },
    'Responsive Design': { Icon: MdDesignServices, color: '#FF7043' },
    'Wireframing': { Icon: VscSymbolColor, color: '#9C27B0' },
    'Node.js': { Icon: SiNodedotjs, color: '#339933' },
    'Express.js': { Icon: SiExpress, color: '#888888' },
    'Laravel': { Icon: SiLaravel, color: '#FF2D20' },
    'REST APIs': { Icon: TbApi, color: '#FF6B35' },
    'MySQL': { Icon: SiMysql, color: '#4479A1' },
    'PostgreSQL': { Icon: SiPostgresql, color: '#336791' },
    'Git': { Icon: SiGit, color: '#F05032' },
    'GitHub': { Icon: SiGithub, color: '#181717' },
    'GitLab': { Icon: SiGitlab, color: '#FC6D26' },
    'Vercel': { Icon: SiVercel, color: '#888888' },
    'Figma': { Icon: SiFigma, color: '#F24E1E' },
    'Adobe XD': { Icon: TbBrandAdobe, color: '#FF61F6' },
    'Canva': { Icon: SiCanva, color: '#00C4CC' },
    'CapCut': { Icon: TbDeviceGamepad2, color: '#FE2C55' },
    'Webflow': { Icon: SiWebflow, color: '#4353FF' },
    'DaVinci Resolve': { Icon: SiDavinciresolve, color: '#FF6B35' },
    'Prompt Engineering': { Icon: SiOpenai, color: '#10A37F' },
    'AI API Integration': { Icon: TbApi, color: '#10A37F' },
    'LlamaIndex': { Icon: TbBinaryTree, color: '#6366F1' },
    'Anthropic': { Icon: SiAnthropic, color: '#D4A373' },
    'Claude Code': { Icon: SiClaude, color: '#D97757' },
    'Cursor': { Icon: CursorLogo, color: '#171614' },
    'Codex': { Icon: SiOpenai, color: '#10A37F' },
    'Godot': { Icon: SiGodotengine, color: '#478CBF' },
    'GDScript': { Icon: BsBraces, color: '#478CBF' },
    '2D Game Development': { Icon: FaGamepad, color: '#43A047' },
    'Discord': { Icon: SiDiscord, color: '#5865F2' },
    'Teams': { Icon: TbBrandTeams, color: '#6264A7' },
    'VS Code': { Icon: TbBrandVscode, color: '#007ACC' },
    'Jira': { Icon: SiJira, color: '#0052CC' },
    'Trello': { Icon: SiTrello, color: '#0079BF' },
}

function CursorLogo({ size = 16 }) {
    return (
        <svg className="cursor-logo" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
        </svg>
    )
}

function inkOn(hex) {
    const value = hex.replace('#', '')
    const red = parseInt(value.slice(0, 2), 16)
    const green = parseInt(value.slice(2, 4), 16)
    const blue = parseInt(value.slice(4, 6), 16)
    const luminance = (red * 299 + green * 587 + blue * 114) / 1000
    return luminance > 150 ? '#171614' : '#f4f1ea'
}

function SkillsPage() {
    return (
        <main className="mx-auto flex w-full max-w-3xl flex-col px-4 py-10 sm:px-6 sm:py-14">
            <Link to="/" className="group inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Back to Home</span>
            </Link>
            <p className="mt-6 text-2xl font-light tracking-tight text-gray-900 dark:text-white sm:text-3xl">Full tech stack</p>
            <p className="mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400">The languages, frameworks, and tools I use across the stack.</p>
            <div className="mt-10 space-y-10">
                {fullStack.map(group => (
                    <section key={group.category} className="space-y-4">
                        <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">{group.category}</h2>
                        <div className="skill-grid">
                            {group.items.map(name => {
                                const item = skillMeta[name]
                                if (!item) return null
                                const Icon = item.Icon
                                return (
                                    <div
                                        key={name}
                                        className="skill-tile"
                                        style={{ '--sig': item.color, '--on': inkOn(item.color) }}
                                    >
                                        <Icon size={16} aria-hidden="true" />
                                        <span>{name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                ))}
            </div>
            <SiteFooter />
        </main>
    )
}

export default SkillsPage
