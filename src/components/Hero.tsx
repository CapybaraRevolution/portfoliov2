'use client'

import Image from 'next/image'
import { Button } from '@/components/Button'
import kyleMcGrawPhoto from '@/images/kyle-mcgraw.jpg'

export function Hero() {
  return (
    <div className="bg-white dark:bg-zinc-900">
      <div className="relative isolate pt-14">
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] dark:mask-[radial-gradient(100%_100%_at_top_right,black,transparent)] stroke-zinc-200 dark:stroke-zinc-700"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-zinc-50 dark:fill-zinc-800/50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
        </svg>
        <div className="mx-auto max-w-7xl py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <div className="flex">
              <div className="relative flex items-center gap-x-4 rounded-full bg-white dark:bg-zinc-800 px-4 py-1 text-sm/6 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-900/10 dark:ring-white/10 hover:ring-zinc-900/20 dark:hover:ring-white/20">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Available for hire</span>
                <span aria-hidden="true" className="h-4 w-px bg-zinc-900/10 dark:bg-white/10" />
                <a href="/services" className="flex items-center gap-x-1">
                  <span aria-hidden="true" className="absolute inset-0" />
                  View Services
                  <span aria-hidden="true" className="text-zinc-400 dark:text-zinc-500">→</span>
                </a>
              </div>
            </div>
            <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-zinc-900 dark:text-white sm:text-7xl">
              Who Am I?
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-zinc-600 dark:text-zinc-300 sm:text-xl/8">
              My name is Kyle McGraw, and I&apos;m a Product Owner & UX Designer. I help companies build better digital products through user-centered design, strategic thinking, and data-driven decision making.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button href="/case-studies/ecommerce" variant="filled">
                View My Work
              </Button>
              <Button href="/contact" variant="outline">
                Let&apos;s Connect
              </Button>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
            <div className="mx-auto max-w-md lg:max-w-none">
              <Image
                src={kyleMcGrawPhoto}
                alt="Kyle McGraw - Product Owner & UX Designer"
                className="w-full rounded-2xl shadow-xl ring-1 ring-zinc-900/10 dark:ring-white/10"
                priority
                placeholder="blur"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}