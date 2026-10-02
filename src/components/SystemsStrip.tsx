import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { BarChart3, Database, Globe, Map as MapIcon, Server, Smartphone, Sparkles, type LucideIcon } from 'lucide-react'
import { surfaces } from '../data/site'
import { Reveal, useCycle } from './ui'

const icons: Record<string, LucideIcon> = {
  web: Globe,
  mobile: Smartphone,
  backend: Server,
  gis: MapIcon,
  ai: Sparkles,
  db: Database,
  data: BarChart3,
}

export default function SystemsStrip() {
  const ref = useRef<HTMLUListElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const [active, setActive] = useCycle(surfaces.length, inView, 1500)

  return (
    <section aria-labelledby="surfaces-title" className="shell py-16 sm:py-20">
      <Reveal>
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="surfaces-title" className="eyebrow">
            Systems I&apos;ve built
          </h2>
          <p className="text-lg font-medium tracking-[-0.02em] text-ink sm:text-xl">From interface to infrastructure.</p>
        </div>
        <ul ref={ref} className="grid grid-cols-3 gap-px overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.08] md:grid-cols-7">
          {surfaces.map((s, i) => {
            const Icon = icons[s.key] ?? Globe
            const on = i === active
            return (
              <li
                key={s.key}
                onMouseEnter={() => setActive(i)}
                className={`relative flex flex-col items-start gap-5 p-4 last:col-span-3 md:last:col-span-1 transition-colors duration-300 sm:p-5 ${on ? 'bg-[#0d1216]' : 'bg-bg'}`}
              >
                <Icon size={18} strokeWidth={1.6} className={`transition-colors duration-300 ${on ? 'text-accent' : 'text-dim'}`} />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{s.label}</span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-px bg-accent transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-0'}`}
                />
              </li>
            )
          })}
        </ul>
      </Reveal>
    </section>
  )
}
