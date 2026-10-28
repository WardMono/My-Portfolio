import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ink = '#161616'
const paper = '#f3f3f1'

const characters = [
    { id: 'isagi', name: 'Yoichi Isagi' },
    { id: 'bachira', name: 'Meguru Bachira' },
    { id: 'chigiri', name: 'Hyoma Chigiri' },
    { id: 'nagi', name: 'Seishiro Nagi' },
    { id: 'barou', name: 'Shoei Barou' },
    { id: 'rin', name: 'Rin Itoshi' },
]

const visitorPhotos = Object.entries(
    import.meta.glob('../assets/visitors/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' })
).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))

function BlueLockIcon({ id }) {
    if (id === 'isagi') {
        return (
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <rect width="64" height="64" fill={paper} />
                <path d="M12 34c2-18 10-26 20-26 8 0 16 6 18 18 2 2 6-6 10-4-2 8-4 14-8 16-2-6-6-10-10-8-2 6-8 8-12 4-4 4-10 2-14 0-2-2-6 2-4 0z" fill={ink} />
                <path d="M40 8c2-6 8-6 8 0-2 2-6 2-8 0z" fill={ink} />
                <ellipse cx="32" cy="38" rx="12" ry="13" fill={paper} />
                <path d="M18 36c2-8 8-12 14-12s12 4 14 12c-4-4-8-6-14-6s-10 2-14 6z" fill={ink} />
                <path d="M22 34c4-2 8-1 10 2" fill={ink} />
                <path d="M24.5 37.5h5M36 37.5h5" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
                <path d="M29 46c1.4 1.2 3.2 1.2 4.6 0" stroke={ink} strokeWidth="1.3" fill="none" strokeLinecap="round" />
            </svg>
        )
    }

    if (id === 'bachira') {
        return (
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <rect width="64" height="64" fill={paper} />
                <path d="M14 40c0-18 8-28 18-28s18 10 18 28c-2 8-6 6-8 2V36c0-6-4-10-10-10s-10 4-10 10v6c-2 4-6 6-8 2z" fill={ink} />
                <ellipse cx="32" cy="38" rx="11" ry="12.5" fill={paper} />
                <path d="M20 34c2-10 7-16 12-16s10 6 12 16c-3-5-7-7-12-7s-9 2-12 7z" fill={ink} />
                <path d="M22 30c6 3 14 3 20 0" stroke={ink} strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <circle cx="26.5" cy="38" r="2.1" fill={ink} />
                <circle cx="37.5" cy="38" r="2.1" fill={ink} />
                <circle cx="27.1" cy="37.3" r="0.7" fill={paper} />
                <circle cx="38.1" cy="37.3" r="0.7" fill={paper} />
                <path d="M28 46c1.6 2 4.4 2.4 6.4.4" stroke={ink} strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </svg>
        )
    }

    if (id === 'chigiri') {
        return (
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <rect width="64" height="64" fill={paper} />
                <path d="M16 28c1-16 10-22 18-20 10 2 16 12 14 26-8 20-6 30-2 30-6-8-4-18-6-24-2 16-2 26 2 30-8-2-14-10-16-22-4 8-8 16-12 16 2-12 4-24 2-36z" fill={ink} />
                <ellipse cx="30" cy="36" rx="11" ry="12" fill={paper} />
                <path d="M18 32c2-12 8-18 14-18 4 0 8 3 10 8-6 1-10 6-10 12 0 2-2 6-6 6-4-2-8-2-8-8z" fill={ink} />
                <path d="M34 22c6 2 10 10 8 20" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M22 36.5h4.5M33 36.5h4.2" stroke={ink} strokeWidth="1.7" strokeLinecap="round" />
                <path d="M26 45h6" stroke={ink} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        )
    }

    if (id === 'nagi') {
        return (
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <rect width="64" height="64" fill={ink} />
                <path d="M24 62c1-8 4.5-12 8-12s7 4 8 12" fill={paper} />
                <ellipse cx="32" cy="40" rx="11" ry="12" fill={paper} />
                <path d="M14 30c2-8 8-14 14-12 2-8 8-12 14-8 8 2 12 10 10 18 4 2 6 8 2 12-6-2-8-8-10-8-2 6-8 8-14 6-6 2-12-2-14-8-2 2-6 2-2 0z" fill={paper} stroke={ink} strokeWidth="1.2" />
                <path d="M24 38c1.2 1.4 3 .6 3.2-.8M37 38c1.2 1.4 3 .6 3.2-.8" stroke={ink} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M28 46h8" stroke={ink} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        )
    }

    if (id === 'barou') {
        return (
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <rect width="64" height="64" fill={paper} />
                <path d="M32 2l6 12 4-8 6 14 2-8 8 16-6 4c-2-8-6-10-10-8l2 8c-4-2-8-2-12 0l2-8c-4-2-8 0-10 8l-6-4 8-16 2 8 6-14 4 8z" fill={ink} />
                <ellipse cx="32" cy="40" rx="12" ry="12" fill={paper} />
                <path d="M20 36c2-8 7-12 12-12s10 4 12 12c-4-3-8-4-12-4s-8 1-12 4z" fill={ink} />
                <path d="M22 34c4 2 6 2 8 0M34 34c2 2 4 2 8 0" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M24 40h5M36 40h5" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
                <path d="M27 47c2 1.6 6 1.6 8-1" stroke={ink} strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </svg>
        )
    }

    if (id === 'rin') {
        return (
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <rect width="64" height="64" fill={paper} />
                <path d="M12 26c4-14 12-20 20-20s16 6 20 20c-2 16-4 28-8 36-2-10-4-16-6-16V30c0 12-2 22-6 28-4-6-6-16-6-28v16c-2 0-4 6-6 16-4-8-6-20-8-36z" fill={ink} />
                <ellipse cx="32" cy="38" rx="10" ry="12" fill={paper} />
                <path d="M22 34c2-12 6-16 10-16s8 4 10 16c-2-6-6-8-10-8s-8 2-10 8z" fill={ink} />
                <path d="M28 18c1 10 1 16 0 22M36 18c-1 10-1 16 0 22" stroke={ink} strokeWidth="2.4" fill="none" />
                <path d="M24 38h4.2M36 38h4.2" stroke={ink} strokeWidth="1.7" strokeLinecap="round" />
                <path d="M29 47h6" stroke={ink} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        )
    }

    return null
}

function sessionId() {
    const key = 'portfolio-view-session'
    const existing = sessionStorage.getItem(key)
    if (existing) return existing
    const next = crypto.randomUUID()
    sessionStorage.setItem(key, next)
    return next
}

function VisitedBy() {
    const location = useLocation()
    const [views, setViews] = useState(null)
    const [live, setLive] = useState(null)

    useEffect(() => {
        let stop = false
        const ping = async () => {
            try {
                const res = await fetch('/api/views', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionId: sessionId(), path: location.pathname }),
                })
                if (!res.ok) return
                const data = await res.json()
                if (stop) return
                setViews(data.views)
                setLive(data.live)
            } catch {
                // The count stays quiet if the view endpoint is unavailable.
            }
        }

        ping()
        const timer = setInterval(ping, 12000)
        return () => {
            stop = true
            clearInterval(timer)
        }
    }, [location.pathname])

    return (
        <div className="visited-by">
            <div className="visited-by-head">
                <span className="visited-by-label">Visited by</span>
                <p className="visited-stats">
                    <span><strong>{views === null ? '—' : views.toLocaleString()}</strong> views</span>
                    <span className="visited-live"><i />{live === null ? '—' : live} viewing</span>
                </p>
            </div>
            <div className="visited-by-row">
                {Array.from({ length: 6 }, (_, index) => {
                    const photo = visitorPhotos[index]
                    const person = characters[index]
                    const file = photo ? photo[0].split('/').pop() : ''
                    const name = photo ? file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') : person.name
                    return (
                        <span
                            key={photo ? file : person.id}
                            className="visited-face"
                            title={name}
                            style={{ zIndex: 6 - index }}
                        >
                            {photo ? <img src={photo[1]} alt="" /> : <BlueLockIcon id={person.id} />}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export default VisitedBy
