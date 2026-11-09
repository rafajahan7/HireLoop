
"use client"

import * as React from "react"
import Link from "next/link"
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/site/logo"

interface LoginData {
  email: string
  password: string
  remember: boolean
  provider?: "github"
}

interface RegisterData {
  name: string
  email: string
  password: string
  terms: boolean
  provider?: "github"
}

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#010103] px-4 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 z-[-1] size-[900px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(92,83,254,0.4)_0%,rgba(92,83,254,0.18)_32%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-10 z-[-2] size-80 rounded-full bg-[radial-gradient(circle,rgba(220,2,206,0.22)_0%,transparent_70%)]"
      />
      <div className="w-full max-w-md">{children}</div>
    </main>
  )
}

const inputClass =
  "h-11 w-full rounded-xl border-white/10 bg-white/[0.06] px-3.5 pl-10 text-[15px] text-[#ededef] placeholder:text-[#ededef]/40 hover:bg-white/[0.08] dark:bg-white/[0.06] dark:hover:bg-white/[0.08]"

const checkboxClass =
  "size-4 border-white/15 bg-white/[0.06] dark:bg-white/[0.06] data-checked:border-[#5c53fe] data-checked:bg-[#5c53fe] data-checked:text-[#ededef]"

function GitHubButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="lg"
      onClick={onClick}
      className="h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] text-[15px] font-medium text-[#ededef] hover:bg-white/10 hover:text-[#ededef]"
    >
      <GitHubMark />
      Continue with GitHub
    </Button>
  )
}

function OrDivider() {
  return (
    <div className="flex items-center gap-3">
      <div aria-hidden="true" className="h-px flex-1 bg-white/10" />
      <span className="text-xs text-[#ededef]/50">
        or continue with email
      </span>
      <div aria-hidden="true" className="h-px flex-1 bg-white/10" />
    </div>
  )
}

function PasswordInputWithToggle({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (next: string) => void
  placeholder: string
}) {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="relative">
      <LockIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#ededef]/50"
      />

      <Input
        type={visible ? "text" : "password"}
        name="password"
        autoComplete="new-password"
        placeholder={placeholder}
        className={inputClass}
        required
        minLength={8}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button
        type="button"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((v) => !v)}
        className="absolute top-1/2 right-2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#ededef]/60 outline-none transition-colors hover:bg-white/10 hover:text-[#ededef] focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {visible ? (
          <EyeOffIcon className="size-4" />
        ) : (
          <EyeIcon className="size-4" />
        )}
      </button>
    </div>
  )
}

const authLinkClass =
  "text-[#645bff] underline-offset-4 outline-none transition-colors hover:underline hover:text-[#7a71ff] focus-visible:ring-3 focus-visible:ring-ring/50"

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={cn("size-4", className)}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  )
}

// SIGN IN FORM


