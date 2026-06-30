import type { ZodError } from "zod";

export const formatZodError = (error: ZodError): any => {
  let errors: Record<string, string> = {};

  const firstError = error.issues[0];

  if (firstError) {
    const fildName = firstError.path[0] as string;
    const fildError = firstError.message;

    errors = { [fildName]: fildError };
  }

  return errors;
};
