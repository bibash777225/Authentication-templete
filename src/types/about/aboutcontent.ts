import type { ApiResponse } from "../global.interface";


export interface IAboutcontent {
  id: string;
  tag: string;
  title: string;
  items: Item[];
}

export interface Item {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  title: string;
  desc: string;
  sectionId: string;


}

export type IGetAllAboutcontentDTO = ApiResponse<IAboutcontent>;
export type IGetAboutcontentById = ApiResponse<IAboutcontent>;
export type IPostAboutcontentDTO = ApiResponse<null>;
export type IPatchAboutcontentDTO = ApiResponse<null>;
export type IDeleteAboutcontentDTO = ApiResponse<null>;
