"use client";

import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SubmitButton } from "../common/submit-btn";
import { forgotPasswordAction } from "@/actions/auth-actions";

export default function ForgotPassword() {
  const initialState = {
    status: 0,
    message: "",
    error: {},
  };

  const [state, formAction] = useActionState(
    forgotPasswordAction,
    initialState,
  );

  useEffect(() => {
    const status = state.status ?? 0;

    if (status === 0 || !state.message) return;

    if (status === 200) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
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

      <SubmitButton pendingText="Processing...">Send Reset Link</SubmitButton>
    </form>
  );
}
