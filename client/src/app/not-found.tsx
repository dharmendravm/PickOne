import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/40 p-4 sm:p-6">
      <Card className="w-full max-w-4xl py-0 shadow-sm">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="flex flex-col justify-center p-7 sm:p-10 md:p-12">
            <Link href="/" className="mb-10 flex items-center gap-2 font-bold">
              <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                P
              </span>
              PickOne
            </Link>

            <p className="text-sm font-medium text-muted-foreground">404 · Page not found</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Looks like you&apos;re lost</h1>
            <p className="mt-3 max-w-sm leading-7 text-muted-foreground">
              The page you&apos;re looking for was moved, deleted, or never existed.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/">
                  <ArrowLeft />
                  Back to home
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/login">Log in</Link>
              </Button>
            </div>
          </div>

          <div className="order-first flex items-center bg-[#f3faf4] p-5 md:order-last md:p-8">
            <Image
              src="/404_page_image.svg"
              alt="Lost traveler looking for the right direction"
              width={750}
              height={500}
              className="h-auto w-full"
              priority
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
