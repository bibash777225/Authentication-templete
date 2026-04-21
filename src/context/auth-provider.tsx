import { use } from "react";
import { Outlet } from "react-router";
import { AuthContext, type IAuthStatus } from "./auth-context";
import { showSuccessMessage } from "./lib/helpers/sonner";
import type { ILoginRequestDTO } from "@/types/auth.interface";
import { useLoginApi, useLogoutApi } from "@/services/auth.api";
import { useGetMeApi } from "@/services/user.api";
export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const { data: myProfile, isLoading, error } = useGetMeApi();
  const { mutateAsync: loginMutation } = useLoginApi();
  const { mutateAsync: logoutMutation } = useLogoutApi();

  const getAuthStatus = (): IAuthStatus => {
    if (isLoading) return { authStatus: "loading" };

    if (error) return { authStatus: "unauthenticated" };

    if (myProfile && myProfile.data)
      return {
        authStatus: "authenticated",
        user: myProfile?.data?.data?.user,
        role: myProfile?.data?.data?.user?.role,
      };

    return { authStatus: "unauthenticated" };
  };

  const logout = async () => {
    const res = await logoutMutation();
    showSuccessMessage(res.data.message);
  };
  const login = async (data: ILoginRequestDTO) => {
    const res = await loginMutation(data);
    return res.data;
  };
  // if()
  return (
    <AuthContext.Provider value={{ ...getAuthStatus(), login, logout }}>
      {children || <Outlet />}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) throw "AuthContext Must be used inside provider";
  return context;
};
