import type { ApiResponse, MediaDTO, PaginatedApiResponse } from "../global.interface";


export interface ITrusted {
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  logo: MediaDTO | null;
  logoId: string | null;
}

export type IGetAllTrustedResponseDTO = PaginatedApiResponse<ITrusted>;
export type IGetTrustedByIdResponseDTO = ApiResponse<ITrusted>;
export type ITrustedPostResponseDTO = ApiResponse<null>;
export type ITrustedUpdateResponseDTO = ApiResponse<null>;
export type ITrustedDeleteResponseDTO = ApiResponse<null>;

export interface ITrustedPayloadDTO {
  name: string;
  logoId?: string | null;
}
