"use client";

import { useState, useEffect, useActionState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { registerAction } from "@/actions/auth-actions";
import type { AuthActionState } from "@/types/auth";
import { SubmitButton } from "@/components/common/submit-btn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import OAuthButtons from "./oauth-button";

export default function Register() {
  const initialState: AuthActionState = {
    status: 0,
    message: "",
    errors: {},
  };

  const [state, formAction] = useActionState(registerAction, initialState);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const status = state.status ?? 0;

    if (status === 0 || !state.message) return;

    if (status >= 200 && status < 300) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction} className="space-y-3.5">
      <OAuthButtons />
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          className="h-11 border-foreground/15 bg-background px-3 shadow-xs focus-visible:border-foreground/40 focus-visible:ring-2"
          required
        />
        {state?.errors?.name && (
          <p className="text-sm text-destructive">{state?.errors?.name}</p>
        )}
      </div>

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
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="h-11 border-foreground/15 bg-background px-3 pr-11 shadow-xs focus-visible:border-foreground/40 focus-visible:ring-2"
            minLength={8}
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
          <p className="text-sm text-destructive">
            {state?.errors?.password}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm_password">Confirm password</Label>
        <div className="relative">
          <Input
            id="confirm_password"
            name="confirm_password"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="h-11 border-foreground/15 bg-background px-3 pr-11 shadow-xs focus-visible:border-foreground/40 focus-visible:ring-2"
            minLength={8}
            required
          />

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        {state?.errors?.confirm_password && (
          <p className="text-sm text-destructive">
            {state?.errors?.confirm_password}
          </p>
        )}
      </div>

      <SubmitButton pendingText="Account creating...">
        Create account
      </SubmitButton>
    </form>
  );
}
