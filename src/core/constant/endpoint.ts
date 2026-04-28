export const endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
  },
  user: {
    getAll: "/api/user",
    profile: "/auth/me",
  },
  aboutMission: {
    get: `/mission`,
    patch: `/mission`,
  },
  aboutVision: {
    get: `/vision`,
    patch: `/vision`,
  },
  aboutValues: {
    get: `/values-section`,
    create: "/values-section",
    patch: (id: string | number) => `/values-section${id}`,
  },
  aboutValuesitem: {
    getAll: "/values-section",
    update: (id: string | number) => `/values-section${id}`,
  },
  dashboard: {
    getdata: "/api/dashboard",
  },
  tools: {
    get: "/tools",
    getById: (id: string | number) => `/tools/${id}`,
    post: "/tools",
    delete: (id: string | number) => `/tools/${id}`,
    update: (id: string | number) => `/tools/${id}`,
  },
  media: {
    uploadOne: "/media/upload",
    // uploadMany: "/api/media/uploads",
  },
} as const;
