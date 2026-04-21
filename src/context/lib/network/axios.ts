import { Env } from "@/core/constant/env";
import axios, {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
} from "axios";

const ONE_MINUTE_IN_MS = 60 * 1000;

export const Http = axios.create({
  baseURL: Env.baseApiUrl,
  timeout: ONE_MINUTE_IN_MS,
  withCredentials: true,
});

const requestInterceptor = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  if (!(config.headers instanceof AxiosHeaders)) {
    config.headers = new AxiosHeaders(config.headers);
  }
  return config;
};

const requestErrorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

Http.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
