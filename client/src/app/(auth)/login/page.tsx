"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell>
        <div className="text-center">
          <Link
            href="/"
            className="mx-auto mb-3 grid size-10 place-items-center rounded-xl bg-primary text-lg font-bold text-primary-foreground"
          >
            P
          </Link>
          <p className="font-bold">PickOne</p>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to continue to your account</p>
        </div>

        <div className="mt-7">
          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs font-medium text-muted-foreground hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-11 pr-11"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" name="remember" />
              <Label htmlFor="remember" className="font-normal text-muted-foreground">
                Remember me
              </Label>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-foreground hover:underline">
              Sign up
            </Link>
          </p>
        </div>
    </AuthShell>
  );
}
