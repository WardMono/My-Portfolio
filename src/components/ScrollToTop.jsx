// src/components/ScrollToTop.jsx
import { useState, useEffect } from 'react'

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            style={{
                position: 'fixed',
                bottom: 'calc(1.25rem + 50px + 0.65rem)',
                right: '1.25rem',
                width: 50, height: 50, borderRadius: '50%',
                background: 'var(--ink)',
                color: 'var(--bg)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
                zIndex: 1000,
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? 'auto' : 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.3s ease',
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 15l-6-6-6 6" />
            </svg>
        </button>
    )
}