"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { CheckIcon, MenuIcon, MoonIcon, SunIcon } from "lucide-react";

import { UserMenu } from "./navbar/UserMenu";
import { navigationItems } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const isActiveRoute = (pathname: string, href: string) =>
  href === "/" ? pathname === href : pathname.startsWith(href);

function Brand() {
  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      aria-label="PickOne home"
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
        <CheckIcon className="size-4 stroke-[2.5]" aria-hidden="true" />
      </span>
      <span className="text-lg font-semibold tracking-tight">PickOne</span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";
  const isAuthenticated = status === "authenticated" && Boolean(session?.user);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-lg supports-backdrop-filter:bg-background/75 mb-2">
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Brand />

        <nav
          className="ml-4 hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          {navigationItems.map(({ href, label }) => {
            const active = isActiveRoute(pathname, href);
            return (
              <Button
                key={href}
                variant="ghost"
                size="sm"
                asChild
                className={cn(
                  "text-muted-foreground",
                  active && "bg-accent text-accent-foreground",
                )}
              >
                <Link href={href} aria-current={active ? "page" : undefined}>
                  {label}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={
              mounted
                ? `Switch to ${isDark ? "light" : "dark"} theme`
                : "Toggle theme"
            }
            title="Toggle theme"
          >
            {isDark ? (
              <SunIcon aria-hidden="true" />
            ) : (
              <MoonIcon aria-hidden="true" />
            )}
          </Button>

          {isAuthenticated && session?.user ? (
            <UserMenu user={session.user} />
          ) : status !== "loading" ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          ) : null}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="lg:hidden"
                aria-label="Open navigation"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="pr-14">
                <SheetTitle>
                  <Brand />
                </SheetTitle>
                <SheetDescription>Navigate PickOne</SheetDescription>
              </SheetHeader>
              <Separator />
              <nav
                className="flex flex-1 flex-col gap-1 p-4"
                aria-label="Mobile navigation"
              >
                {navigationItems.map(({ href, label, icon: Icon }) => {
                  const active = isActiveRoute(pathname, href);
                  return (
                    <SheetClose asChild key={href}>
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                          active && "bg-accent text-accent-foreground",
                        )}
                      >
                        <Icon className="size-4" aria-hidden="true" />
                        {label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
              {!isAuthenticated && (
                <div className="grid grid-cols-2 gap-2 border-t p-4">
                  <Button variant="outline" asChild>
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
