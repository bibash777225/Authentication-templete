import type { ApiResponse, MediaDTO } from "../global.interface";

export interface IValueItems {
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  sectionId: string;
  image: MediaDTO |null;
  imageId: string |null;
  title: string;
  description: string;
  order: number;
}
export interface IValueItemsCreateDTO {
    id: string;
    title: string;
    description: string;
}

export interface IValueItemsUpdateDTO {
  imageId: string;
  title: string;
  description: string;
}


export type IValueItemsResponseDTO=ApiResponse<IValueItems[]>
export type IValuesItemsCreateResponseDTO=ApiResponse<null>
export type IValueItemsUpdateResponseDTO=ApiResponse<null>