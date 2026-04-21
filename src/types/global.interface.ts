export interface GenericPaginationParams {
  page?: number;
  take?: number;
  searchTerm?: string;
}
export interface PaginatedResponseMeta {
  length: number;
  totalPages?: number;
  prev: number | null;
  next: number | null;
}
export interface PaginatedApiResponse<T> {
  status: number;
  message: string;
  meta: PaginatedResponseMeta;
  data: T[] | null;
}
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ApiSuccessResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ErrorResponse {
  statusCode: number;
  message: string[];
}

export type ImageDTO = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  status: boolean;
  creatorId: string;
  type: string;
  url: string;
} | null;
