// src/components/LoadingScreen.jsx
import { useEffect, useState } from 'react'

export default function LoadingScreen({ instant = false }) {
    const [fading, setFading] = useState(false)

    useEffect(() => {
        const delay = instant ? 600 : 1800
        const t = setTimeout(() => setFading(true), delay)
        return () => clearTimeout(t)
    }, [instant])

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.55s ease',
            pointerEvents: fading ? 'none' : 'all',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                {[0, 1, 2].map(i => (
                    <div
                        key={i}
                        style={{
                            width: 11,
                            height: 11,
                            borderRadius: '50%',
                            background: 'var(--ink)',
                            animation: `ls-wave 1.35s cubic-bezier(0.45, 0, 0.55, 1) ${i * 0.18}s infinite`,
                        }}
                    />
                ))}
            </div>

            <style>{`
        @keyframes ls-wave {
          0%,  100% { transform: translateY(0px);    opacity: 1;   }
          30%        { transform: translateY(-18px);  opacity: 0.9; }
          55%        { transform: translateY(0px);    opacity: 1;   }
          75%        { transform: translateY(5px);    opacity: 0.7; }
        }
      `}</style>
        </div>
    )
}