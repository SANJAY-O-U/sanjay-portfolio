import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { site } from '../data/site'
import { Magnetic } from './ui'

/* ---------- Scroll progress ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent"
    />
  )
}

/* ---------- Cursor glow (desktop, fine pointer only) ---------- */
export function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hot, setHot] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.35 })

  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as HTMLElement | null
      setHot(!!t?.closest('a, button, [role="tab"], summary'))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reduce, x, y])

  if (!enabled) return null
  return (
    <m.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[80]"
    >
      <m.div
        animate={{ scale: hot ? 1.9 : 1, opacity: hot ? 0.9 : 0.55 }}
        transition={{ duration: 0.2 }}
        className="-ml-[14px] -mt-[14px] h-7 w-7 rounded-full border border-accent/70"
        style={{ boxShadow: '0 0 24px rgb(var(--accent) / 0.25)' }}
      />
    </m.div>
  )
}

/* ---------- Active section ---------- */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    let raf = 0
    const compute = () => {
      raf = 0
      const line = window.innerHeight * 0.4
      let cur = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) cur = id
      }
      setActive(cur)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ids])
  return active
}

const ids = site.nav.map((n) => n.id)

/* ---------- Nav ---------- */
export function Nav() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? 'border-b border-white/[0.07] bg-bg/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="shell flex h-16 items-center justify-between">
        <a href="#top" className="inline-flex min-h-[44px] items-center font-bold tracking-[-0.04em] text-ink" aria-label="Sanjay — back to top">
          SANJAY<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {site.nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? 'location' : undefined}
                className={`relative py-1 text-sm transition-colors duration-200 ${
                  active === n.id ? 'text-ink' : 'text-mute hover:text-ink'
                }`}
              >
                {n.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                    active === n.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Magnetic strength={0.2}>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium transition-colors hover:border-accent/60 hover:text-accent"
              >
                Let&apos;s Talk <span aria-hidden="true">↗</span>
              </a>
            </Magnetic>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            ref={btnRef}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="shell flex flex-col pt-6">
              {site.nav.map((n, i) => (
                <m.li
                  key={n.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="border-b border-white/[0.07]"
                >
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5 text-3xl font-semibold tracking-tight"
                  >
                    {n.label}
                    <span className="font-mono text-xs text-dim">0{i + 1}</span>
                  </a>
                </m.li>
              ))}
              <li className="pt-8">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 font-medium text-bg"
                >
                  Let&apos;s Talk <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
