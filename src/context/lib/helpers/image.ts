import type  { MediaDTO } from "@/types/global.interface";

const baseUrl = import.meta.env.VITE_IMAGE_URL || "http://localhost:5173/";

export const imageUrl = (source?: string | MediaDTO): string => {
  const baseImageUrl = baseUrl;
  let imagesrc: string;

  if (typeof source == "object") imagesrc = source?.path || "";
  else imagesrc = source || "";

  // show placeholder
  if (!imagesrc) return "/logo.png";

  const seperator =
    imagesrc.startsWith("/") || baseImageUrl?.endsWith("/") ? "" : "/";
  return imagesrc.startsWith("http")
    ? imagesrc
    : `${baseImageUrl}${seperator}${imagesrc}`;
};
