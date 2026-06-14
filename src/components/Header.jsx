// src/components/Header.jsx
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import profile from '../assets/Profile.jpg'
import nagi from '../assets/nagi.jpg'

function Header({ animReady }) {
    const [flipped, setFlipped] = useState(false)
    const { theme, toggleTheme } = useTheme()

    return (
        <>
            <style>{`
            .header-card {
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: stretch;
                margin-bottom: 1rem;
                background: var(--card-bg);
                border-radius: var(--radius);
                overflow: hidden;
            }
            .header-photo-wrap {
                width: 200px;
                height: 200px;
                flex-shrink: 0;
                padding: 1rem;
            }
            .header-info {
                flex: 1;
                padding: 1rem;
                padding-right: 3.25rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
            }
            .header-title-row {
                font-size: 0.82rem;
                color: var(--ink);
                text-transform: uppercase;
                margin-bottom: 1.25rem;
                font-weight: 700;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
            .header-toggle {
                position: absolute;
                top: 0.85rem;
                right: 0.85rem;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: var(--tag-bg);
                border: 1px solid var(--card-border);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--ink-muted);
                z-index: 1;
                transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
                font-family: inherit;
            }
            @media (max-width: 767px) {
                .header-card {
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
                .header-photo-wrap {
                    width: 120px;
                    height: 120px;
                    padding: 1rem 1rem 0.5rem;
                }
                .header-info {
                    padding: 0.5rem 1rem 1rem;
                    padding-right: 1rem;
                    align-items: center;
                }
                .header-title-row {
                    justify-content: center;
                }
                .header-toggle {
                    width: 44px;
                    height: 44px;
                }
            }
        `}</style>

            <div
                className={`header-card${animReady ? ' anim-fade' : ''}`}
                style={{ opacity: animReady ? undefined : 0 }}
            >
                {/* ── Theme toggle ── */}
                <button
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    className="header-toggle"
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--tag-hover)'
                        e.currentTarget.style.color = 'var(--ink)'
                        e.currentTarget.style.borderColor = 'var(--ink-faint)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'var(--tag-bg)'
                        e.currentTarget.style.color = 'var(--ink-muted)'
                        e.currentTarget.style.borderColor = 'var(--card-border)'
                    }}
                >
                    {theme === 'dark' ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    ) : (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                </button>

                {/* ── Photo ── */}
                <div className="header-photo-wrap">
                    <div
                        onMouseEnter={() => setFlipped(true)}
                        onMouseLeave={() => setFlipped(false)}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            cursor: 'default',
                        }}
                    >
                        <img
                            src={profile}
                            alt="Alfred Miguel De Leon"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'top center',
                                borderRadius: '10px',
                                transition: 'opacity 0.4s ease',
                                opacity: flipped ? 0 : 1,
                            }}
                        />
                        <img
                            src={nagi}
                            alt="Nagi"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'top center',
                                borderRadius: '10px',
                                transition: 'opacity 0.4s ease',
                                opacity: flipped ? 1 : 0,
                            }}
                        />
                    </div>
                </div>

                {/* ── Info ── */}
                <div className="header-info">
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.3rem',
                    }}>
                        <h1 style={{
                            fontSize: '1.85rem',
                            fontWeight: 800,
                            lineHeight: 1.15,
                            letterSpacing: '-0.5px',
                            color: 'var(--ink)',
                            margin: 0,
                        }}>
                            Alfred Miguel De Leon
                        </h1>
                        <svg width="20" height="20" viewBox="0 0 24 24"
                            fill="none" xmlns="http://www.w3.org/2000/svg"
                            style={{ flexShrink: 0, marginTop: '2px' }}>
                            <circle cx="12" cy="12" r="12" fill="#1D9BF0" />
                            <path d="M6.5 12.5L10 16L17.5 8.5"
                                stroke="white" strokeWidth="2.2"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div style={{
                        fontSize: '0.82rem',
                        color: 'var(--ink-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        marginBottom: '0.75rem',
                        fontWeight: 500,
                    }}>
                        <svg width="12" height="12" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        Pasay City, Metro Manila, Philippines
                    </div>

                    <p className="header-title-row">
                        <span>Web Developer</span>
                        <span style={{ fontWeight: 700 }}>|</span>
                        <span>UI/UX</span>
                        <span style={{ fontWeight: 700 }}>|</span>
                        <span>Software Development</span>
                    </p>

                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <a
                            href="https://mail.google.com/mail/?view=cm&to=Deleonalfredmiguel@gmail.com&su=Reaching%20Out%20%E2%80%94%20Let%27s%20Connect&body=Hi%20Alfred%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out.%0A%0A"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                background: 'var(--ink)',
                                color: 'var(--bg)',
                                border: '1px solid var(--ink)',
                                textDecoration: 'none',
                                transition: 'opacity 0.2s',
                                fontFamily: 'inherit',
                            }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            Send Email
                        </a>

                        <a
                            href="/Alfred_Miguel_De_Leon_Resume.pdf"
                            download="Alfred_Miguel_De_Leon_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                background: 'transparent',
                                color: 'var(--ink)',
                                border: '1px solid var(--card-border)',
                                textDecoration: 'none',
                                transition: 'all 0.2s',
                                fontFamily: 'inherit',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'var(--tag-bg)'
                                e.currentTarget.style.borderColor = 'var(--ink-faint)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.borderColor = 'var(--card-border)'
                            }}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download CV
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header