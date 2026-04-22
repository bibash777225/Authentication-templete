import { createBrowserRouter, type RouteObject } from "react-router";
import { ROUTES } from "./routes";
import PublicLayout from "@/components/layouts/public-layout";
import Login from "@/pages/login/login-page";
import PrivateLayout from "@/components/layouts/private-layout";
import Dashboard from "@/pages/dashboard/dashboard";
import MainLayout from "@/components/layouts/main-layout";
import Providers from "@/provider";
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
    ]
  }
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
