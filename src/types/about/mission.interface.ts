import type { ApiResponse, MediaDTO } from "../global.interface";

export interface IMission {
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  iconId: string;
  title: string;
  description: string;
  icon: MediaDTO; 
}

export type IMissionGetResponseDTO = ApiResponse<IMission>;
export type IMissionPatchResponseDTO = ApiResponse<null>;

export interface IMissionUpdateDTO {
  iconId: string;
  title: string;
  description: string;
}
