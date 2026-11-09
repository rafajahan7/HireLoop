"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3Icon,
  BriefcaseIcon,
  MapPinIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const trendings = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

const stats = [
  {
    icon: BriefcaseIcon,
    value: "50K",
    label: "Active Jobs",
    alt: "50,000 active jobs on HireLoop",
  },
  {
    icon: BarChart3Icon,
    value: "12K",
    label: "Companies",
    alt: "12,000 companies hiring on HireLoop",
  },
  {
    icon: UsersIcon,
    value: "2M",
    label: "Job Seekers",
    alt: "2 million job seekers use HireLoop",
  },
  {
    icon: StarIcon,
    value: "97%",
    label: "Satisfaction Rate",
    alt: "97% satisfaction rate",
  },
]

function BadgeChip() {
  return (
    <div className="flex items-center gap-4">
      <div
        aria-hidden="true"
        className="hidden h-px w-16 bg-gradient-to-r from-transparent to-[#645bff]/70 sm:block"
      />
      <div className="flex items-center gap-3 rounded-full border border-white/15 bg-[linear-gradient(115deg,#474747,#010102)] px-6 py-3">
        <SparklesIcon
          aria-hidden="true"
          className="size-5 text-[#aec2f1]"
        />
        <p className="text-base text-[#ededef] md:text-lg">
          50,000+ new jobs this month
        </p>
      </div>
      <div
        aria-hidden="true"
        className="hidden h-px w-16 bg-gradient-to-l from-transparent to-[#645bff]/70 sm:block"
      />
    </div>
  )
}

function SearchBar() {
  const router = useRouter()
  const titleRef = React.useRef<HTMLInputElement>(null)
  const locationRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (titleRef.current?.value.trim()) params.set("q", titleRef.current.value.trim())
    if (locationRef.current?.value.trim()) params.set("location", locationRef.current.value.trim())
    router.push(`/jobs${params.size > 0 ? `?${params.toString()}` : ""}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col gap-2 rounded-2xl border border-white/20 bg-[#101010] p-2 pl-4 sm:flex-row sm:items-center sm:gap-6 sm:p-2 sm:pr-2 sm:pl-6"
    >
      <label className="flex h-11 flex-1 items-center gap-2 sm:h-10">
        <SearchIcon aria-hidden="true" className="size-5 shrink-0 text-[#ededef]" />
        <input
          ref={titleRef}
          type="search"
          name="q"
          placeholder="Job title, skill or company"
          className="w-full bg-transparent text-[15px] text-[#ededef] outline-none placeholder:text-[#ededef]/60"
        />
      </label>
      <div aria-hidden="true" className="hidden h-6 w-px bg-white/20 sm:block" />
      <label className="flex h-11 flex-1 items-center gap-2 sm:h-10">
        <MapPinIcon aria-hidden="true" className="size-5 shrink-0 text-[#ededef]" />
        <input
          ref={locationRef}
          type="search"
          name="location"
          placeholder="Location or Remote"
          className="w-full bg-transparent text-[15px] text-[#ededef] outline-none placeholder:text-[#ededef]/60"
        />
      </label>
      <Button
        type="submit"
        aria-label="Search jobs"
        size="icon-lg"
        className="size-12 shrink-0 rounded-xl border border-[#090a15] bg-[#5c53fe] text-[#ededef] hover:bg-[#645bff] hover:text-[#ededef]"
      >
        <SearchIcon />
      </Button>
    </form>
  )
}

function StatsSection() {
  return (
    <div className="flex flex-col items-center gap-9 px-4 py-14 sm:px-6 md:py-18">
      <p className="max-w-2xl text-center text-3xl leading-9 font-medium text-[#ededef] md:max-w-[600px] md:text-4xl md:leading-10">
        Assisting over 15,000 job seekers find their dream positions.
      </p>
      <ul className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <li
            key={stat.label}
            className="flex min-h-56 flex-col rounded-2xl border border-white/20 bg-[linear-gradient(135deg,#010102,#313131)] p-6"
          >
            <stat.icon aria-hidden="true" className="size-6 text-[#ededef]" />
            <div className="mt-14 flex flex-col gap-2 md:mt-auto">
              <p className="text-5xl font-medium text-[#ededef] md:text-[56px] md:leading-[64px]">
                {stat.value}
              </p>
              <p className="text-lg text-[#ededef]">{stat.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#010103] text-foreground">
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 z-[-1] size-[900px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(92,83,254,0.5)_0%,rgba(92,83,254,0.22)_30%,rgba(92,83,254,0.08)_55%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-10 z-[-2] size-96 rounded-full bg-[radial-gradient(circle,rgba(220,2,206,0.28)_0%,rgba(220,2,206,0.1)_45%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-52 z-[-2] mx-auto h-96 w-2xl max-w-full rounded-full bg-[radial-gradient(ellipse,rgba(92,83,254,0.4)_0%,rgba(92,83,254,0.15)_50%,transparent_100%)]"
      />

      {/* Hero content */}
      <div className="flex flex-col items-center gap-12 px-4 py-18 sm:px-6 md:py-24">
        <BadgeChip />
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="max-w-[689px] text-balance text-4xl leading-10 font-medium text-white sm:text-5xl sm:leading-13 md:text-[56px] md:leading-[64px]">
            Find Your Dream Job Today
          </h1>
          <p className="max-w-[784px] text-base text-white/70 md:text-lg">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role —
            faster.
          </p>
          <SearchBar />
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <span className="text-sm text-white/70 sm:text-base">
              Trending Position
            </span>
            {trendings.map((t) => (
              <a
                key={t}
                href="/jobs"
                className="rounded-full border border-white/15 bg-[#1a1a1b] px-3 py-1.5 text-sm text-white transition-colors hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-ring/50 outline-none"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatsSection />
    </section>
  )
}
