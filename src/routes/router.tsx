import { createBrowserRouter, type RouteObject } from "react-router";
import { ROUTES } from "./routes";
import PublicLayout from "@/components/layouts/public-layout";
import Login from "@/pages/login/login-page";
import PrivateLayout from "@/components/layouts/private-layout";
import Dashboard from "@/pages/dashboard/dashboard";
import MainLayout from "@/components/layouts/main-layout";
import Providers from "@/provider";
import MissionPage from "@/pages/about/mission/mission-page";
import VisionPage from "@/pages/about/vision/vision.page";
import TrustedPage from "@/pages/homes/trusted/trusted-page";
import ToolsPage from "@/pages/homes/tools/tool-page";
import AboutValuesItemsPage from "@/pages/about/aboutvalues-items/aboutvaluesitems.page";
import MemberPage from "@/pages/about/team-members/members-page";
import ContactPage from "@/pages/contact/contact-page";
import BlogPage from "@/pages/blog/blog-page";


const publicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: ROUTES.login,
        element: <Login />,
      },
    ],
  },
];
const protectedRoutes: RouteObject[] = [
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      {
        path: ROUTES.about.mission,
        element: <MissionPage />,
      },
      {
        path: ROUTES.about.Vison,
        element: <VisionPage />,
      },
      {
        path: ROUTES.tools.base,
        element: <ToolsPage />,
      },
      {
        path: ROUTES.trustedby.base,
        element: <TrustedPage />,
      },
      {
        path: ROUTES.about.valuesitem.base,
        element: <AboutValuesItemsPage />,
      },
      {
        path: ROUTES.about.Teammembers.base,
        element: <MemberPage/>,
      },
      {
        path: ROUTES.contact.base,
        element: <ContactPage/>,
      },
      {
        path: ROUTES.blog.base,
        element: <BlogPage/>,
      },
      
    ],
  },
];
export const appRouter = createBrowserRouter([
  {
    element: <Providers />,
    children: [
      {
        element: <MainLayout />,
        children: [...publicRoutes, ...protectedRoutes],
      },
    ],
  },
]);
