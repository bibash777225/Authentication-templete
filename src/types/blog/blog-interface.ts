import type {
  ApiResponse,
  MediaDTO,
  PaginatedApiResponse,
} from "../global.interface";

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  featuredImage: MediaDTO;
  author: IBlogAuthor;
  readTime: string;
  publishedAt: string;
  category: IBlogCategory;
}

export interface IBlogAuthor {
  id: string;
  name?: string;
  position?: string;
}
export interface IBlogCategory {
  id: string;
  name: string;
  slug: string;
}
export type IBlogResponseDTO = PaginatedApiResponse<IBlog>;
export type IBlogSingleResponseDTO = ApiResponse<IBlog>;
export type IBlogCreateResponseDTO = ApiResponse<null>;
export type IBlogUpadateResponseDTO = ApiResponse<null>;
export type IBlogDeleteResponseDTO = ApiResponse<null>;


export interface IBlogPayLoad{
    title:string;
    featuredImage?:string
    content:string
}