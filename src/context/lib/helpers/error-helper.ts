import { isAxiosError } from "axios";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

interface ApiErrorResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ParsedApiError {
  status?: number;
  code?: string;
  message: string;
  response?: ApiErrorResponse;
  raw?: unknown;
}

/**
 * Parse any API error (Axios or otherwise) into a consistent format.
 * This ensures all layers of your app receive structured error data.
 */
export function parseApiError(error: unknown): ParsedApiError {
  const defaultError: ParsedApiError = {
    message: "Something went wrong. Please try again later.",
  };

  // Handle Axios errors
  if (isAxiosError(error)) {
    const axiosError = error;

    const status = axiosError.response?.status;
    const data = axiosError.response?.data;

    // Try to extract meaningful info from backend response
    const message =
      typeof data === "string"
        ? data
        : data?.message ||
          data?.error ||
          axiosError.message ||
          defaultError.message;

    const code =
      (data && (data.code || data.errorCode)) ||
      (axiosError.code as string | undefined);

    return {
      status,
      code,
      message,
      response:
        typeof data === "object" && data !== null ? { ...data } : undefined,
      raw: axiosError,
    };
  }

  // Handle native Error objects
  if (error instanceof Error) {
    return {
      message: error.message || defaultError.message,
      raw: error,
    };
  }

  // Handle string or unexpected error shapes
  if (typeof error === "string") {
    return {
      message: error,
    };
  }

  return defaultError;
}

/**
 * Optional helper — you can use this in UI layers to extract the display message safely.
 */
export function getErrorMessage(error: unknown): string {
  return parseApiError(error).message;
}

export interface IApiErrorRes {
  status: number | null;
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response?: any;
}

export const setFormError = <T extends FieldValues>(
  errors: unknown,
  setError: UseFormSetError<T>,
) => {
  if (isAxiosError(errors) && errors.status == 422) {
    const res = errors.response?.data;
    const errorEntries = res?.errors;
    // showErrorMessage(errors.message)
    Object.entries(errorEntries)?.forEach(([key, value]) => {
      if (typeof key === "string" && typeof value === "string") {
        setError(key as Path<T>, { message: value });
      }
    });
  }
};
