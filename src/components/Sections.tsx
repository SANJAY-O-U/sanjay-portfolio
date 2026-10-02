import { useRef } from 'react'
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  Database,
  LayoutTemplate,
  Map as MapIcon,
  Plug,
  Server,
  Smartphone,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { useInView } from 'framer-motion'
import {
  building,
  education,
  experience,
  leadership,
  process,
  processExamples,
  site,
  surfaces,
} from '../data/site'
import { skills } from '../data/skills'
import { ActionLink, Magnetic, Reveal, SectionHeading, useCycle } from './ui'
import { GitHubIcon, LinkedInIcon } from './icons'
import Portrait from './Portrait'

/* ---------- How I build ---------- */
export function HowIBuild() {
  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { margin: '-15% 0px' })
  const [active, setActive] = useCycle(process.length, inView, 1600)

  return (
    <section id="process" aria-labelledby="process-title" className="border-y border-white/[0.07] bg-white/[0.012] py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="process-title" eyebrow="Method" title="How I build" />
        <ol ref={ref} className="grid gap-px overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.08] md:grid-cols-5">
          {process.map((s, i) => {
            const on = i === active
            return (
              <li
                key={s.n}
                onMouseEnter={() => setActive(i)}
                className={`flex flex-col gap-10 p-6 transition-colors duration-300 ${on ? 'bg-[#0d1216]' : 'bg-bg'}`}
              >
                <span className={`font-mono text-xs transition-colors ${on ? 'text-accent' : 'text-dim'}`}>{s.n}</span>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{s.body}</p>
                </div>
              </li>
            )
          })}
        </ol>

        <Reveal className="mt-12 grid gap-10 lg:grid-cols-12">
          <p className="text-xl leading-snug text-ink/90 sm:text-2xl lg:col-span-5">
            &ldquo;I prefer understanding the system first, then building the smallest reliable version, validating it,
            and iterating.&rdquo;
          </p>
          <ul className="space-y-6 lg:col-span-7">
            {processExamples.map((e) => (
              <li key={e.project} className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-accent">{e.project}</span>
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-mute">
                  {e.path.map((p, i) => (
                    <span key={p} className="inline-flex items-center gap-2">
                      {p}
                      {i < e.path.length - 1 && <span aria-hidden="true" className="text-dim">→</span>}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- About ---------- */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shell py-20 sm:py-28">
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-12 lg:gap-x-16">
        <Reveal className="md:col-span-7 md:col-start-6 md:row-start-1">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-accent/60" />
            About
          </p>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-5 md:row-span-2 md:row-start-1 md:self-start">
          <Portrait />
        </Reveal>

        <div className="md:col-span-7 md:col-start-6 md:row-start-2">
          <Reveal delay={0.1}>
            <h2 id="about-title" className="display text-[clamp(2.3rem,6.4vw,4.5rem)]">
              Engineering is <br className="hidden sm:block" />
              how I think.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 space-y-5 text-lg leading-relaxed text-mute">
            <p className="text-ink/90">
              I&apos;m a Computer Engineering student focused on building software that connects engineering with
              real-world problems.
            </p>
            <p>
              My work spans full-stack web applications, mobile products, backend systems, AI integrations, geospatial
              applications and data-driven platforms.
            </p>
            <p>
              I enjoy taking a problem from an ambiguous requirement to a working system — understanding the
              architecture, building the backend, shaping the interface, validating the workflows and iterating from
              there.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8">
            <ul className="flex flex-wrap gap-2" aria-label="Areas of work">
              {surfaces.map((t) => (
                <li
                  key={t.key}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-mute"
                >
                  {t.label}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-l border-accent/50 pl-4 text-sm leading-relaxed text-mute">
              Currently building systems across logistics, agriculture and real-world operational workflows.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-20" y={14}>
        <p className="eyebrow mb-5">Currently building</p>
        <ul className="grid gap-px overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-4">
          {building.map((b) => (
            <li key={b.title} className="bg-bg p-6">
              <p className="flex items-center gap-2.5 text-sm font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {b.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mute">{b.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

/* ---------- Experience ---------- */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="border-y border-white/[0.07] bg-white/[0.012] py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="exp-title" eyebrow="Experience" title="Experience" />
        <Reveal>
          <article className="panel grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{experience.period}</p>
              <p className="mt-2 font-mono text-xs text-dim">{experience.duration}</p>
            </div>
            <div className="lg:col-span-8">
              <h3 className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">{experience.role}</h3>
              <p className="mt-1 text-mute">{experience.company}</p>
              <ul className="mt-5 space-y-2.5">
                {experience.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-mute">
                    <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Education + Leadership ---------- */
export function EducationLeadership() {
  return (
    <section id="education" aria-labelledby="edu-title" className="shell py-20 sm:py-28">
      <SectionHeading id="edu-title" eyebrow="Education" title="Education" />
      <Reveal>
        <article className="panel grid gap-8 p-6 sm:p-9 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-[clamp(3.6rem,10vw,6rem)] font-bold leading-none tracking-[-0.05em] text-accent">
              {education.cgpa}
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-mute">CGPA</p>
            <p className="mt-5 inline-flex rounded-full border border-accent/30 bg-accent/[0.07] px-3 py-1 text-xs font-medium text-ink">
              {education.badge}
            </p>
          </div>
          <div className="lg:col-span-8">
            <h3 className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">{education.degree}</h3>
            <p className="mt-2 text-lg text-ink/90">{education.school}</p>
            <p className="text-mute">
              {education.university} · {education.years}
            </p>
            <ul className="mt-6 space-y-1.5 border-t border-white/[0.07] pt-5 text-sm text-dim">
              {education.earlier.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </article>
      </Reveal>

      <div className="mt-16 sm:mt-20">
        <SectionHeading id="lead-title" eyebrow="Leadership" title="Leadership" />
        <Reveal>
          <ul className="grid gap-px overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
            {leadership.map((l, i) => (
              <li key={l.title} className="flex flex-col gap-8 bg-bg p-6 sm:p-7">
                <span className="font-mono text-xs text-dim">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-bold leading-snug tracking-[-0.02em] sm:text-xl">{l.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{l.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Skills ---------- */
const icons: Record<string, LucideIcon> = {
  code: Code2,
  layout: LayoutTemplate,
  server: Server,
  phone: Smartphone,
  db: Database,
  plug: Plug,
  map: MapIcon,
  book: BookOpen,
  tool: Wrench,
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="shell py-20 sm:py-28">
      <SectionHeading id="skills-title" eyebrow="Stack" title="Technical skills" sub="Grouped by what they're used for — not rated." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => {
          const Icon = icons[g.icon] ?? Code2
          return (
            <Reveal key={g.title} delay={(i % 3) * 0.06} className="h-full">
              <div className="panel group h-full p-6 transition-colors duration-300 hover:border-white/20">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-accent transition-colors group-hover:border-accent/40">
                    <Icon size={17} strokeWidth={1.75} />
                  </span>
                  <h3 className="text-base font-semibold tracking-[-0.01em]">{g.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- Contact ---------- */
export function Contact() {
  const email = site.email ? `https://mail.google.com/mail/?view=cm&fs=1&to=${site.email}` : undefined
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-white/[0.07] py-28 sm:py-40">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-1/2 h-[420px] w-[800px] -translate-x-1/2 rounded-full opacity-[0.12]"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--accent)), transparent)' }}
      />
      <Reveal className="shell relative">
        <h2 id="contact-title" className="display max-w-5xl text-[clamp(2.6rem,9vw,7.5rem)]">
          Let&apos;s build something <span className="text-accent">useful.</span>
        </h2>
        <p className="mt-8 max-w-xl text-lg text-mute sm:text-xl">
          Open to software engineering internships, product engineering opportunities and ambitious technical projects.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Magnetic>
            <ActionLink href={email} variant="primary" missing="Email unavailable" ariaLabel="Email Sanjay O. Upadhyay">
              Email Me <ArrowUpRight size={16} />
            </ActionLink>
          </Magnetic>
          <Magnetic>
            <ActionLink href={site.linkedin || undefined} missing="LinkedIn unavailable" icon={<LinkedInIcon className="h-4 w-4" />}>
              LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
            </ActionLink>
          </Magnetic>
          <Magnetic>
            <ActionLink href={site.github || undefined} missing="GitHub link coming soon" icon={<GitHubIcon className="h-4 w-4" />}>
              {site.github ? (
                <>
                  GitHub <ArrowUpRight size={15} aria-hidden="true" />
                </>
              ) : (
                'GitHub — coming soon'
              )}
            </ActionLink>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  )
}

/* ---------- Footer ---------- */
export function Footer() {
  const links = [
    { label: 'LinkedIn', href: site.linkedin },
    { label: 'GitHub', href: site.github },
    { label: 'Email', href: site.email ? `mailto:${site.email}` : '' },
  ]
  return (
    <footer className="border-t border-white/[0.07] py-10">
      <div className="shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-bold uppercase tracking-[-0.02em]">Sanjay O. Upadhyay</p>
          <p className="mt-1 text-sm text-mute">Computer Engineering • Full-Stack Development</p>
          <p className="mt-6 font-mono text-xs text-dim">© 2026 Sanjay O. Upadhyay · Built with React + Vite</p>
        </div>
        <ul className="flex gap-6 text-sm">
          {links.map((l) => (
            <li key={l.label}>
              {l.href ? (
                <a
                  href={l.href}
                  {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex min-h-[44px] items-center text-mute transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              ) : (
                <span className="inline-flex min-h-[44px] items-center text-dim">{l.label} — soon</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
