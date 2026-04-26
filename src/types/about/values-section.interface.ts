import type { ApiResponse, MediaDTO } from "../global.interface";

export interface IValueSection {
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  sectionId: string;
  icon: MediaDTO;
  iconId: string;
  title: string;
  description: string;
  order: number;
}
export interface IValueSectionCreateDTO {
    id: string;
    title: string;
    description: string;
}

export interface IValueSectionUpdateDTO {
  iconId: string;
  title: string;
  description: string;
}

export type IValuessecResponseDTO=ApiResponse<IValueSection>
export type IValuessecCreateResponseDTO=ApiResponse<null>
export type IValueSectionUpdateResponseDTO=ApiResponse<null>