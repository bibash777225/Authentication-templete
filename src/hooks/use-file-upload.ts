import { useUploadSingleMediaApi } from "@/services/media.api";
import { useState } from "react";

interface UseFileUploadReturn {
  isUploading: boolean;
  upload: (file: File) => Promise<{ path: string; id: string } | undefined>;
}

export function useFileUpload(): UseFileUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const fileuploadMutation = useUploadSingleMediaApi();

  async function upload(file: File) {
    setIsUploading(true);
    try {
      // Simulate network delay
      const res = await fileuploadMutation.mutateAsync(file);
      if (res) return { id: res?.data?.id || "", path: res?.data?.path || "" };
    } finally {
      setIsUploading(false);
    }
  }

  // function remove(url: string) {
  //   // Revoke the blob URL to free memory
  //   URL.revokeObjectURL(url);
  // }

  return { isUploading, upload };
}
