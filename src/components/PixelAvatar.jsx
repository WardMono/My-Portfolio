import { useEffect, useRef, useState } from 'react'

const GRID = 8
const STAGGER = 0.008
const PIX = 0.26
const TOTAL = (GRID * GRID - 1) * STAGGER + PIX

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

function PixelAvatar({ src, altSrc, alt }) {
    const [time, setTime] = useState(0)
    const timeRef = useRef(0)
    const dirRef = useRef(0)
    const timerRef = useRef(0)
    const lastRef = useRef(0)

    const stop = () => {
        clearTimeout(timerRef.current)
        timerRef.current = 0
        lastRef.current = 0
    }

    useEffect(() => () => stop(), [])

    const frame = () => {
        const now = performance.now()
        if (!lastRef.current) lastRef.current = now
        const dt = Math.min(0.05, (now - lastRef.current) / 1000)
        lastRef.current = now
        const next = clamp(timeRef.current + dirRef.current * dt, 0, TOTAL)
        timeRef.current = next
        setTime(next)
        const ended = (dirRef.current > 0 && next >= TOTAL) || (dirRef.current < 0 && next <= 0)
        if (ended) {
            dirRef.current = 0
            stop()
            return
        }
        timerRef.current = setTimeout(frame, 16)
    }

    const play = (forward) => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduced) {
            const next = forward ? TOTAL : 0
            dirRef.current = 0
            timeRef.current = next
            setTime(next)
            stop()
            return
        }
        if (forward && timeRef.current >= TOTAL) return
        if (!forward && timeRef.current <= 0) return
        dirRef.current = forward ? 1 : -1
        if (!timerRef.current) {
            lastRef.current = performance.now()
            timerRef.current = setTimeout(frame, 16)
        }
    }

    const cells = Array.from({ length: GRID * GRID }, (_, i) => i)
    const size = 100 / GRID

    return (
        <div
            className="pixelated-image-card h-32 w-32 shrink-0 cursor-pointer rounded-full sm:h-40 sm:w-40"
            onMouseEnter={() => play(true)}
            onMouseLeave={() => play(false)}
            onFocus={() => play(true)}
            onBlur={() => play(false)}
            tabIndex={0}
        >
            <div className="pixelated-image-card__default">
                <img src={src} alt={alt} className="h-full w-full object-cover" style={{ objectPosition: 'center' }} />
            </div>
            {time > 0 && (
                <div className="pixelated-image-card__pixels" aria-hidden="true">
                    {cells.map((i) => {
                        const col = i % GRID
                        const row = Math.floor(i / GRID)
                        const local = clamp((time - i * STAGGER) / PIX, 0, 1)
                        return (
                            <div
                                key={i}
                                className="pixelated-image-card__pixel"
                                style={{
                                    width: `${size}%`,
                                    height: `${size}%`,
                                    left: `${col * size}%`,
                                    top: `${row * size}%`,
                                    opacity: local,
                                    transform: `scale(${0.84 + 0.16 * local})`,
                                }}
                            >
                                <img
                                    src={altSrc}
                                    alt=""
                                    style={{
                                        position: 'absolute',
                                        width: `${GRID * 100}%`,
                                        height: `${GRID * 100}%`,
                                        left: `${-col * 100}%`,
                                        top: `${-row * 100}%`,
                                        maxWidth: 'none',
                                        objectFit: 'cover',
                                        objectPosition: 'center top',
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default PixelAvatar
