"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SubmitButton } from "../common/submit-btn";
import { resetPasswordAction } from "@/actions/auth-actions";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";


export default function ResetPassword() {
  const initialState = {
    status: 0,
    message: "",
    errors: {},
  };

  const searchParams = useSearchParams();
  const router = useRouter();
  const [state, formAction] = useActionState(resetPasswordAction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const status = state.status ?? 0;

    if (status === 0 || !state.message) return;

    if (status === 200) {
      toast.success(state.message);
      setTimeout(() => {
        router.replace("/login");
      }, 1000);
    } else {
      toast.error(state.errors?.message || state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-4">
      <input
        name="token"
        type="hidden"
        value={searchParams.get("token") ?? ""}
      />
      <div className="space-y-2">
        <Label htmlFor="email">Account</Label>

        <Input
          id="email"
          name="email"
          type="email"
          value={searchParams.get("email") ?? ""}
          readOnly
          tabIndex={-1}
          className="h-11 cursor-not-allowed border-muted bg-muted text-muted-foreground shadow-none focus-visible:ring-0"
        />
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
          <p className="text-sm text-destructive">{state?.errors?.password}</p>
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

      <SubmitButton pendingText="Resetting...">Reset Password</SubmitButton>
    </form>
  );
}
