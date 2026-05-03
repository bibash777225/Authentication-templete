import React from "react";
import { toolsSchema, type IToolData } from "../schema/tools-schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input-field";
import ImageUploader from "@/components/form/image-input";
import type { MediaDTO } from "@/types/global.interface";

interface IToolFormProps {
  defaultValues?: IToolData;
  defaultImage?: MediaDTO | string;
  onSubmit?: (data: IToolData) => void | Promise<void>;
}

const ToolsForm: React.FC<IToolFormProps> = ({
  defaultValues,
  defaultImage,
  onSubmit,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(toolsSchema),
  });

  const onFormSubmit = handleSubmit((data) => {
    onSubmit?.(data);
  });

  return (
    <form onSubmit={onFormSubmit} className="space-y-4 w-full">
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-600">
          Tool Name
        </label>
        <InputField
          {...register("name")}
          error={errors.name}
          placeholder="Enter tool name"
          className="w-full"
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-600">
          Tool Image
        </label>
        <Controller
          control={control}
          name="imageId"
          render={({ field, fieldState }) => (
            <ImageUploader
              image={defaultImage}
              {...field}
              error={
                fieldState.error && (
                  <p className="text-xs text-red-500 mt-1">
                    {fieldState.error.message}
                  </p>
                )
              }
            />
          )}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-purple-400 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition mt-2"
      >
        Save changes
      </button>
    </form>
  );
};

export default ToolsForm;
