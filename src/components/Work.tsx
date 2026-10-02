import { useId, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { projects, type CaseTab, type Project } from '../data/projects'
import { ActionLink, Counter, Reveal, SectionHeading } from './ui'
import { CropViz, FlowChain, LedgerViz, MapViz, RelayViz } from './Visuals'

/* ---------- Case study tabs ---------- */
function CaseStudy({ tabs, panelId }: { tabs: CaseTab[]; panelId: string }) {
  const [i, setI] = useState(0)
  const uid = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const n = (i + dir + tabs.length) % tabs.length
    setI(n)
    refs.current[n]?.focus()
  }

  const tab = tabs[i]
  return (
    <div id={panelId} className="rounded-xl border border-white/[0.08] bg-bg/60 scroll-mt-24">
      <div role="tablist" aria-label="Case study" onKeyDown={onKey} className="grid grid-cols-2 gap-1 border-b border-white/[0.07] p-1.5 sm:flex sm:flex-wrap">
        {tabs.map((t, n) => (
          <button
            key={t.label}
            ref={(el) => {
              refs.current[n] = el
            }}
            role="tab"
            id={`${uid}-t${n}`}
            aria-selected={n === i}
            aria-controls={`${uid}-p`}
            tabIndex={n === i ? 0 : -1}
            onClick={() => setI(n)}
            onMouseEnter={() => matchMedia('(hover: hover)').matches && setI(n)}
            className={`relative whitespace-nowrap rounded-lg text-center px-2.5 py-3 font-mono text-[10.5px] uppercase tracking-[0.08em] transition-colors ${
              n === i ? 'text-ink' : 'text-dim hover:text-mute'
            }`}
          >
            {n === i && <span aria-hidden="true" className="absolute inset-0 rounded-lg border border-white/10 bg-white/[0.06]" />}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${uid}-p`} aria-labelledby={`${uid}-t${i}`} className="min-h-[170px] p-5">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <p className="leading-relaxed text-mute">{tab.body}</p>
            {tab.points && (
              <ul className="mt-4 space-y-2">
                {tab.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-ink/90">
                    <Check size={14} className="mt-1 shrink-0 text-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------- Shared bits ---------- */
function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technology">
      {items.map((s) => (
        <li key={s} className="chip">
          {s}
        </li>
      ))}
    </ul>
  )
}

function Highlights({ p }: { p: Project }) {
  if (!p.highlights.length) return null
  const stat = p.highlights.find((h) => h.value !== undefined)
  return (
    <div className="flex flex-wrap items-center gap-2">
      {stat && (
        <div className="mr-2 flex items-baseline gap-2.5">
          <span className="text-4xl font-bold tracking-[-0.04em] text-accent sm:text-5xl">
            <Counter to={stat.value!} suffix={stat.suffix} />
          </span>
          <span className="max-w-[9rem] font-mono text-[11px] uppercase leading-snug tracking-[0.1em] text-mute">{stat.label}</span>
        </div>
      )}
      {p.highlights
        .filter((h) => h.value === undefined)
        .map((h) => (
          <span key={h.label} className="rounded-full border border-accent/25 bg-accent/[0.06] px-3 py-1 text-xs text-ink/90">
            {h.label}
          </span>
        ))}
    </div>
  )
}

function Header({ p }: { p: Project }) {
  return (
    <header>
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <span className="font-mono text-xs text-dim">{p.index}</span>
        {p.badge && (
          <span className="rounded-full border border-accent/30 bg-accent/[0.07] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
            {p.badge}
          </span>
        )}
        {p.meta?.map((m) => (
          <span key={m} className="chip">
            {m}
          </span>
        ))}
      </div>
      <h3
        className={`font-bold uppercase leading-[0.95] tracking-[-0.04em] ${
          p.variant === 'hero'
            ? 'text-[clamp(2.4rem,6vw,4.5rem)]'
            : p.variant === 'wide'
              ? 'text-[clamp(2.1rem,5vw,3.5rem)]'
              : 'text-3xl sm:text-4xl'
        }`}
      >
        {p.title}
      </h3>
      <p className="mt-3 text-lg text-mute">{p.subtitle}</p>
    </header>
  )
}

function Links({
  p,
  onCase,
  caseOpen,
  caseHref,
}: {
  p: Project
  onCase?: () => void
  caseOpen?: boolean
  caseHref?: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {p.case &&
        (caseHref ? (
          <ActionLink href={caseHref} variant="primary" external={false}>
            View Case Study <span aria-hidden="true">→</span>
          </ActionLink>
        ) : (
          <button
            type="button"
            onClick={onCase}
            aria-expanded={caseOpen}
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-colors hover:bg-white"
          >
            {caseOpen ? 'Hide Case Study' : 'View Case Study'}{' '}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </button>
        ))}
      <ActionLink
        href={p.repo}
        missing="Repository — coming soon"
        ariaLabel={`${p.title} source code on GitHub (opens in a new tab)`}
      >
        {p.repo ? (
          <>
            GitHub <ArrowUpRight size={15} aria-hidden="true" />
          </>
        ) : (
          'Repository — coming soon'
        )}
      </ActionLink>
      {p.demo ? (
        <ActionLink href={p.demo} ariaLabel={`${p.title} live demo (opens in a new tab)`}>
          Live Demo <ArrowUpRight size={15} aria-hidden="true" />
        </ActionLink>
      ) : (
        <span className="inline-flex items-center rounded-full border border-dashed border-white/[0.12] px-4 py-3 text-sm font-medium text-dim">Private / Local Demo</span>
      )}
    </div>
  )
}

function Features({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
      {items.map((f) => (
        <li key={f} className="flex items-start gap-2.5 text-sm text-mute">
          <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
          {f}
        </li>
      ))}
    </ul>
  )
}

/* ---------- Card shell with cursor spotlight ---------- */
function Card({ children, className = '', featured = false }: { children: React.ReactNode; className?: string; featured?: boolean }) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <article
      onMouseMove={onMove}
      className={`group/card relative overflow-hidden rounded-[20px] border bg-white/[0.02] transition-[border-color,transform] duration-300 hover:border-white/20 ${
        featured ? 'border-accent/25' : 'border-white/[0.08]'
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx,50%) var(--my,0%), rgb(var(--accent) / 0.07), transparent 60%)',
        }}
      />
      {featured && <div aria-hidden="true" className="glow-line absolute inset-x-0 top-0 h-px" />}
      <div className="relative p-6 sm:p-9">{children}</div>
    </article>
  )
}

