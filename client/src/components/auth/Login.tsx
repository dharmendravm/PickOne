"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/actions/auth-actions";
import { toast } from "sonner";
import { SubmitButton } from "../common/submit-btn";
import { signIn } from "next-auth/react";
import OAuthButtons from "./OauthButton";

export default function Login() {
  const initialState = {
    status: 0,
    message: "",
    error: {},
  };

  const [state, formAction] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const status = state.status ?? 0;

    if (status === 0 || !state.message) return;

    if (status === 200) {
      toast.success(state.message);
      signIn("credentials", {
        email: state.data?.email,
        password: state.data?.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <OAuthButtons />
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="h-11 border-foreground/15 bg-background px-3 shadow-xs focus-visible:border-foreground/40 focus-visible:ring-2"
          required
        />
        {state?.errors?.email && (
          <p className="text-sm text-destructive">{state?.errors?.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-muted-foreground hover:underline"
          >
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
            className="h-11 border-foreground/15 bg-background px-3 pr-11 shadow-xs focus-visible:border-foreground/40 focus-visible:ring-2"
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
        {state?.errors?.password && (
          <p className="text-sm text-destructive">{state?.errors?.password}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="remember" name="remember" />
        <Label htmlFor="remember" className="font-normal text-muted-foreground">
          Remember me
        </Label>
      </div>

      <SubmitButton pendingText="Logging In...">Login</SubmitButton>
    </form>
  );
}
