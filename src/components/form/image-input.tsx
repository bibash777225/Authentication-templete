import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { MediaDTO } from "@/types/global.interface";
import { CloudUpload, Loader2, RefreshCcw, Trash2Icon } from "lucide-react";
import React, { useId, useMemo, useRef, useState } from "react";
import { type FieldError } from "react-hook-form";
// import Image from "../image";
import { Button } from "../ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import { imageUrl } from "@/context/lib/helpers/image";

interface ImageUploaderProps {
  value?: string | null;
  onChange?: (value?: string) => void;
  error?: string | FieldError;
  label?: string;
  className?: string;
  image?: string | MediaDTO;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  error,
  label,
  className,
  image,
}) => {
  /**
   *
   *  NOTE: This may have some unhandled edge cases :(
   *
   *  * this has :)
   *  1. if default values is supplied to the form initialization, setting value as onChange(undefined) only resets the value to the initial value.
   *     This behaviour needs to be handled by either passing null or "" whichever backend accepts in calling component itself. can't do it here because of cases where backend/validationSchema can't accept null or ""
   *
   *
   */
  const [uploadResult, setUploadResult] = useState<
    { id: string; path: string } | undefined
  >(undefined);
  // const [preview, setPreview] = useState<string>();

  const preview = useMemo(() => {
    if (!value) return undefined;
    else if (value === uploadResult?.id) {
      return uploadResult.path;
    }
    return typeof image === "string" ? image : image?.path;
  }, [value, uploadResult, image]);

  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isUploading, upload } = useFileUpload();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await upload(file);
    if (!result) return;
    setUploadResult(result);
    onChange?.(result.id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange?.("");
    setUploadResult(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return (
    <div
      className={cn("flex flex-col space-y-2 3xl:space-y-3 w-full", className)}
    >
      {label && (
        <Label
          htmlFor={inputId}
          className="font-medium text-dark-200 text-xs 3xl:text-sm leading-none"
        >
          {label}
        </Label>
      )}

      <input
        id={inputId}
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
      />

      <div className="group relative rounded-md transition-all cursor-pointer">
        {value && preview ? (
          <div className="flex justify-between items-center gap-4 w-full h-full">
            <img
              src={imageUrl(preview)}
              alt="Preview"
              crossOrigin="anonymous"
              className="mr-auto rounded-md size-10 object-cover"
            />
            <Button
              variant={"ghost"}
              className="hover:bg-slate-100 hover:text-slate-900"
              type="button"
              asChild
            >
              <label htmlFor={inputId}>
                <RefreshCcw />
              </label>
            </Button>
            <Button
              variant={"destructive"}
              type="button"
              onClick={handleDelete}
            >
              <Trash2Icon />
            </Button>
          </div>
        ) : (
          <label
            htmlFor={inputId}
            className={cn(
              "inline-flex relative justify-start items-center gap-2 bg-background shadow-sm px-3 border border-border rounded-md w-full h-10 3xl:h-11 font-medium text-muted-foreground text-xs 3xl:text-sm transition-all",
              "dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:border-gray-400",
              "focus-visible:ring-[3px] focus-visible:ring-secondary outline-none",
            )}
          >
            {isUploading ? (
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            ) : (
              <CloudUpload className="mr-2 w-4 h-4" />
            )}
            "Click here to select or upload
          </label>
        )}
      </div>

      {error && (
        <p className="font-medium text-red-500 text-xs">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
