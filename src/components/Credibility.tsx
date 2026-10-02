import { credibility } from '../data/site'
import { Counter, Reveal } from './ui'

export default function Credibility() {
  return (
    <section aria-label="Credentials" className="border-y border-white/[0.07] bg-white/[0.012]">
      <Reveal className="shell">
        <dl className="grid grid-cols-2 divide-white/[0.07] sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
          {credibility.map((c, i) => (
            <div
              key={i}
              className={`flex flex-col justify-center gap-1.5 px-1 py-7 sm:px-6 lg:py-9 ${
                i === 0 ? 'lg:pl-0' : ''
              } ${i % 2 === 1 ? 'border-l border-white/[0.07] pl-5 sm:border-l-0 sm:pl-6' : ''}`}
            >
              <dt className="order-2 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
                {'label' in c ? c.label : c.sub}
              </dt>
              <dd className="order-1 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                {'value' in c ? <Counter to={c.value} decimals={c.decimals} suffix={c.suffix} /> : c.text}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
