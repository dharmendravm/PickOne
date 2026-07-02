import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 p-4 sm:p-6">
      <Card className="w-full max-w-4xl rounded-3xl py-0 shadow-xl shadow-foreground/5 ring-1 ring-foreground/15">
        <CardContent className="grid p-0 md:grid-cols-[1fr_0.9fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:px-12">{children}</div>

          <div className="order-first flex items-center justify-center bg-[#f3faf4] p-5 md:order-last md:p-8">
            <Image
              src="/auth_split_image.svg"
              alt="People making a choice together"
              width={500}
              height={500}
              className="h-44 w-full object-contain md:h-auto"
              priority
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
