// src/App.jsx
import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ThemeContext } from './context/ThemeContext'
import Header from './components/Header'
import About from './components/About'
import Education from './components/Education'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ChatBot from './components/ChatBot'
import SkillsPage from './pages/SkillsPage'
import ProjectsPage from './pages/ProjectsPage'
import FeelBrightCaseStudy from './pages/casestudies/FeelBrightCaseStudy'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'

// ── Framer Motion scroll-reveal factory ─────────────────────────────────────
// direction: 'left' | 'right' | 'up'
// delay: ms (converted to seconds internally)
const reveal = (direction = 'up', delay = 0) => ({
  initial: {
    opacity: 0,
    x: direction === 'left' ? -32 : direction === 'right' ? 32 : 0,
    y: direction === 'up' ? 24 : 0,
  },
  whileInView: { opacity: 1, x: 0, y: 0 },
  transition: {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1],
    delay: delay / 1000,
  },
  viewport: { once: true, amount: 0.15 },
})

function Home({ animReady }) {
  return (
    <main style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem 1.25rem 4rem',
    }}>
      <Header animReady={animReady} />

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-areas: "about edu" "skills skills" "exp exp";
          gap: 1rem;
          margin-bottom: 1rem;
          align-items: stretch;
        }
        @media (max-width: 767px) {
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-areas: "about" "edu" "skills" "exp";
          }
        }
      `}</style>

      {animReady && (
        <>
          <div className="bento-grid">
            <motion.div style={{ gridArea: 'about', display: 'flex', flexDirection: 'column' }} {...reveal('left')}>
              <About />
            </motion.div>
            <motion.div style={{ gridArea: 'edu', display: 'flex', flexDirection: 'column' }} {...reveal('right')}>
              <Education />
            </motion.div>
            <motion.div style={{ gridArea: 'skills', display: 'flex', flexDirection: 'column' }} {...reveal('up', 80)}>
              <Skills />
            </motion.div>
            <motion.div style={{ gridArea: 'exp', display: 'flex', flexDirection: 'column' }} {...reveal('up', 160)}>
              <Experience />
            </motion.div>
          </div>

          <motion.div {...reveal('up', 220)}><Projects /></motion.div>
          <motion.div {...reveal('up', 280)}><Contact /></motion.div>
          <motion.p
            {...reveal('up', 340)}
            style={{
              textAlign: 'center',
              marginTop: '3rem',
              fontSize: '0.75rem',
              color: 'var(--ink-faint)',
              paddingBottom: '1rem',
            }}
          >
            © 2026 Alfred Miguel De Leon · Pasay City, Philippines
          </motion.p>
        </>
      )}
    </main>
  )
}

function AppRoutes({ theme, toggleTheme }) {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [isInitial, setIsInitial] = useState(true)
  const [animReady, setAnimReady] = useState(false)

  // Startup — scroll to top guaranteed after loading screen clears
  useEffect(() => {
    const tLoad = setTimeout(() => {
      setLoading(false)
      setIsInitial(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 2350)
    const tAnim = setTimeout(() => setAnimReady(true), 2400)
    return () => { clearTimeout(tLoad); clearTimeout(tAnim) }
  }, [])

  // Page transitions — snappier: 600ms instead of 1150ms
  useEffect(() => {
    if (isInitial) return
    setLoading(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {loading && <LoadingScreen instant={!isInitial} />}
      <Routes location={location}>
        <Route path="/" element={<Home animReady={animReady} />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/casestudies/feelbright" element={<FeelBrightCaseStudy />} />
      </Routes>
      <ChatBot />
      <ScrollToTop />
    </ThemeContext.Provider>
  )
}

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    document.documentElement.classList.add('theme-transitioning')
    setTheme(t => t === 'dark' ? 'light' : 'dark')
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 300)
  }

  return <AppRoutes theme={theme} toggleTheme={toggleTheme} />
}

export default App