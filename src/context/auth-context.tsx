
import type { ILoginRequestDTO, ILoginResponseDTO } from "@/types/auth.interface";
import type { IGetProfileDTO } from "@/types/user.interface";
import { createContext } from "react";

export type IAuthStatus =
  | {
      authStatus: "unauthenticated" | "loading";
      user?: undefined;
      role?: undefined;
    }
  | {
      authStatus: "authenticated";
      user: IGetProfileDTO["data"]["user"];
      role: string | null;
    };

export type IAuthenticated = Extract<
  IAuthStatus,
  { authStatus: "authenticated" }
>;

type IAuthContext = IAuthStatus & {
  login: (data: ILoginRequestDTO) => Promise<ILoginResponseDTO>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
