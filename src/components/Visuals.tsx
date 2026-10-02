import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import {
  ArrowLeftRight,
  Bell,
  BookOpen,
  CalendarDays,
  CreditCard,
  MessageSquare,
  Package,
  Radar,
  Send,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { useCycle } from './ui'

/* ---------- Flow chain: horizontal on md+, vertical spine on mobile ---------- */
export function FlowChain({ steps, label }: { steps: string[]; label?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const [active, setActive] = useCycle(steps.length, inView, 1200)

  return (
    <div ref={ref}>
      {label && <p className="eyebrow mb-5">{label}</p>}
      <ol
        className="flex flex-col md:grid md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
        style={{ ['--n' as string]: steps.length }}
      >
        {steps.map((s, i) => {
          const on = i === active
          const done = i < active
          return (
            <li
              key={s}
              className="relative flex items-start gap-4 pb-5 last:pb-0 md:block md:pb-0 md:pr-3"
              onMouseEnter={() => setActive(i)}
            >
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[6px] top-4 h-[calc(100%-0.25rem)] w-px md:left-4 md:top-[6px] md:h-px md:w-[calc(100%-1.25rem)] ${
                    done ? 'bg-accent/60' : 'bg-white/10'
                  } transition-colors duration-500`}
                />
              )}
              <span
                aria-hidden="true"
                className={`relative z-10 mt-0.5 block h-3.5 w-3.5 shrink-0 rounded-full border bg-bg transition-[border-color,box-shadow,background-color] duration-300 md:mt-0 ${
                  on
                    ? 'border-accent bg-accent shadow-[0_0_14px_rgb(var(--accent)/0.7)]'
                    : done
                      ? 'border-accent/60'
                      : 'border-white/20'
                }`}
              />
              <div className="md:mt-4">
                <p className="font-mono text-[10px] text-dim">{String(i + 1).padStart(2, '0')}</p>
                <p className={`text-sm font-medium leading-snug transition-colors duration-300 ${on ? 'text-ink' : 'text-mute'}`}>
                  {s}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* ---------- Map-inspired route visual (NER-SMART) ---------- */
const nodes: Record<string, [number, number]> = {
  A: [34, 214],
  B: [112, 148],
  C: [108, 238],
  D: [196, 104],
  E: [206, 196],
  F: [296, 62],
  G: [306, 152],
  H: [366, 226],
  I: [262, 246],
}
const edges = ['AB', 'AC', 'BD', 'BE', 'CE', 'DF', 'DG', 'EG', 'EI', 'GH', 'IH', 'FG']
const route = ['A', 'B', 'E', 'G', 'H']
const pt = (k: string) => nodes[k].join(',')

export function MapViz() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const routeD = 'M' + route.map(pt).join(' L')
  const [bx, by] = [(nodes.D[0] + nodes.G[0]) / 2, (nodes.D[1] + nodes.G[1]) / 2]

  return (
    <div ref={ref} className="panel relative overflow-hidden" role="img" aria-label="Road network graph: a blocked road near an incident is avoided and the route is re-planned">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
        <span className="eyebrow">road-graph</span>
        <span className="font-mono text-[10px] text-dim">illustrative · OSM · GeoJSON</span>
      </div>
      <svg viewBox="0 0 400 280" className="block h-auto w-full">
        {/* terrain contours */}
        <g fill="none" stroke="white" strokeOpacity=".05">
          <path d="M-10 90 C 80 40, 140 120, 230 70 S 380 30, 420 60" />
          <path d="M-10 130 C 90 80, 150 160, 240 110 S 380 70, 420 100" />
          <path d="M-10 260 C 90 220, 170 270, 260 230 S 380 200, 420 215" />
        </g>
        {/* roads */}
        <g strokeLinecap="round">
          {edges.map((e) => {
            const blocked = e === 'DG'
            return (
              <line
                key={e}
                x1={nodes[e[0]][0]}
                y1={nodes[e[0]][1]}
                x2={nodes[e[1]][0]}
                y2={nodes[e[1]][1]}
                stroke="white"
                strokeOpacity={blocked ? 0.35 : 0.14}
                strokeWidth={blocked ? 1.5 : 1.5}
                strokeDasharray={blocked ? '4 5' : undefined}
              />
            )
          })}
        </g>
        {/* active route */}
        <m.path
          d={routeD}
          fill="none"
          stroke="rgb(var(--accent))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 6px rgb(var(--accent) / .6))' }}
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: inView ? 1 : reduce ? 1 : 0 }}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
        {/* blocked marker */}
        <g stroke="white" strokeOpacity=".7" strokeWidth="1.6" strokeLinecap="round">
          <line x1={bx - 5} y1={by - 5} x2={bx + 5} y2={by + 5} />
          <line x1={bx - 5} y1={by + 5} x2={bx + 5} y2={by - 5} />
        </g>
        {/* nodes */}
        {Object.entries(nodes).map(([k, [x, y]]) => (
          <circle key={k} cx={x} cy={y} r={route.includes(k) ? 4 : 3} fill="#08090b" stroke="white" strokeOpacity={route.includes(k) ? 0.9 : 0.35} strokeWidth="1.5" />
        ))}
        {/* incident pulse */}
        <circle cx={nodes.D[0]} cy={nodes.D[1]} r="4" fill="rgb(var(--accent))" />
        {!reduce && (
          <m.circle
            cx={nodes.D[0]}
            cy={nodes.D[1]}
            fill="none"
            stroke="rgb(var(--accent))"
            strokeWidth="1.2"
            initial={{ r: 4, opacity: 0.8 }}
            animate={{ r: 22, opacity: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        {/* labels */}
        <g fontFamily="Geist Mono, monospace" fontSize="9" fill="white" fillOpacity=".55">
          <text x={nodes.D[0] + 10} y={nodes.D[1] - 10}>incident</text>
          <text x={bx + 10} y={by - 6}>blocked</text>
          <text x={nodes.A[0] - 6} y={nodes.A[1] + 18}>origin</text>
          <text x={nodes.H[0] + 14} y={nodes.H[1] + 18} textAnchor="end">destination</text>
        </g>
      </svg>
      <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-white/[0.07] px-4 py-2.5 font-mono text-[10px] text-dim">
        <span className="inline-flex items-center gap-1.5"><i className="h-px w-4 bg-accent" /> re-planned route</span>
        <span className="inline-flex items-center gap-1.5"><i className="h-px w-4 border-t border-dashed border-white/50" /> inaccessible road</span>
      </div>
    </div>
  )
}

/* ---------- Society Ledger feature grid ---------- */
const ledgerIcons: Record<string, LucideIcon> = {
  Members: Users,
  Maintenance: Wrench,
  Ledger: BookOpen,
  Payments: CreditCard,
  Complaints: MessageSquare,
  Events: CalendarDays,
  Inventory: Package,
  Notifications: Bell,
}

export function LedgerViz({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const [active, setActive] = useCycle(items.length, inView, 1400)
  return (
    <div ref={ref} className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {items.map((it, i) => {
        const Icon = ledgerIcons[it] ?? BookOpen
        const on = i === active
        return (
          <div
            key={it}
            onMouseEnter={() => setActive(i)}
            className={`flex flex-col gap-3 rounded-xl border p-3.5 transition-[border-color,background-color] duration-300 ${
              on ? 'border-accent/40 bg-accent/[0.06]' : 'border-white/[0.08] bg-white/[0.02]'
            }`}
          >
            <Icon size={16} className={`transition-colors duration-300 ${on ? 'text-accent' : 'text-dim'}`} strokeWidth={1.75} />
            <span className={`text-[13px] font-medium transition-colors duration-300 ${on ? 'text-ink' : 'text-mute'}`}>{it}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Relay workflow: the flagship architecture visual ---------- */
const relayStages: { label: string; note: string; Icon: LucideIcon }[] = [
  { label: 'Driver', note: 'Authentication', Icon: Truck },
  { label: 'Load', note: 'Fleet / load management', Icon: Package },
  { label: 'Relay Radar', note: 'Geolocation · relay points', Icon: Radar },
  { label: 'Candidate Match', note: 'Matching states', Icon: Users },
  { label: 'Proposal', note: 'Matching / proposals', Icon: Send },
  { label: 'Handover', note: 'ETA · geofence / proximity', Icon: ArrowLeftRight },
  { label: 'Custody Confirmation', note: 'Two-party exchange', Icon: ShieldCheck },
]

export function RelayViz() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const [active, setActive] = useCycle(relayStages.length, inView, 1700)
  const n = relayStages.length
  const pct = (active / (n - 1)) * 100

  return (
    <div ref={ref} className="rounded-2xl border border-white/[0.08] bg-bg/60">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
        <span className="eyebrow">relay.workflow</span>
        <span className="flex items-center gap-2 font-mono text-[11px] text-mute" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--accent))]" />
          stage {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </span>
      </div>

      {/* Desktop: horizontal track with a travelling custody token */}
      <div className="relative hidden px-2 pb-7 pt-8 lg:block">
        <div className="absolute inset-x-[calc(100%/14+0.5rem)] top-[calc(2rem+22px)]">
          <div className="h-px w-full bg-white/10" />
          <m.div
            aria-hidden="true"
            className="absolute left-0 top-0 h-px origin-left bg-accent"
            style={{ width: '100%', boxShadow: '0 0 8px rgb(var(--accent) / .8)' }}
            animate={{ scaleX: pct / 100 }}
            transition={{ type: 'spring', stiffness: 90, damping: 20 }}
          />
          <m.span
            aria-hidden="true"
            className="absolute top-0 -ml-1.5 -mt-[5.5px] block h-3 w-3 rounded-full bg-accent"
            style={{ boxShadow: '0 0 0 4px rgb(var(--accent) / .18), 0 0 18px rgb(var(--accent) / .9)' }}
            animate={{ left: pct + '%' }}
            transition={{ type: 'spring', stiffness: 90, damping: 20 }}
          />
        </div>
        <ol className="relative grid grid-cols-7">
          {relayStages.map(({ label, note, Icon }, i) => {
            const on = i === active
            const done = i < active
            return (
              <li key={label} className="flex flex-col items-center px-1.5 text-center" onMouseEnter={() => setActive(i)}>
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl border bg-bg transition-[border-color,box-shadow,transform] duration-300 ${
                    on
                      ? '-translate-y-0.5 border-accent text-accent shadow-[0_0_24px_rgb(var(--accent)/0.25)]'
                      : done
                        ? 'border-accent/40 text-accent/80'
                        : 'border-white/15 text-dim'
                  }`}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <span className="mt-4 font-mono text-[10px] text-dim">{String(i + 1).padStart(2, '0')}</span>
                <span className={`mt-1 text-[13px] font-semibold leading-tight transition-colors duration-300 ${on ? 'text-ink' : 'text-mute'}`}>
                  {label}
                </span>
                <span className="mt-1.5 text-[11px] leading-snug text-dim">{note}</span>
              </li>
            )
          })}
        </ol>
      </div>

      {/* Mobile / tablet: vertical spine */}
      <ol className="relative p-5 lg:hidden">
        <span aria-hidden="true" className="absolute bottom-9 left-[40px] top-9 w-px bg-white/10" />
        {relayStages.map(({ label, note, Icon }, i) => {
          const on = i === active
          const done = i < active
          return (
            <li key={label} className="relative flex items-center gap-4 py-2.5" onMouseEnter={() => setActive(i)}>
              <span
                className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl border bg-bg transition-[border-color,box-shadow] duration-300 ${
                  on ? 'border-accent text-accent shadow-[0_0_20px_rgb(var(--accent)/0.25)]' : done ? 'border-accent/40 text-accent/80' : 'border-white/15 text-dim'
                }`}
              >
                <Icon size={17} strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className={`block text-sm font-semibold leading-tight transition-colors ${on ? 'text-ink' : 'text-mute'}`}>
                  <span className="mr-2 font-mono text-[10px] font-normal text-dim">{String(i + 1).padStart(2, '0')}</span>
                  {label}
                </span>
                <span className="mt-0.5 block text-xs text-dim">{note}</span>
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* ---------- CropCast: weather layers over seeded demo points ---------- */
const cropPoints = [
  { key: 'block', label: 'block', x: 222, y: 173, block: true },
  { key: 'a', label: 'A', x: 186, y: 206 },
  { key: 'b', label: 'B', x: 56, y: 96 },
  { key: 'c', label: 'C', x: 344, y: 63 },
]
// Illustrative halo radii per layer (relative emphasis only — not measured values)
const cropLayers = [
  { name: 'Rainfall', halo: [20, 26, 12, 18] },
  { name: 'Temperature', halo: [18, 10, 22, 26] },
  { name: 'Humidity', halo: [24, 28, 16, 12] },
  { name: 'Wind', halo: [14, 20, 26, 22] },
]

export function CropViz() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const [active, setActive] = useCycle(cropLayers.length, inView, 2200)
  const layer = cropLayers[active]

  return (
    <div ref={ref} className="panel relative overflow-hidden" role="img" aria-label="Weather layers (rainfall, temperature, humidity, wind) shown over a block point and three village points on a contour map">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
        <span className="eyebrow">weather.layers</span>
        <span className="font-mono text-[10px] text-dim">illustrative<span className="hidden sm:inline"> · seeded demo points</span></span>
      </div>
      <svg viewBox="0 0 400 280" className="block h-auto w-full">
        {/* lat/lon graticule */}
        <g stroke="white" strokeOpacity=".05">
          {[80, 160, 240, 320].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="280" />
          ))}
          {[70, 140, 210].map((y) => (
            <line key={y} x1="0" y1={y} x2="400" y2={y} />
          ))}
        </g>
        {/* terrain contours */}
        <g fill="none" stroke="white" strokeOpacity=".09">
          <path d="M-10 40 C 70 70, 120 20, 200 60 S 340 120, 420 90" />
          <path d="M-10 90 C 80 120, 130 70, 210 110 S 330 170, 420 140" />
          <path d="M-10 150 C 90 175, 150 130, 220 165 S 330 215, 420 190" />
          <path d="M-10 215 C 100 235, 170 200, 240 225 S 340 262, 420 245" />
        </g>
        {/* layer halos */}
        {cropPoints.map((p, i) => (
          <m.circle
            key={p.key + 'halo'}
            cx={p.x}
            cy={p.y}
            fill="rgb(var(--accent))"
            fillOpacity=".08"
            stroke="rgb(var(--accent))"
            strokeOpacity=".4"
            strokeWidth="1"
            initial={false}
            animate={{ r: layer.halo[i] }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 90, damping: 16 }}
          />
        ))}
        {/* wind vectors */}
        <g stroke="rgb(var(--accent))" strokeWidth="1.5" strokeLinecap="round" style={{ opacity: layer.name === 'Wind' ? 0.9 : 0, transition: 'opacity .4s' }}>
          {cropPoints.map((p) => (
            <g key={p.key + 'w'}>
              <line x1={p.x - 16} y1={p.y + 14} x2={p.x + 16} y2={p.y - 14} />
              <polyline points={`${p.x + 8},${p.y - 14} ${p.x + 16},${p.y - 14} ${p.x + 16},${p.y - 6}`} fill="none" />
            </g>
          ))}
        </g>
        {/* points */}
        {cropPoints.map((p) =>
          p.block ? (
            <rect key={p.key} x={p.x - 5} y={p.y - 5} width="10" height="10" fill="#08090b" stroke="white" strokeWidth="1.5" />
          ) : (
            <circle key={p.key} cx={p.x} cy={p.y} r="4" fill="rgb(var(--accent))" />
          ),
        )}
        <g fontFamily="Geist Mono, monospace" fontSize="9" fill="white" fillOpacity=".6">
          {cropPoints.map((p) => (
            <text key={p.key + 't'} x={p.x + 9} y={p.y + 16}>
              {p.label}
            </text>
          ))}
        </g>
      </svg>
      <ul className="grid grid-cols-4 border-t border-white/[0.07]">
        {cropLayers.map((l, i) => (
          <li
            key={l.name}
            onMouseEnter={() => setActive(i)}
            className={`border-r border-white/[0.07] px-1 py-3 text-center font-mono text-[10px] uppercase tracking-[0.08em] transition-colors last:border-r-0 sm:text-[11px] ${
              i === active ? 'bg-accent/[0.07] text-ink' : 'text-dim'
            }`}
          >
            {l.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
