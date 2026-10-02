import { useRef, type MouseEvent } from 'react'
import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/** About-section portrait: static by default, gentle scale/parallax/glow on hover only. */
export default function Portrait() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: 0.5 })
  const y = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: 0.5 })

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set(((e.clientX - r.left) / r.width - 0.5) * -10)
    y.set(((e.clientY - r.top) / r.height - 0.5) * -10)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.figure
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileHover={reduce ? undefined : { y: -3 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full max-w-[17rem] sm:max-w-[20rem] md:max-w-none"
    >
      {/* ambient accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-[32px] opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--accent) / 0.16), transparent)' }}
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-white/[0.1] bg-[#17191d]">
        <m.img
          src="/sanjay-portrait.webp"
          alt="Professional portrait of Sanjay O. Upadhyay"
          width={1254}
          height={1254}
          loading="lazy"
          decoding="async"
          style={reduce ? undefined : { x, y }}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full scale-[1.02] object-cover object-[50%_30%]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/[0.04]" />
      </div>
    </m.figure>
  )
}
