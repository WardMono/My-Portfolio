import { useEffect, useRef, useState } from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'

const MAIL = 'mailto:Deleonalfredmiguel@gmail.com?subject=A%20project%20in%20mind'
const LINKEDIN = 'https://www.linkedin.com/in/alfred-de-leon-b9b466278/'

function WorkLifeIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="7" width="18" height="13" rx="2.5" />
            <path d="M8 7V5.8A1.8 1.8 0 0 1 9.8 4h4.4A1.8 1.8 0 0 1 16 5.8V7" />
            <path d="M3 12.5h18" />
        </svg>
    )
}

export default function ChatBot() {
    const [open, setOpen] = useState(false)
    const dockRef = useRef(null)

    useEffect(() => {
        if (!open) return undefined
        const close = (event) => {
            if (!dockRef.current?.contains(event.target)) setOpen(false)
        }
        const onKey = (event) => {
            if (event.key === 'Escape') setOpen(false)
        }
        document.addEventListener('pointerdown', close)
        window.addEventListener('scroll', close, { passive: true })
        window.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('pointerdown', close)
            window.removeEventListener('scroll', close)
            window.removeEventListener('keydown', onKey)
        }
    }, [open])

    return (
        <div className="work-fred-dock" ref={dockRef}>
            {open && (
                <div className="work-fred-panel" role="dialog" aria-label="Work with Fred">
                    <p className="work-fred-kicker">Work with Fred</p>
                    <p className="work-fred-lead">Have a project in mind? Let&apos;s connect.</p>
                    <div className="work-fred-actions">
                        <a className="work-fred-link" href={MAIL} style={{ '--sig': '#EA4335' }}>
                            <SiGmail size={15} aria-hidden="true" />
                            <span>Send an email</span>
                        </a>
                        <a className="work-fred-link" href={LINKEDIN} target="_blank" rel="noreferrer" style={{ '--sig': '#0A66C2' }}>
                            <FaLinkedin size={15} aria-hidden="true" />
                            <span>Connect on LinkedIn</span>
                        </a>
                    </div>
                </div>
            )}
            <button
                type="button"
                className="work-fred"
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
            >
                <WorkLifeIcon />
                <span>Work with Fred</span>
            </button>
        </div>
    )
}
