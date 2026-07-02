import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import Login from "@/components/auth/Login";

export default function LoginPage() {

  return (
    <AuthShell>
        <div className="text-center">
          <Link
            href="/"
            className="mx-auto mb-3 grid size-10 place-items-center rounded-xl bg-primary text-lg font-bold text-primary-foreground"
          >
            P
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Good to see you again</h1>
          <p className="mt-1 text-sm text-muted-foreground">Ready to make things happen again?</p>
        </div>

        <div className="mt-6">
          <Login />

          <p className="mt-5 rounded-lg border border-foreground/15 px-4 py-3 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-[#8f00e8] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
    </AuthShell>
  );
}
