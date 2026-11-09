
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/site/logo"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/company", label: "Company" },
  { href: "/pricing", label: "Pricing" },
]

function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <ul className={cn("flex items-center", className)}>
      {navLinks.map((link) => {
        const active = pathname === link.href

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex h-9 items-center rounded-lg px-3 text-[15px] transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                active
                  ? "bg-white/10 text-[#ededef]"
                  : "text-[#ededef]/70 hover:bg-white/5 hover:text-[#ededef]"
              )}
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

function AuthActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link
        href="/sign-in"
        className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-[15px] font-semibold text-[#645bff] transition-colors hover:bg-white/10 hover:text-[#7a71ff]"
      >
        Sign In
      </Link>

      <Link
        href="/sign-up"
        className="inline-flex h-10 items-center justify-center rounded-xl border border-[#090a15] bg-[#5c53fe] px-4 text-[15px] font-medium text-[#ededef] transition-colors hover:bg-[#645bff]"
      >
        Get Started
      </Link>
    </div>
  )
}

function NavbarDivider({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-px w-6 bg-[#a8a8a8]/50", className)}
      {...props}
    />
  )
}

export function SiteNavbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = React.useState(false)

  // Auth pages have their own logo, so hide the navbar
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Logo />

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 rounded-2xl border border-white/10 bg-[#1a1a1f] p-2 pl-3 md:flex"
        >
          <NavLinks />
          <NavbarDivider />
          <AuthActions />
        </nav>

        {/* Mobile navigation */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon-lg"
                aria-label="Open menu"
                className="shrink-0 md:hidden"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>

          <SheetContent
            side="right"
            showCloseButton
            className="w-80 max-w-[85vw] gap-0 border-white/10 bg-[#1a1a1f] p-0 text-[#ededef]"
          >
            <div className="flex items-center border-b border-white/10 p-4 pr-12">
              <Logo />
              <SheetTitle className="sr-only">
                HireLoop navigation
              </SheetTitle>
            </div>

            <NavLinks className="flex-col items-stretch gap-1 p-3 [&>li>a]:h-11 [&>li>a]:text-base" />

            <NavbarDivider className="mx-3 w-auto flex-1" />

            <AuthActions className="flex-col items-stretch gap-2 p-3 [&>a]:h-11 [&>a]:w-full" />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
