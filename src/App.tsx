import { useEffect } from 'react'
import { Cursor, Nav, ScrollProgress } from './components/Chrome'
import Hero from './components/Hero'
import Credibility from './components/Credibility'
import Work from './components/Work'
import SystemsStrip from './components/SystemsStrip'
import { About, Contact, EducationLeadership, Experience, Footer, HowIBuild, Skills } from './components/Sections'

/**
 * In-page anchor navigation. Off-screen sections use content-visibility, so their heights are
 * estimates until rendered; smooth-scrolling alone can land short. Re-correct after the scroll settles.
 */
function useAnchorScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
      const id = a?.getAttribute('href')?.slice(1)
      if (!a || !id || e.defaultPrevented || e.metaKey || e.ctrlKey) return
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      history.replaceState(null, '', '#' + id)
      for (const ms of [700, 1400]) {
        setTimeout(() => {
          const target = document.getElementById(id)
          if (!target) return
          const top = target.getBoundingClientRect().top
          const want = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
          const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
          if (Math.abs(top - Math.max(want, pad)) > 6) target.scrollIntoView({ behavior: 'auto', block: 'start' })
        }, ms)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}

export default function App() {
  useAnchorScroll()
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[90] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Credibility />
        <SystemsStrip />
        <Work />
        <HowIBuild />
        <About />
        <Experience />
        <EducationLeadership />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
