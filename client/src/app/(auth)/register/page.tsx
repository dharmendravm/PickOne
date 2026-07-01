import Link from "next/link";

import { AuthShell } from "@/components/auth-shell";
import Register from "@/components/auth/Register";

export default function RegisterPage() {
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
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Start creating polls and voting
        </p>
      </div>

      <div className="mt-7">
        <Register />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-foreground hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
