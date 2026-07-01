"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  children?: React.ReactNode;
  pendingText?: string;
};

export function SubmitButton({
  children = "Submit",
  pendingText = "Processing...",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className="w-full"
      disabled={pending}
    >
      {pending ? pendingText : children}
    </Button>
  );
}