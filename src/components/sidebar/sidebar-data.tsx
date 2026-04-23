import {
  ClipboardPen,
  Contact2,
  HandCoins,
  Home,
  MapPin,
  ScrollTextIcon,
  Settings,
  Users,
} from "lucide-react";
import { ROUTES } from "../../routes/routes";
import type { SidebarData } from "./sidebar.types";


const sidebarData: SidebarData = [
  {
    icon: <Home />,
    label: "Dashboard",
    link: ROUTES.dashboard,
  },
  {
    icon: <HandCoins />,
    label: "Services",
    link: ROUTES.service.base,
  },

  {
    icon: <MapPin />,
    label: "About",
    link: ROUTES.about.editVison,
  },
  {
    icon: <ClipboardPen />,
    label: "Blog",
    children: [
      {
        label: "Blogs",
        link: ROUTES.blog.base,
      },
      {
        label: "Category",
        link: ROUTES.blog.category.base,
      },
      {
        label: "Tags",
        link: ROUTES.blog.tags,
      },
    ],
  },
  {
    icon: <Users />,
    label: "Team",
    link: ROUTES.team.base,
  },
  {
    icon: <Contact2 />,
    label: "Contact Us",
    link: ROUTES.contactUs.base,
  },
  {
    icon: <ScrollTextIcon />,
    label: "Testimonials",
    link: ROUTES.testimonials.base,
  },
  {
    icon: <Users />,
    label: "Content Management",
    children: [
      {
        label: "Home Page",
        children: [
          {
            label: "Carousel",
            link: ROUTES.cms.homecarousel,
          },
          {
            label: "Stats",
            link: ROUTES.cms.homestats,
          },
          {
            label: "Trusted By",
            link: ROUTES.cms.trustedBy,
          },
          {
            label: "Why Us",
            link: ROUTES.cms.whyUs,
          },
        ],
      },
      {
        label: "Practice Area Page",
        link: ROUTES.cms.practiceAreaContent,
      },
      {
        label: "About Page",
        children: [
          {
            label: "Main Content",
            link: ROUTES.cms.aboutmain,
          },
          {
            label: "Bottom Content",
            link: ROUTES.cms.aboutContent,
          },
        ],
      },
    ],
  },

  {
    icon: <Settings />,
    label: "Organization Settings",
    link: ROUTES.orgSettings.base,
  },
];
export default sidebarData;
