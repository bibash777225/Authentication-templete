import type { ApiResponse, MediaDTO } from "../global.interface";

export interface IValuesItems {
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  sectionId: string;
  icon: MediaDTO ;
  iconId: string ;
  title: string;
  description: string;
  order: number;
}

export interface IValuesItemsPayloadDTO {
  title: string;
  iconId?: string | null;
  description:string;
}


export type IValuesItemsResponseDTO = ApiResponse<IValuesItems[]>;
export type IValuesItemsCreateResponseDTO = ApiResponse<null>;
export type IValuesItemsUpdateResponseDTO = ApiResponse<null>;
export type IValuesItemsDeleteResponseDTO = ApiResponse<null>;