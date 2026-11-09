import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className={cn("flex shrink-0 items-center outline-none focus-visible:ring-3 focus-visible:ring-ring/50", className)}
    >
      <Image
        src="/hireloop-logo.png"
        alt="HireLoop"
        width={382}
        height={102}
        priority
        className="h-9 w-auto sm:h-10 md:h-11"
      />
    </Link>
  )
}
