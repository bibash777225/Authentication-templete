import { ROUTES } from "@/routes/routes";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { useAuth } from "@/context/auth-provider";

const PrivateLayout = () => {
  // TODO: throw if not logged in
  const { authStatus } = useAuth();
  if (authStatus == "loading")
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (authStatus == "unauthenticated") return <Navigate to={ROUTES.login} />;
  return (
    <section className="flex flex-col h-dvh font-montserrat">
      <Header />
      <div className="flex flex-1 w-full overflow-hidden">
        <Sidebar />
        <div className="relative flex-1 bg-[#f9f9f9]/40 shadow-inner rounded-md overflow-hidden">
          <main className="absolute inset-0 m-3 lg:mx-6 lg:my-2 mr-0! pr-3 lg:pr-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
};

export default PrivateLayout;
