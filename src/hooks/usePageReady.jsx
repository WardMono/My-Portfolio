// src/hooks/usePageReady.jsx
import { useState, useEffect } from 'react'

export function usePageReady(delay = 650) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setReady(true), delay)
        return () => clearTimeout(t)
    }, [delay])

    return ready
}