export function SignInForm() {
  const [data, setData] = React.useState<LoginData>({
    email: "",
    password: "",
    remember: false,
  })

  const [loading, setLoading] = React.useState(false)

  const handleField =
    <K extends keyof LoginData>(key: K) =>
    (value: LoginData[K]) =>
      setData((d) => ({ ...d, [key]: value }))

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    setLoading(true)

    try {
      const { data: loginResponse, error } =
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
          callbackURL: "/",
        })

      if (error) {
        console.log("Login error:", error)
        alert(error.message || "Login failed. Please check your credentials.")
        return
      }

      console.log("Login successful:", loginResponse)
      window.location.href = "/"

    } catch (error) {
      console.error("Something went wrong:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGitHub = () => {
    console.log("GitHub sign-in selected")
  }

  return (
    <AuthShell>
      <div className="rounded-2xl border border-white/10 bg-[#1a1a1f] p-6 shadow-xl sm:p-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <Logo />
          <h1 className="pt-4 text-2xl font-medium text-[#ededef]">
            Welcome back
          </h1>
          <p className="text-sm text-[#ededef]/60">
            Find your dream job — or your next hire today.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <GitHubButton onClick={handleGitHub} />
          <OrDivider />

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative">
              <MailIcon
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#ededef]/50"
              />
              <Input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email address"
                className={inputClass}
                required
                value={data.email}
                onChange={(e) => handleField("email")(e.target.value)}
              />
            </div>

            <PasswordInputWithToggle
              value={data.password}
              onChange={handleField("password")}
              placeholder="Password"
            />

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-[#ededef]/70">
                <Checkbox
                  className={checkboxClass}
                  checked={data.remember}
                  onCheckedChange={(next) =>
                    handleField("remember")(next === true)
                  }
                />
                Remember me
              </label>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className={authLinkClass}
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="h-11 w-full rounded-xl border border-[#090a15] bg-[#5c53fe] text-[15px] font-medium text-[#ededef] hover:bg-[#645bff] hover:text-[#ededef]"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-[#ededef]/60">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className={authLinkClass}>
          Sign Up
        </Link>
      </p>
    </AuthShell>
  )
}


// SIGN UP FORM

export function RegisterForm() {
  const [data, setData] = React.useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    terms: false,
  })

  const [loading, setLoading] = React.useState(false)

  const handleField =
    <K extends keyof RegisterData>(key: K) =>
    (value: RegisterData[K]) =>
      setData((d) => ({ ...d, [key]: value }))

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!data.terms) {
      alert("Please accept the Terms of Service.")
      return
    }

    setLoading(true)

    try {
      const { data: signUpResponse, error } =
        await authClient.signUp.email({
          name: data.name,
          email: data.email,
          password: data.password,
          callbackURL: "/",
        })

      if (error) {
        console.log("Signup error:", error)
        alert(error.message)
        return
      }

      console.log("Signup successful:", signUpResponse)
      alert("Account created successfully!")

    } catch (error) {
      console.error("Something went wrong:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGitHub = () => {
    console.log("GitHub sign-up selected")
  }

  return (
    <AuthShell>
      <div className="rounded-2xl border border-white/10 bg-[#1a1a1f] p-6 shadow-xl sm:p-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <Logo />
          <h1 className="pt-4 text-2xl font-medium text-[#ededef]">
            Create your account
          </h1>
          <p className="text-sm text-[#ededef]/60">
            Join thousands of job seekers and companies.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <GitHubButton onClick={handleGitHub} />
          <OrDivider />

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative">
              <UserIcon
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#ededef]/50"
              />
              <Input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Full name"
                className={inputClass}
                required
                value={data.name}
                onChange={(e) => handleField("name")(e.target.value)}
              />
            </div>

            <div className="relative">
              <MailIcon
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#ededef]/50"
              />
              <Input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email address"
                className={inputClass}
                required
                value={data.email}
                onChange={(e) => handleField("email")(e.target.value)}
              />
            </div>

            <PasswordInputWithToggle
              value={data.password}
              onChange={handleField("password")}
              placeholder="Password (min. 8 characters)"
            />

            <label className="flex cursor-pointer items-start gap-2 text-sm leading-5 text-[#ededef]/70">
              <Checkbox
                className={cn(checkboxClass, "mt-0.5")}
                checked={data.terms}
                onCheckedChange={(next) =>
                  handleField("terms")(next === true)
                }
              />
              I agree to the{" "}
              <span className={authLinkClass}>Terms of Service</span> and{" "}
              <span className={authLinkClass}>Privacy Policy</span>
            </label>

            <Button
              type="submit"
              size="lg"
              disabled={!data.terms || loading}
              className="h-11 w-full rounded-xl border border-[#090a15] bg-[#5c53fe] text-[15px] font-medium text-[#ededef] hover:bg-[#645bff] hover:text-[#ededef]"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-[#ededef]/60">
        Already have an account?{" "}
        <Link href="/sign-in" className={authLinkClass}>
          Sign In
        </Link>
      </p>
    </AuthShell>
  )
}
