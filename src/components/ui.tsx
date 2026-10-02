import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { animate, m, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/* ---------- Reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  className = '',
  y = 18,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}

/* ---------- Magnetic wrapper ---------- */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <m.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </m.div>
  )
}

/* ---------- Counter ---------- */
export function Counter({
  to,
  decimals = 0,
  suffix = '',
  duration = 1.4,
}: {
  to: number
  decimals?: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const format = (v: number) => v.toFixed(decimals) + suffix

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (reduce) {
      el.textContent = format(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = format(v)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, to])

  return (
    <span ref={ref} className="tabular-nums">
      {format(to)}
    </span>
  )
}

/* ---------- Cycle: advances an index while `active` ---------- */
export function useCycle(length: number, active: boolean, ms = 1300) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!active || reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % length), ms)
    return () => clearInterval(t)
  }, [active, reduce, length, ms])
  return [i, setI] as const
}

/* ---------- Links / buttons ---------- */
type ActionProps = {
  href?: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Shown as a tooltip when the link is not configured */
  missing?: string
  external?: boolean
  className?: string
  icon?: ReactNode
  ariaLabel?: string
}

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 select-none'
const styles = {
  primary: 'bg-ink text-bg hover:bg-white',
  secondary: 'border border-white/15 bg-white/[0.03] text-ink hover:border-white/30 hover:bg-white/[0.07]',
  ghost: 'text-mute underline decoration-white/25 underline-offset-4 hover:text-ink hover:decoration-accent px-2',
}

export function ActionLink({
  href,
  children,
  variant = 'secondary',
  missing,
  external,
  className = '',
  icon,
  ariaLabel,
}: ActionProps) {
  const cls = `${base} ${styles[variant]} ${className}`
  if (!href) {
    // Elegant "unavailable" state: intentional-looking, not a broken button
    return (
      <span
        title={missing}
        className={`inline-flex items-center justify-center gap-2 rounded-full border border-dashed border-white/[0.12] px-5 py-3 text-sm font-medium text-dim ${className}`}
      >
        {icon}
        {children}
      </span>
    )
  }
  const ext = external ?? /^https?:/.test(href)
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={cls}
      {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {icon}
      {children}
    </a>
  )
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  id,
}: {
  eyebrow: string
  title: string
  sub?: string
  id?: string
}) {
  return (
    <Reveal className="mb-12 max-w-3xl sm:mb-16">
      <p className="eyebrow mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-accent/60" />
        {eyebrow}
      </p>
      <h2 id={id} className="display text-[clamp(2.1rem,6vw,4.25rem)]">
        {title}
      </h2>
      {sub && <p className="mt-5 text-lg text-mute sm:text-xl">{sub}</p>}
    </Reveal>
  )
}
