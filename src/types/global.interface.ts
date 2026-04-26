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

export interface ErrorResponse {
  statusCode: number;
  message: string[];
}

export type MediaDTO = {
  id: string;
  createdAt: string;
  filename: string;
  originalName: string;
  path: string;
  mimeType: string;
  size: number;
} | null;
