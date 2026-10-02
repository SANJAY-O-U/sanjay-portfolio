import { useRef } from 'react'
import { m, useInView } from 'framer-motion'
import { ArrowDownRight, Download } from 'lucide-react'
import { site } from '../data/site'
import { ActionLink, Magnetic, useCycle } from './ui'

const layers = [
  { n: '01', label: 'User', nodes: [] as string[], note: 'Request' },
  { n: '02', label: 'Application', nodes: ['React', 'Flutter'], note: '' },
  { n: '03', label: 'API', nodes: ['Node.js', 'AI'], note: '' },
  { n: '04', label: 'Database', nodes: ['MongoDB'], note: '' },
  { n: '05', label: 'Real-world action', nodes: ['GIS'], note: '' },
]

function SystemViz() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [active, setActive] = useCycle(layers.length, inView, 1500)

  return (
    <div ref={ref} className="panel relative overflow-hidden p-5 sm:p-6" aria-label="System architecture visualisation" role="img">
      <div className="mb-5 flex items-center justify-between">
        <span className="eyebrow">system.map</span>
        <span className="flex items-center gap-2 font-mono text-[11px] text-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgb(var(--accent))]" />
          request flow
        </span>
      </div>

      <ol className="relative">
        {/* spine */}
        <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-px bg-white/10" />
        <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-px overflow-hidden">
          <span className="block h-8 w-px animate-travel bg-gradient-to-b from-transparent via-accent to-transparent" />
        </span>

        {layers.map((l, i) => {
          const on = i === active
          return (
            <li key={l.n} className="relative pb-3 last:pb-0" onMouseEnter={() => setActive(i)}>
              <div
                className={`flex items-center gap-4 rounded-xl border px-3 py-3 transition-[border-color,background-color] duration-300 ${
                  on ? 'border-accent/40 bg-accent/[0.06]' : 'border-transparent'
                }`}
              >
                <span
                  className={`relative z-10 grid h-[31px] w-[31px] shrink-0 place-items-center rounded-full border font-mono text-[10px] transition-colors duration-300 ${
                    on ? 'border-accent bg-bg text-accent' : 'border-white/15 bg-bg text-dim'
                  }`}
                >
                  {l.n}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-semibold uppercase tracking-[0.08em] transition-colors ${on ? 'text-ink' : 'text-mute'}`}>
                    {l.label}
                  </p>
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {l.nodes.length === 0 && <span className="font-mono text-[11px] text-dim">{l.note}</span>}
                  {l.nodes.map((n) => (
                    <m.span
                      key={n}
                      animate={{ y: on ? -1 : 0 }}
                      className={`chip transition-colors duration-300 ${on ? '!border-accent/50 !text-ink' : ''}`}
                    >
                      {n}
                    </m.span>
                  ))}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.14]"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--accent)), transparent)' }}
      />

      <div className="shell relative grid gap-14 pb-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-28">
        <div className="lg:col-span-7">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-1"
          >
            <span>{site.status}</span>
          </m.p>

          <h1 className="display text-[clamp(2.6rem,9vw,5.2rem)] lg:text-[clamp(3.4rem,5.6vw,5.4rem)]">
            {['I build', 'systems that', 'solve real', 'problems.'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <m.span
                  className={`block ${i === 3 ? 'text-accent' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </m.span>
              </span>
            ))}
          </h1>

          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
              Computer Engineering student building full-stack products across web, mobile, backend systems, AI
              integrations and geospatial applications.
            </p>

            <p className="mt-8 font-mono text-sm uppercase tracking-[0.14em] text-ink">Sanjay O. Upadhyay</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Highlights">
              <li className="chip">9.34 CGPA</li>
              <li className="chip">First-Year College Topper</li>
              <li className="chip">SIH 2026 Team Lead</li>
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <ActionLink href="#work" variant="primary" external={false}>
                  View Projects <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </ActionLink>
              </Magnetic>
              <Magnetic>
                <ActionLink href="#contact" external={false}>
                  Contact Me <span aria-hidden="true">↗</span>
                </ActionLink>
              </Magnetic>
              <ActionLink
                href={site.resume || undefined}
                variant="ghost"
                external
                missing="Resume not available yet"
                icon={<Download size={15} />}
              >
                Download Resume
              </ActionLink>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-mute">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent/80" />
              Open to Software Engineering Internships
            </p>
          </m.div>
        </div>

        <m.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <SystemViz />
          <p className="mt-3 text-center font-mono text-[11px] text-dim">
            React · Node.js · MongoDB · Flutter · GIS · AI
          </p>
        </m.div>
      </div>
    </section>
  )
}
