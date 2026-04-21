import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/auth-provider";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const Providers = ({ children }: { children?: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children || <Outlet />}</AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );
};

export default Providers;
