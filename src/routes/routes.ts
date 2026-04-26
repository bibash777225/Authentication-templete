export const ROUTES = {
  login: "/login",
  dashboard: "/",
  service: {
    base: "/all-service",
    editService: "/service/edit/:id",
    newService: "/new-service",
  },
  about: {
    Vison: "/vision",
    mission: "/mission",
    valuessection: {
      create: "/values-section",
      editMission: "/values-section/edit/:id",
    },
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
