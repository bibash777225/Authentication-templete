import { showApiErrorMessage } from "@/context/lib/helpers/sonner";
import { HttpClient } from "@/context/lib/network/http-client";
import { endpoints } from "@/core/constant/endpoint";
import type { ApiResponse, MediaDTO } from "@/types/global.interface";
import { useMutation } from "@tanstack/react-query";

export const useUploadSingleMediaApi = () =>
  useMutation({
    mutationFn: async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await HttpClient.post<ApiResponse<MediaDTO>>(
          endpoints.media.uploadOne,
          formData,
        );
        return response.data;
      } catch (e) {
        showApiErrorMessage(e);
      }
    },
  });
