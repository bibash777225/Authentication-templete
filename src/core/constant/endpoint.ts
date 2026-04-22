export const endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
  },
  user: {
    getAll: "/api/user",
    profile: "/auth/me",
  },
  dashboard: {
    getdata: "/api/dashboard",
  },
} as const;
