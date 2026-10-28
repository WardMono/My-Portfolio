import { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeContext } from './context/ThemeContext'
import Header from './components/Header'
import Education from './components/Education'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ChatBot from './components/ChatBot'
import SiteFooter from './components/SiteFooter'
import SkillsPage from './pages/SkillsPage'
import ProjectsPage from './pages/ProjectsPage'
import ExperiencePage from './pages/ExperiencePage'
import FeelBrightCaseStudy from './pages/casestudies/FeelBrightCaseStudy'
import ScrollToTop from './components/ScrollToTop'

const links = [
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
]

function SiteNav({ theme, toggleTheme }) {
  return (
    <header className="site-bar">
      <nav className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="text-sm font-bold" style={{ color: 'var(--ink)' }}>AMD</Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-3 sm:gap-4">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link whitespace-nowrap text-xs sm:text-sm ${isActive ? 'is-active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="nav-rule" />
          <button
            type="button"
            role="switch"
            aria-checked={theme === 'dark'}
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'}`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'}`}
            className={`theme-btn${theme === 'dark' ? ' is-on' : ''}`}
          />
        </div>
      </nav>
    </header>
  )
}

function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-14 px-4 pb-10 sm:gap-16 sm:px-6 sm:pb-16">
      <Header />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <SiteFooter />
    </main>
  )
}

function AppRoutes({ theme, toggleTheme }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <SiteNav theme={theme} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/casestudies/feelbright" element={<FeelBrightCaseStudy />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
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
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = (event) => {
    const apply = () => {
      let next = 'light'
      flushSync(() => {
        setTheme(t => {
          next = t === 'dark' ? 'light' : 'dark'
          return next
        })
      })
      document.documentElement.setAttribute('data-theme', next)
      document.documentElement.classList.toggle('dark', next === 'dark')
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      apply()
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    ) + 8
    const oldColor = getComputedStyle(document.body).backgroundColor
    const mask = `radial-gradient(circle at ${x}px ${y}px, transparent var(--theme-hole), #000 calc(var(--theme-hole) + 1px))`
    const cover = document.createElement('div')
    cover.setAttribute('aria-hidden', 'true')
    cover.style.position = 'fixed'
    cover.style.inset = '0'
    cover.style.zIndex = '80'
    cover.style.pointerEvents = 'none'
    cover.style.background = oldColor
    cover.style.setProperty('--theme-hole', '0px')
    cover.style.maskImage = mask
    cover.style.webkitMaskImage = mask
    document.body.appendChild(cover)
    apply()
    const anim = cover.animate(
      [{ '--theme-hole': '0px' }, { '--theme-hole': `${radius}px` }],
      { duration: 900, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }
    )
    const done = () => {
      if (cover.isConnected) cover.remove()
    }
    anim.onfinish = done
    setTimeout(done, 1100)
  }

  return <AppRoutes theme={theme} toggleTheme={toggleTheme} />
}

export default App
