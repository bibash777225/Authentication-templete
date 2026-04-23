export const endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
  },
  user: {
    getAll: "/api/user",
    profile: "/auth/me",
  },
  aboutMission:{ 
    patch:()=>`/mission`
  },
  aboutVision:{
    patch:()=>`/vision`
  },
  aboutValues:{
    create:"/values-section",
    patch:(id:string|number)=>`/values-section${id}`
  },
  aboutValuesitem:{
    getAll:"/values-section",
update:(id: string | number)=>`/values-section${id}`
  },
  dashboard: {
    getdata: "/api/dashboard",
  },
} as const;
