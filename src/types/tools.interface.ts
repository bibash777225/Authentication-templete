import type {
  ApiResponse,
  MediaDTO,
  PaginatedApiResponse,
} from "./global.interface";

export interface ITool {
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  image: MediaDTO | null;
  imageId: string | null;
}

export type IGetAllToolsResponseDTO = PaginatedApiResponse<ITool>;
export type IGetToolByIdResponseDTO = ApiResponse<ITool>;
export type IToolPostResponseDTO = ApiResponse<null>;
export type IToolUpdateResponseDTO = ApiResponse<null>;
export type IToolDeleteResponseDTO = ApiResponse<null>;

export interface IToolPayloadDTO {
  name: string;
  imageId?: string | null;
}
