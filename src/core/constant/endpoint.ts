export const endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
  },
  user: {
    getAll: "/api/user",
    profile: "/api/user/profile",
  },
} as const;
