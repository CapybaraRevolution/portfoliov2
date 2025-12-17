'use client'

export default function EyebrowDemo() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 py-24 px-6">
      <div className="mx-auto max-w-4xl space-y-24">
        
        {/* Current Style */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Current</div>
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Option 1: Subtle Left Border */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 1: Left Border</div>
          <span className="pl-3 border-l-2 border-zinc-300 dark:border-zinc-600 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Option 2: Pill/Badge Style */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 2: Pill/Badge</div>
          <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-400 ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Option 3: Underline Accent */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 3: Underline</div>
          <span className="inline-block border-b-2 border-zinc-300 dark:border-zinc-600 pb-1 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Option 4: Dot Prefix */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 4: Dot Prefix</div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Option 5: Subtle Glow */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 5: Subtle Glow</div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 drop-shadow-sm">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Option 6: Small Caps with Wider Spacing */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 6: Small Caps</div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Option 7: Monospace Tech */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 7: Monospace</div>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Option 8: Slash Prefix */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 8: Slash Prefix</div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-400 dark:text-zinc-500 mr-2">/</span>Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Option 9: Subtle Background */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 9: Subtle Background</div>
          <span className="inline-block bg-zinc-50 dark:bg-zinc-800/50 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Small Caps with Color Variations */}
        <div className="pt-8 mb-8">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Small Caps + Color Variations</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-12">Let's explore different colors with the small caps style</p>
        </div>

        {/* Option 10: Small Caps + Emerald */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 10: Small Caps + Emerald</div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Option 11: Small Caps + Teal */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 11: Small Caps + Teal</div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Option 12: Small Caps + Blue */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 12: Small Caps + Blue</div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Option 13: Small Caps + Indigo */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 13: Small Caps + Indigo</div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Option 14: Small Caps + Slate */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 14: Small Caps + Slate</div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

        {/* Option 15: Small Caps + Amber */}
        <section className="pb-16">
          <div className="mb-2 text-sm font-medium text-zinc-400">Option 15: Small Caps + Amber</div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Context
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            In 2016, Cornell combined three business schools under the SC Johnson College of Business. By 2024, the web experience still behaved like three separate institutions with different navigation patterns, different terminology, and different page structures.
          </p>
        </section>

      </div>
    </div>
  )
}
