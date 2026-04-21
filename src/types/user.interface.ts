import type { ApiResponse, PaginatedApiResponse } from "./global.interface";


export interface Data {
  user: User;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  position: unknown; //currently unknown
  permission: unknown; //currently unknown
}

export type IGetProfileDTO = ApiResponse<Data>;
export type IGetAllUsersDTO = PaginatedApiResponse<User>;
export type IGetUserDTO = ApiResponse<Data>;
export type IPatchUserResponseDTO = ApiResponse<{
  success: true;
  updateDetails: Partial<Data>;
}>;
