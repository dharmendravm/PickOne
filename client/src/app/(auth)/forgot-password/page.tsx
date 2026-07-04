import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import ForgotPassword from "@/components/auth/ForgotPassword";

export default function ForgotPasswordPage() {
  return (
    <AuthShell>
      <div className="text-center">
        <Link
          href="/"
          className="mx-auto mb-3 grid size-10 place-items-center rounded-xl bg-primary text-lg font-bold text-primary-foreground"
        >
          P
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot your password?
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>

      <div className="mt-6">
        <ForgotPassword />

        <p className="mt-5 rounded-lg border border-foreground/15 px-4 py-3 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#8f00e8] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}