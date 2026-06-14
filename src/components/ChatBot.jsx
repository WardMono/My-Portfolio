// src/components/ChatBot.jsx
import { useState, useRef, useEffect } from 'react'

const SERVER_URL = '/api'
const STORAGE_KEY = 'portfolio-chat'
const EXPIRY_HOURS = 24

const SESSION_ID = (() => {
    let id = localStorage.getItem('portfolio-session')
    if (!id) { id = crypto.randomUUID(); localStorage.setItem('portfolio-session', id) }
    return id
})()

const BLOCKED_PATTERNS = [
    /act as/i,
    /pretend you are/i,
    /you are now/i,
    /ignore previous/i,
    /as an expert/i,
    /generate.*prompt/i,
    /write.*code/i,
    /create.*list/i,
    /design.*prompt/i,
    /stress.test/i,
    /jailbreak/i,
    /bypass/i,
    /override/i,
    /forget your instructions/i,
    /new persona/i,
    /roleplay as/i,
]

const INITIAL_MSG = {
    role: 'assistant',
    content: "Hey there! 👋 I'm Alfred. Thanks for checking out my portfolio! Feel free to ask about my projects, the tools I use, or how the gym keeps me sane as a dev. How can I help you today?",
    timestamp: Date.now(),
}

const QUICK_QUESTIONS = [
    'Who are you?',
    'What are your top skills?',
    'What projects have you built?',
    'Are you available for hire?',
]

// ── localStorage helpers ──────────────────────────────────────────────────────

function loadMessages() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return { messages: [INITIAL_MSG], savedAt: Date.now() }
        const { messages, savedAt } = JSON.parse(raw)
        const ageHours = (Date.now() - savedAt) / 1000 / 60 / 60
        if (ageHours >= EXPIRY_HOURS) {
            return { messages: [INITIAL_MSG], savedAt: Date.now(), expired: true, oldMessages: messages, oldSavedAt: savedAt }
        }
        return { messages: messages?.length ? messages : [INITIAL_MSG], savedAt }
    } catch {
        return { messages: [INITIAL_MSG], savedAt: Date.now() }
    }
}

function saveMessages(messages, savedAt) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, savedAt }))
    } catch {
        // quota exceeded or private mode — fail silently
    }
}

// ── Send daily report to backend ─────────────────────────────────────────────

