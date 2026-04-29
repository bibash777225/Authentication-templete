import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input-field";
import ImageUploader from "@/components/form/image-input";
import type { MediaDTO } from "@/types/global.interface";
import { trustedSchema, type ITrustedData } from "../schema/trusted-schema";

interface ITrustedFormProps {
  defaultValues?: ITrustedData;
  defaultImage?: MediaDTO | string;
  onSubmit?: (data: ITrustedData) => void | Promise<void>;
}
const TrustedForm: React.FC<ITrustedFormProps> = ({
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
    resolver: zodResolver(trustedSchema),
  });
  const onFormSubmit = handleSubmit((data) => {
    onSubmit?.(data);
  });
  return (
    <form onSubmit={onFormSubmit} className="space-y-4 w-full">
      <label className="block text-xs font-medium text-gray-600">
        Trusted Name
      </label>
      <div className="space-y-2">
        <InputField
          {...register("name")}
          error={errors.name}
          placeholder="Enter Trusted Name"
          className="w-full"
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-600">
          Trusted Image{" "}
        </label>
        <Controller
          control={control}
          name="logoId"
          render={({ field, fieldState }) => (
            <ImageUploader
              image={defaultImage}
              {...field}
              error={
                fieldState.error && (
                  <p className="text-red-600 text-sm mt-2">
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

export default TrustedForm;
