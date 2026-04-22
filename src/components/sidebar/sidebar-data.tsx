import { ROUTES } from "@/routes/routes";
import { Home } from "lucide-react";
import type { SidebarData } from "./sidebar.types";

const sidebarData: SidebarData = [
  {
    icon: <Home />,
    label: "Dashboard",
    link: ROUTES.dashboard,
  }
]
export default sidebarData