import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-svh bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="grid size-8 place-items-center rounded-lg bg-gray-900 text-white">P</span>
            PickOne
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              Log in
            </Link>
          <Button asChild>
            <Link href="/register">Sign up</Link>
          </Button>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Can&apos;t decide? Ask everyone.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-gray-500 sm:text-lg">
            Create a poll with two choices, share it, and see what people pick.
          </p>
          <Button asChild size="lg" className="mt-7">
            <Link href="/login">
              Create your first poll
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <Card className="mx-auto mt-14 max-w-xl shadow-sm">
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">@alex · 2h ago</p>
              <h2 className="mt-1 font-semibold">What should I get for my desk?</h2>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">284 votes</span>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto justify-start p-4 text-left">
                <span>
                  <span className="block text-sm font-medium">Standing desk</span>
                  <span className="mt-2 block text-2xl font-bold">64%</span>
                </span>
              </Button>
              <Button variant="outline" className="h-auto justify-start p-4 text-left">
                <span>
                  <span className="block text-sm font-medium">Ergonomic chair</span>
                  <span className="mt-2 block text-2xl font-bold">36%</span>
                </span>
              </Button>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[64%] bg-primary" />
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">Tap an option to vote</p>
          </CardContent>
        </Card>

        <div className="mx-auto mt-16 grid max-w-2xl gap-8 text-center sm:grid-cols-3">
          <div>
            <p className="font-semibold">1. Create</p>
            <p className="mt-1 text-sm text-gray-500">Add two choices</p>
          </div>
          <div>
            <p className="font-semibold">2. Share</p>
            <p className="mt-1 text-sm text-gray-500">Send your poll</p>
          </div>
          <div>
            <p className="font-semibold">3. Decide</p>
            <p className="mt-1 text-sm text-gray-500">See the winner</p>
          </div>
        </div>
      </section>
    </main>
  );
}
