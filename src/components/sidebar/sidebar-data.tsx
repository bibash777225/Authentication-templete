import {
  ClipboardPen,
  Contact2,
  HandCoins,
  Home,
  MapPin,
  MessageSquareQuote,
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
    // link: ROUTES.about.editVison,
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
    icon: <MessageSquareQuote/>,
    label: "Get a Quote",
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
        label: "About Page",
        children: [
          {
            label: "Mission",
            link: ROUTES.about.mission,
          },
          {
            label: "Vission",
            link: ROUTES.about.Vison,
          },
          {
            label: "Value Section",
            // link: ROUTES.about.valuessection,
          },
          {
            label: "Company Info",
            // link: ROUTES.about.valuessection,
          },
        ],
      },
    ],
  },

  {
    icon: <Settings />,
    label: "Site Settings",
    link: ROUTES.orgSettings.base,
  },
];
export default sidebarData;
