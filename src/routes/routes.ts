export const ROUTES = {
  login: "/login",
  dashboard: "/",
  service: {
    base: "/all-service",
    editService: "/service/edit/:id",
    newService: "/new-service",
  },
  tools: {
    base: "/tools",
  },
  trustedby:{
    base:"/trusted-by"

  },
  about: {
    Vison: "/vision",
    mission: "/mission",
    valuesitem: {
      base:"/valueitems",
      create: "/values-item",
      edit: "/values-item/edit/:id",
    },
    Teammembers:{
      base:"/team-members",
    }
  },
  contact:{
    base:"/contact"
  },
  blog: {
    base: "/all-blog",
    view: "/blog/details/:id",
    editBlog: "/blog/edit/:id",
    newBlog: "/new-blog",
    category: {
      base: "/all-blog-category",
      editBlogCategory: "/blog-category/edit/:id",
      newBlogCategory: "/new-blog-category",
    },
    tags: "/blog/tags",
  },
  team: {
    base: "/all-team",
  },
  contactUs: {
    base: "/contactus",
  },
  testimonials: {
    base: "/all-testimonials",
  },
  cms: {
    trustedBy: "/cms/trustedBy",
    whyUs: "/cms/whyUs",
    homestats: "/cms/home-stats",
    homecarousel: "/cms/home-carousel",
    practiceAreaContent: "/cms/practice-area",
    aboutmain: "/cms/about-main",
    aboutContent: "/cms/about-content",
  },

  orgSettings: {
    base: "/org-settings",
  },
};