async function sendDailyReport(messages, savedAt) {
    if (!messages || messages.length <= 1) return
    try {
        await fetch(`${SERVER_URL}/report`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages,
                startedAt: savedAt,
                endedAt: Date.now(),
                sessionId: SESSION_ID,
            }),
        })
    } catch {
        // fail silently
    }
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ChatBot() {
    const [open, setOpen] = useState(false)
    const [showBadge, setShowBadge] = useState(true)
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth < 520 : false
    )

    const [savedAt] = useState(() => {
        const loaded = loadMessages()
        // If expired, send report before resetting
        if (loaded.expired) {
            sendDailyReport(loaded.oldMessages, loaded.oldSavedAt)
            localStorage.removeItem(STORAGE_KEY)
        }
        return loaded.savedAt
    })

    const [msgs, setMsgs] = useState(() => {
        const loaded = loadMessages()
        return loaded.messages
    })

    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [showScroll, setShowScroll] = useState(false)
    const bottomRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        saveMessages(msgs, savedAt)
    }, [msgs, savedAt])

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 520)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [msgs, loading])

    useEffect(() => {
        if (open) {
            setShowBadge(false)
            setTimeout(() => inputRef.current?.focus(), 200)
        }
    }, [open])

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    const send = async (text) => {
        const content = text ?? input.trim()
        if (!content || loading) return
        setInput('')

        const userMsg = { role: 'user', content, timestamp: Date.now() }
        const next = [...msgs, userMsg]
        setMsgs(next)
        setLoading(true)

        const isBlocked = BLOCKED_PATTERNS.some(pattern => pattern.test(content))
        if (isBlocked) {
            setMsgs([...next, {
                role: 'assistant',
                content: "Haha nice try though 😄 — I'm just here to talk about my work, the projects I've built, the tools I use, and my journey as a dev. Anything you want to know about those?",
                timestamp: Date.now(),
            }])
            setLoading(false)
            return
        }

        const history = next.slice(1).map(({ role, content }) => ({
            role: role === 'assistant' ? 'assistant' : 'user',
            content,
        }))

        try {
            const res = await fetch(`${SERVER_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: content,
                    history,
                }),
            })

            if (res.status === 429) {
                setMsgs([...next, {
                    role: 'assistant',
                    content: "I'm receiving too many messages at the moment — please give it a second and try again.",
                    timestamp: Date.now(),
                }])
                setLoading(false)
                return
            }

            if (!res.ok) {
                setMsgs([...next, {
                    role: 'assistant',
                    content: "Something went wrong on my end — please try again in a moment.",
                    timestamp: Date.now(),
                }])
                setLoading(false)
                return
            }

            const data = await res.json()
            const reply = data.reply ?? "I'm having trouble connecting right now. Feel free to reach out at Deleonalfredmiguel@gmail.com instead."
            setMsgs([...next, { role: 'assistant', content: reply, timestamp: Date.now() }])
        } catch {
            setMsgs([...next, {
                role: 'assistant',
                content: "Network error — check your connection or email me at Deleonalfredmiguel@gmail.com.",
                timestamp: Date.now(),
            }])
        } finally {
            setLoading(false)
        }
    }

    const isFirstMsg = msgs.length === 1

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
        setShowScroll(scrollHeight - scrollTop - clientHeight > 80)
    }

    const panelBottom = isMobile ? 'calc(1.25rem + 58px)' : '1.25rem'
    const panelRight = isMobile ? '1.25rem' : 'calc(1.25rem + 50px + 0.75rem)'

    const chipStyle = {
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 8,
        padding: '0.48rem 0.75rem',
        fontSize: '0.74rem',
        fontWeight: 500,
        color: 'var(--ink-muted)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.15s',
        fontFamily: 'inherit',
    }
    const chipHoverOn = e => {
        e.currentTarget.style.background = 'var(--tag-bg)'
        e.currentTarget.style.color = 'var(--ink)'
        e.currentTarget.style.borderColor = 'var(--card-border-hover)'
    }
    const chipHoverOff = e => {
        e.currentTarget.style.background = 'var(--card-bg)'
        e.currentTarget.style.color = 'var(--ink-muted)'
        e.currentTarget.style.borderColor = 'var(--card-border)'
    }

    return (
        <>
            {/* ── CHAT PANEL ── */}
            {open && (
                <div style={{
                    position: 'fixed',
                    bottom: panelBottom,
                    right: panelRight,
                    width: 'min(340px, calc(100vw - 2.5rem))',
                    height: '500px',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 16px 56px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.05)',
                    display: 'flex', flexDirection: 'column',
                    zIndex: 900, overflow: 'hidden',
                    animation: 'cbSlideUp 0.25s cubic-bezier(.22,.68,0,1.18)',
                }}>

                    {/* Header */}
                    <div style={{
                        padding: '0.9rem 1rem',
                        borderBottom: '1px solid var(--card-border)',
                        display: 'flex', alignItems: 'center',
                        gap: '0.7rem', flexShrink: 0,
                    }}>
                        <div style={{
                            position: 'relative', flexShrink: 0,
                            width: 38, height: 38,
                        }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: '50%',
                                overflow: 'hidden',
                                border: '1px solid var(--card-border)',
                            }}>
                                <img
                                    src={new URL('../assets/Profile.jpg', import.meta.url).href}
                                    alt="Alfred"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                            </div>
                            <span style={{
                                position: 'absolute', bottom: 1, right: 1,
                                width: 9, height: 9, borderRadius: '50%',
                                background: '#4ade80',
                                border: '2px solid var(--card-bg)',
                                boxShadow: '0 0 0 1px rgba(74,222,128,0.3)',
                            }} />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>
                                Alfred Miguel De Leon
                            </p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--ink-faint)', marginTop: 2 }}>
                                Online
                            </p>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close chat"
                            style={{
                                width: 28, height: 28, borderRadius: '50%',
                                border: '1px solid var(--card-border)',
                                background: 'transparent', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--ink-faint)', fontSize: '0.85rem',
                                transition: 'all 0.15s', flexShrink: 0, fontFamily: 'inherit',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'var(--ink)'
                                e.currentTarget.style.color = 'var(--bg)'
                                e.currentTarget.style.borderColor = 'var(--ink)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.color = 'var(--ink-faint)'
                                e.currentTarget.style.borderColor = 'var(--card-border)'
                            }}
                        >✕</button>
                    </div>

                    {/* Messages */}
                    <div
                        onScroll={handleScroll}
                        style={{
                            flex: 1, overflowY: 'auto', padding: '0.9rem',
                            display: 'flex', flexDirection: 'column', gap: '0.65rem',
                            scrollbarWidth: 'thin', scrollbarColor: 'var(--card-border) transparent',
                        }}>
                        {msgs.map((m, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                                animation: 'cbFadeIn 0.18s ease',
                            }}>
                                <div style={{
                                    maxWidth: '82%',
                                    padding: '0.62rem 0.88rem',
                                    borderRadius: m.role === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                                    background: m.role === 'user' ? 'var(--ink)' : 'var(--msg-bg)',
                                    color: m.role === 'user' ? 'var(--bg)' : 'var(--ink)',
                                    fontSize: '0.81rem', lineHeight: 1.62, wordBreak: 'break-word',
                                }}>
                                    {m.content}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {loading && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <div style={{
                                    padding: '0.65rem 0.9rem',
                                    borderRadius: '12px 12px 12px 3px',
                                    background: 'var(--msg-bg)',
                                    display: 'flex', gap: 4, alignItems: 'center',
                                }}>
                                    {[0, 1, 2].map(i => (
                                        <div key={i} style={{
                                            width: 6, height: 6, borderRadius: '50%',
                                            background: 'var(--ink-faint)',
                                            animation: `cbBounce 1.1s ease infinite`,
                                            animationDelay: `${i * 0.16}s`,
                                        }} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quick question chips — first message only */}
                        {isFirstMsg && !loading && (
                            <div style={{
                                display: 'flex', flexDirection: 'column', gap: '0.35rem',
                                marginTop: '0.15rem', animation: 'cbFadeIn 0.28s ease',
                            }}>
                                {QUICK_QUESTIONS.map(q => (
                                    <button
                                        key={q}
                                        onClick={() => send(q)}
                                        style={chipStyle}
                                        onMouseEnter={chipHoverOn}
                                        onMouseLeave={chipHoverOff}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {showScroll && (
                            <button
                                onClick={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                style={{
                                    position: 'sticky', bottom: 8,
                                    alignSelf: 'center',
                                    width: 28, height: 28, borderRadius: '50%',
                                    background: 'var(--ink)', color: 'var(--bg)',
                                    border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                    zIndex: 10, flexShrink: 0,
                                    transition: 'transform 0.15s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 5v14M5 12l7 7 7-7" />
                                </svg>
                            </button>
                        )}

                        <div ref={bottomRef} />
                    </div>

                    {/* Input row */}
                    <div style={{
                        padding: '0.7rem',
                        borderTop: '1px solid var(--card-border)',
                        display: 'flex', gap: '0.45rem',
                        flexShrink: 0, background: 'var(--card-bg)',
                    }}>
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
                            }}
                            placeholder="Ask me anything…"
                            disabled={loading}
                            style={{
                                flex: 1, minWidth: 0,
                                padding: '0.58rem 0.85rem',
                                borderRadius: 8,
                                border: '1px solid var(--card-border)',
                                background: 'var(--input-bg)',
                                fontSize: '0.8rem', color: 'var(--ink)',
                                outline: 'none', fontFamily: 'inherit',
                                transition: 'border-color 0.15s',
                            }}
                            onFocus={e => e.target.style.borderColor = 'var(--card-border-focus)'}
                            onBlur={e => e.target.style.borderColor = 'var(--card-border)'}
                        />
                        <button
                            onClick={() => send()}
                            disabled={loading || !input.trim()}
                            aria-label="Send message"
                            style={{
                                width: 36, height: 36, borderRadius: 8,
                                background: input.trim() && !loading ? 'var(--ink)' : 'var(--btn-disabled-bg)',
                                border: 'none',
                                cursor: input.trim() && !loading ? 'pointer' : 'default',
                                color: input.trim() && !loading ? 'var(--bg)' : 'var(--ink-faint)',
                                transition: 'all 0.15s',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                            }}
                            onMouseEnter={e => {
                                if (input.trim() && !loading)
                                    e.currentTarget.style.background = 'var(--ink-light)'
                            }}
                            onMouseLeave={e => {
                                if (input.trim() && !loading)
                                    e.currentTarget.style.background = 'var(--ink)'
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* ── FLOATING TOGGLE BUTTON ── */}
            <button
                onClick={() => setOpen(o => !o)}
                aria-label="Toggle portfolio chat"
                style={{
                    position: 'fixed',
                    bottom: '1.25rem', right: '1.25rem',
                    width: 50, height: 50, borderRadius: '50%',
                    background: 'var(--ink)',
                    color: 'var(--bg)',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
                    zIndex: 1000,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.08)'
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.24)'
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.18)'
                }}
            >
                {open ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                )}
                {showBadge && !open && (
                    <span style={{
                        position: 'absolute', top: 1, right: 1,
                        width: 11, height: 11, borderRadius: '50%',
                        background: '#f43f5e', border: '2px solid white',
                        pointerEvents: 'none',
                    }} />
                )}
            </button>

            <style>{`
                @keyframes cbSlideUp {
                    from { opacity: 0; transform: translateY(16px) scale(0.96); }
                    to   { opacity: 1; transform: translateY(0)  scale(1);    }
                }
                @keyframes cbBounce {
                    0%, 60%, 100% { transform: translateY(0);   opacity: 0.4; }
                    30%           { transform: translateY(-5px); opacity: 1;   }
                }
                @keyframes cbFadeIn {
                    from { opacity: 0; transform: translateY(4px); }
                    to   { opacity: 1; transform: translateY(0);   }
                }
            `}</style>
        </>
    )
}