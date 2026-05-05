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
  featuredImage: MediaDTO | null;
  featuredImageID: string;
  author: IBlogAuthor;
  readTime: string;
  publishedAt: string;
  category: IBlogCategory;
  content: string;
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
export type IBlogCreateResponseDTO = ApiResponse<null>;
export type IBlogUpadateResponseDTO = ApiResponse<null>;
export type IBlogDeleteResponseDTO = ApiResponse<null>;

export interface IBlogPayLoadDTO {
  title: string;
  featuredImageId?: string;
  categoryId?: string | null;
  content: string;
  slug: string;
  shortDescription: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
}
