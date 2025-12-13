'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface AccessibilityPerformanceQAProps {
  className?: string
  onClose?: () => void
}

export function AccessibilityPerformanceQA({ className, onClose }: AccessibilityPerformanceQAProps) {
  const tools = (
    <ToolSection 
      tools={[
        genericTool("axe-core"),
        toolPill("lighthouse", "Lighthouse", "md"),
        genericTool("WAVE"),
        genericTool("WebPageTest")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Accessibility & Performance QA"
        summary="If it&apos;s slow or inaccessible, it doesn&apos;t matter how pretty it is. Test both."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Accessibility"
        enableComments={true}
        itemId="accessibility-performance-qa"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Accessibility isn&apos;t a nice-to-have. It&apos;s a legal requirement in many contexts, and more importantly, it&apos;s the right thing to do. About 15% of people have some form of disability. If they can&apos;t use your product, you&apos;ve excluded them.
          </p>
          <p>
            Performance matters too. Every second of load time costs conversions. Users on slow connections or older devices deserve a working experience, not a spinner that never stops.
          </p>
        </div>

        {/* How I test */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I test
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Automated scans.</strong> axe-core, Lighthouse, WAVE catch about 30-40% of issues. It&apos;s a start, not the finish.</li>
              <li><strong>Screen reader testing.</strong> NVDA or VoiceOver. If you can&apos;t navigate with a screen reader, it&apos;s broken.</li>
              <li><strong>Keyboard navigation.</strong> Can you tab through everything? Is the focus order logical? Is focus visible?</li>
              <li><strong>Core Web Vitals.</strong> LCP under 2.5 seconds, CLS under 0.1, INP under 200ms. Google ranks on this.</li>
              <li><strong>Real device testing.</strong> Throttle the network. Test on old phones. Your users aren&apos;t all on M3 Macs.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            You can navigate the entire product with just a keyboard. Lighthouse scores stay above 90. And no one files an accessibility complaint.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Accessibility" variant="default" size="sm" />
            <NavigationChip skill="Quality Assurance" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
