import { AnimatedBeamMultipleOutputDemo } from '@/components/AnimatedBeamMultipleOutputDemo'
import { RaycastInspiredGallery } from '@/components/RaycastInspiredGallery'
import ThreeDMarqueeDemo from '@/components/ThreeDMarqueeDemo'

export const metadata = {
  title: 'Raycast Lab',
  description: 'Internal playground for Raycast-inspired UI experiments.',
}

export default function RaycastLabPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-50 sm:px-10">
      <section className="mx-auto max-w-5xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
          Lab / Raycast
        </p>
        <h1 className="text-balance text-4xl font-semibold sm:text-5xl">Raycast-inspired playground</h1>
        <p className="max-w-3xl text-sm text-zinc-400 sm:text-base">
          Internal-only experiments for the future Services page. Nothing here is wired into production
          navigation yet.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-6xl space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white">Figure gallery</h2>
          <p className="text-sm text-zinc-400">
            Raycast-style figure cards and SVG treatments pulled from the experiments.
          </p>
        </div>
        <RaycastInspiredGallery />
      </section>

      <section className="mx-auto mt-14 max-w-6xl space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white">3D marquee</h2>
          <p className="text-sm text-zinc-400">
            Logo marquee with motion and depth cues; useful for social proof strips.
          </p>
        </div>
        <ThreeDMarqueeDemo />
      </section>

      <section className="mx-auto mt-14 max-w-6xl space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white">Animated beams</h2>
          <p className="text-sm text-zinc-400">
            Connection diagram showing multi-output beam paths for future services storytelling.
          </p>
        </div>
        <AnimatedBeamMultipleOutputDemo />
      </section>
    </main>
  )
}
