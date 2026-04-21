import type { AxiosRequestConfig } from "axios";

import { Http } from "./axios";
import type { MethodType } from "./axios.type";

export const HttpClient = {
  get: <T>(url: string, config?: AxiosRequestConfig<T>) =>
    createRequest<T>("get", url, undefined, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig<T>) =>
    createRequest<T>("post", url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig<T>) =>
    createRequest<T>("put", url, data, config),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig<T>) =>
    createRequest<T>("patch", url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig<T>) =>
    createRequest<T>("delete", url, undefined, config),
};
const cleanParams = (params?: Record<string, string>) => {
  if (!params) return;
  const cleaned: Record<string, string> = {};
  Object.keys(params).forEach((key) => {
    const value = params[key];
    // Keep values that are not undefined, null, or an empty string
    if (value !== undefined && value !== null && value !== "") {
      cleaned[key] = value;
    }
  });
  return cleaned;
};
const createRequest = async <TData>(
  method: MethodType,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig<TData>,
) => {
  const params = cleanParams(config?.params);

  // try {
  switch (method) {
    case "get":
    case "delete":
      return await Http[method]<TData>(url, { ...config, params });
    case "post":
    case "put":
    case "patch":
      return await Http[method]<TData>(url, data, config);
    default:
      return Promise.reject("Method not supported");
  }
  // } catch (error) {
  //   const e = error as AxiosError<TError>;
  //   return {
  //     error: { status: e?.status, data: e?.response?.data },
  //   };
  // }
};
