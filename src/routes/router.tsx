import { createBrowserRouter, type RouteObject } from "react-router";
import { ROUTES } from "./routes";
import PublicLayout from "@/components/layouts/public-layout";
import Login from "@/pages/login/login-page";
import PrivateLayout from "@/components/layouts/private-layout";
import Dashboard from "@/pages/dashboard/dashboard";
import MainLayout from "@/components/layouts/main-layout";
import Providers from "@/provider";
import Aboutcontent from "@/pages/aboutcontent/aboutcontent";
import MissionPage from "@/pages/mission/mission-page";
import VisionPage from "@/pages/vision/vision.page";
import AboutValuesSectionPage from "@/pages/aboutvalues-section/aboutvaluessection.page";
import TrustedPage from "@/pages/trusted/trusted-page";
import ToolsPage from "@/pages/tools/page";

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
        path: ROUTES.cms.aboutContent,
        element: <Aboutcontent />,
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
        element: <TrustedPage/>,
      },
      {
        path: ROUTES.about.valuesitem.base,
        element: <AboutValuesSectionPage />,
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