function Expandable({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <m.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-6">{children}</div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Variants ---------- */
function HeroProject({ p }: { p: Project }) {
  return (
    <Card featured>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-7 lg:col-span-7">
          <Header p={p} />
          <p className="max-w-xl text-lg leading-relaxed text-ink/85">{p.description}</p>
          {p.status && (
            <p className="flex items-start gap-2.5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-mute">
              <span aria-hidden="true" className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full border border-accent" />
              {p.status}
            </p>
          )}
          <Highlights p={p} />
          <Stack items={p.stack} />
          {p.features && <Features items={p.features} />}
        </div>
        <div className="lg:col-span-5">{p.case && <CaseStudy tabs={p.case} panelId={`${p.id}-case`} />}</div>
      </div>
      <div className="mt-10">
        <RelayViz />
      </div>
      <div className="mt-8">
        <Links p={p} caseHref={`#${p.id}-case`} />
      </div>
    </Card>
  )
}

function WideProject({ p }: { p: Project }) {
  const [open, setOpen] = useState(false)
  return (
    <Card>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="flex flex-col gap-7 lg:col-span-6">
          <Header p={p} />
          <p className="max-w-xl leading-relaxed text-ink/85">{p.description}</p>
          {p.status && (
            <p className="flex items-start gap-2.5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-mute">
              <span aria-hidden="true" className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full border border-accent" />
              {p.status}
            </p>
          )}
          <Highlights p={p} />
          <Stack items={p.stack} />
        </div>
        <div className={`lg:col-span-6 ${p.visual === 'crop' ? 'lg:order-first' : ''}`}>
          {p.visual === 'crop' ? <CropViz /> : <MapViz />}
        </div>
      </div>
      <div className="mt-10 border-t border-white/[0.07] pt-8">
        {p.flow && <FlowChain steps={p.flow} label={p.flowLabel} />}
      </div>
      <Expandable open={open}>{p.case && <CaseStudy tabs={p.case} panelId={`${p.id}-case`} />}</Expandable>
      <div className="mt-8">
        <Links p={p} onCase={() => setOpen((v) => !v)} caseOpen={open} />
      </div>
    </Card>
  )
}

function HalfProject({ p }: { p: Project }) {
  const [open, setOpen] = useState(false)
  return (
    <Card className="h-full">
      <div className="flex h-full flex-col gap-7">
        <Header p={p} />
        <p className="leading-relaxed text-ink/85">{p.description}</p>
        {p.visual === 'ledger' && p.features && <LedgerViz items={p.features} />}
        {p.visual === 'generation' && p.flow && (
          <div className="rounded-xl border border-white/[0.08] bg-bg/50 p-5">
            <FlowChain steps={p.flow} label={p.flowLabel} />
          </div>
        )}
        <Highlights p={p} />
        <Stack items={p.stack} />
        <Expandable open={open}>{p.case && <CaseStudy tabs={p.case} panelId={`${p.id}-case`} />}</Expandable>
        <div className="mt-auto">
          <Links p={p} onCase={() => setOpen((v) => !v)} caseOpen={open} />
        </div>
      </div>
    </Card>
  )
}

function CompactProject({ p }: { p: Project }) {
  return (
    <Card>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <Header p={p} />
          <Stack items={p.stack} />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-7">
          <p className="leading-relaxed text-ink/85">{p.description}</p>
          {p.features && (
            <ul className="flex flex-wrap gap-1.5" aria-label="Focus areas">
              {p.features.map((f) => (
                <li key={f} className="rounded-full border border-accent/25 bg-accent/[0.05] px-3 py-1 text-xs text-ink/90">
                  {f}
                </li>
              ))}
            </ul>
          )}
          <Links p={p} />
        </div>
      </div>
    </Card>
  )
}

export default function Work() {
  const byVariant = (v: Project['variant']) => projects.filter((p) => p.variant === v)
  return (
    <section id="work" aria-labelledby="work-title" className="shell py-24 sm:py-32">
      <SectionHeading
        id="work-title"
        eyebrow="Featured work"
        title="Selected work"
        sub="Systems I've designed and built."
      />
      <div className="flex flex-col gap-6">
        {byVariant('hero').map((p) => (
          <Reveal key={p.id}>
            <HeroProject p={p} />
          </Reveal>
        ))}
        {byVariant('wide').map((p) => (
          <Reveal key={p.id}>
            <WideProject p={p} />
          </Reveal>
        ))}
        <div className="grid gap-6 lg:grid-cols-2">
          {byVariant('half').map((p) => (
            <Reveal key={p.id} className="h-full">
              <HalfProject p={p} />
            </Reveal>
          ))}
        </div>
        {byVariant('compact').map((p) => (
          <Reveal key={p.id}>
            <CompactProject p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
