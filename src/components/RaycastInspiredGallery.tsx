'use client'

import { useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'

import { raycastFigureSvgs } from './raycastFigureSvgs'

type FigureKey = keyof typeof raycastFigureSvgs

export type Figure = {
  id: string
  title: string
  caption: string
  description: string
  svgKey: FigureKey
  tokens: {
    base: string
    stroke: string
    indicatorTop?: string
    indicatorBody?: string
    indicatorStroke?: string
  }
}

export const raycastFigures: Figure[] = [
  {
    id: 'systems-audit',
    title: 'Systems audit',
    caption: 'FIG_01',
    description:
      'Make the moving pieces tangible—integrations, constraints, and handoffs that shape the work.',
    svgKey: 'ApiFig2',
    tokens: {
      base: '#0a0c0f',
      stroke: 'rgba(52, 211, 153, 0.5)',
      indicatorTop: 'rgba(56, 189, 248, 0.55)',
      indicatorBody: 'rgba(14, 116, 144, 0.6)',
      indicatorStroke: 'rgba(52, 211, 153, 0.65)',
    },
  },
  {
    id: 'ui-blueprint',
    title: 'UI blueprint',
    caption: 'FIG_02',
    description:
      'Align on the scaffolding—navigation, states, and reusable components—before anyone builds.',
    svgKey: 'ApiFig4',
    tokens: {
      base: '#0b1110',
      stroke: 'rgba(16, 185, 129, 0.45)',
      indicatorTop: 'rgba(110, 231, 183, 0.65)',
      indicatorBody: 'rgba(16, 185, 129, 0.35)',
      indicatorStroke: 'rgba(52, 211, 153, 0.6)',
    },
  },
  {
    id: 'experiment-loop',
    title: 'Experiment loop',
    caption: 'FIG_03',
    description:
      'Visualize the testing rhythm—hypothesis, signals, and rollout—so decisions are faster and safer.',
    svgKey: 'ApiFig3',
    tokens: {
      base: '#09100f',
      stroke: 'rgba(52, 211, 153, 0.55)',
      indicatorTop: 'rgba(56, 189, 248, 0.55)',
      indicatorBody: 'rgba(14, 165, 233, 0.28)',
      indicatorStroke: 'rgba(52, 211, 153, 0.7)',
    },
  },
]

export function RaycastInspiredGallery() {
  const [activeId, setActiveId] = useState<string>(raycastFigures[0]?.id ?? '')

  return (
    <div className="not-prose rounded-3xl border border-zinc-900/5 bg-white/70 p-6 shadow-xl ring-1 ring-white/60 backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/60 dark:ring-white/5 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Interactive diagrams
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-white sm:text-3xl">
            How the work looks in motion.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Interactive diagrams that come to life—hover to see each system flex and breathe.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {raycastFigures.map((figure, index) => {
          const isActive = activeId === figure.id
          const colors = figure.tokens

          return (
            <motion.button
              key={figure.id}
              type="button"
              className="group flex h-full flex-col gap-4 rounded-2xl border border-zinc-900/5 bg-white/80 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 dark:border-white/10 dark:bg-zinc-900/70 dark:hover:border-emerald-800/60"
              onMouseEnter={() => setActiveId(figure.id)}
              onFocus={() => setActiveId(figure.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
                    {figure.caption}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">
                    {figure.title}
                  </h3>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 transition group-hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-200 dark:group-hover:bg-emerald-900/50">
                  Hover
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{figure.description}</p>

              <div className="fig-shell relative mt-2 overflow-hidden rounded-2xl border border-emerald-100/70 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 p-4 transition duration-500 group-hover:border-emerald-200 group-hover:shadow-lg dark:border-emerald-900/40 dark:from-emerald-900/30 dark:via-zinc-900 dark:to-emerald-800/20">
                <div className="pointer-events-none absolute inset-0">
                  <div className="fig-grid h-full w-full" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-emerald-100/80 bg-white/70 px-2 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm backdrop-blur-sm dark:border-emerald-800/50 dark:bg-emerald-900/40 dark:text-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.16)] transition-opacity group-hover:opacity-100" />
                    Live preview
                  </div>
                  <div
                    className="fig-toggle"
                    data-active={isActive}
                    aria-label="Toggle animation"
                  >
                    <span>Off</span>
                    <span>On</span>
                    <div className="fig-toggle-knob" />
                  </div>
                </div>
                <div
                  className="fig relative mt-3 w-full"
                  data-active={isActive}
                  style={
                    {
                      '--base': colors.base,
                      '--stroke': colors.stroke,
                      '--indicator-top': colors.indicatorTop ?? colors.stroke,
                      '--indicator-body': colors.indicatorBody ?? colors.stroke,
                      '--indicator-stroke': colors.indicatorStroke ?? colors.stroke,
                    } as CSSProperties
                  }
                  dangerouslySetInnerHTML={{ __html: raycastFigureSvgs[figure.svgKey] }}
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/40 shadow-[0_10px_40px_rgba(16,185,129,0.12)] mix-blend-overlay dark:border-white/5" />
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-emerald-500/6 via-transparent to-sky-500/6 opacity-0 transition duration-500 group-hover:opacity-100" />
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600/80 dark:text-emerald-300/80">
                0{index + 1} · Interactive
              </div>
            </motion.button>
          )
        })}
      </div>

      <style jsx global>{`
        .fig {
          transition: transform 500ms ease, filter 500ms ease, opacity 400ms ease;
          will-change: transform, filter;
        }

        .fig svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .fig[data-active='true'] {
          transform: translateY(-6px) scale(1.01);
          filter: drop-shadow(0 20px 55px rgba(16, 185, 129, 0.25));
        }

        .fig svg .ApiFig2_screen__QvgLu,
        .fig svg .ApiFig2_appleLogo__y7S2e {
          transition: transform 420ms ease, filter 420ms ease, opacity 320ms ease;
          transform-origin: center;
        }

        .fig[data-active='true'] svg .ApiFig2_screen__QvgLu {
          transform: translateY(-4px);
          filter: drop-shadow(0 10px 25px rgba(59, 130, 246, 0.4));
        }

        .fig[data-active='true'] svg .ApiFig2_appleLogo__y7S2e {
          transform: translate(2px, -2px);
          opacity: 1;
        }

        .fig svg .ApiFig3_indicator__5kNam,
        .fig svg .ApiFig4_indicator__pwWSD {
          transition: transform 420ms ease, opacity 320ms ease;
          transform-origin: center;
          opacity: 0.8;
        }

        .fig[data-active='true'] svg .ApiFig3_indicator__5kNam {
          transform: translateY(-3px) scale(1.04);
          opacity: 1;
        }

        .fig[data-active='true'] svg .ApiFig4_indicator__pwWSD {
          transform: translateY(-2px);
          opacity: 1;
        }

        .fig svg .ApiFig4_root__DBWj1,
        .fig svg .ApiFig3_root__gbCCE {
          transition: filter 400ms ease;
        }

        .fig[data-active='true'] svg .ApiFig4_root__DBWj1,
        .fig[data-active='true'] svg .ApiFig3_root__gbCCE {
          filter: drop-shadow(0 12px 30px rgba(16, 185, 129, 0.22));
        }

        .fig-shell {
          position: relative;
        }

        .fig-grid {
          background-image: radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.14) 1px, transparent 0),
            linear-gradient(rgba(16, 185, 129, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.08) 1px, transparent 1px);
          background-size: 28px 28px, 56px 56px, 56px 56px;
          opacity: 0.55;
          mask-image: radial-gradient(circle at 50% 40%, rgba(0, 0, 0, 0.35), transparent 55%);
        }

        .fig-toggle {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(16, 185, 129, 0.25);
          background: rgba(16, 185, 129, 0.08);
          color: #065f46;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.02em;
          overflow: hidden;
          isolation: isolate;
          transition: border-color 300ms ease, background 300ms ease;
        }

        .fig-toggle span {
          z-index: 1;
          text-align: center;
          opacity: 0.7;
        }

        .fig-toggle[data-active='true'] {
          border-color: rgba(6, 95, 70, 0.6);
          background: rgba(6, 95, 70, 0.12);
          color: #ecfdf3;
        }

        .fig-toggle[data-active='true'] span:last-child {
          opacity: 1;
        }

        .fig-toggle[data-active='true'] span:first-child {
          opacity: 0.5;
        }

        .fig-toggle[data-active='false'] span:first-child {
          opacity: 1;
        }

        .fig-toggle-knob {
          position: absolute;
          inset: 3px;
          width: calc(50% - 6px);
          border-radius: 999px;
          background: linear-gradient(120deg, rgba(16, 185, 129, 0.9), rgba(56, 189, 248, 0.9));
          transition: transform 300ms ease;
          transform: translateX(0);
        }

        .fig-toggle[data-active='true'] .fig-toggle-knob {
          transform: translateX(100%);
        }
      `}</style>
    </div>
  )
}

type FigureCardProps = {
  figureId: Figure['id']
  eyebrow?: string
  title?: string
  description?: string
  size?: 'default' | 'compact'
}

export function RaycastFigureCard({
  figureId,
  eyebrow,
  title,
  description,
  size = 'default',
}: FigureCardProps) {
  const figure = raycastFigures.find((f) => f.id === figureId)
  const [active, setActive] = useState(false)

  if (!figure) return null

  const colors = figure.tokens
  const isCompact = size === 'compact'

  return (
    <motion.div
      className="group rounded-2xl border border-zinc-900/5 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900/70 dark:hover:border-emerald-800/60"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      tabIndex={0}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
              {eyebrow}
            </p>
          ) : null}
          <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">
            {title ?? figure.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {description ?? figure.description}
          </p>
        </div>
        <div
          className="fig-toggle"
          data-active={active}
          aria-label="Toggle animation"
        >
          <span>Off</span>
          <span>On</span>
          <div className="fig-toggle-knob" />
        </div>
      </div>

      <div
        className={`fig-shell relative mt-3 overflow-hidden rounded-2xl border border-emerald-100/70 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 transition duration-500 group-hover:border-emerald-200 group-hover:shadow-lg dark:border-emerald-900/40 dark:from-emerald-900/30 dark:via-zinc-900 dark:to-emerald-800/20 ${
          isCompact ? 'p-3' : 'p-4'
        }`}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="fig-grid h-full w-full" />
        </div>
        <div
          className="fig relative w-full"
          data-active={active}
          style={
            {
              '--base': colors.base,
              '--stroke': colors.stroke,
              '--indicator-top': colors.indicatorTop ?? colors.stroke,
              '--indicator-body': colors.indicatorBody ?? colors.stroke,
              '--indicator-stroke': colors.indicatorStroke ?? colors.stroke,
            } as CSSProperties
          }
          dangerouslySetInnerHTML={{ __html: raycastFigureSvgs[figure.svgKey] }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/40 shadow-[0_10px_40px_rgba(16,185,129,0.12)] mix-blend-overlay dark:border-white/5" />
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-emerald-500/6 via-transparent to-sky-500/6 opacity-0 transition duration-500 group-hover:opacity-100" />
      </div>
    </motion.div>
  )
}
