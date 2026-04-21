import { type ExternalToast, toast } from "sonner";
import { getErrorMessage } from "./error-helper";

export const showSuccessMessage = (message: string, prop?: ExternalToast) => {
  toast.success(message, {
    duration: 2000,
    ...prop,
  });
};
export const showErrorMessage = (message: string, prop?: ExternalToast) => {
  toast.error(message, {
    duration: 2000,
    ...prop,
  });
};
export const showApiErrorMessage = (error: unknown, prop?: ExternalToast) => {
  toast.error(getErrorMessage(error), {
    duration: 2000,
    ...prop,
  });
};
