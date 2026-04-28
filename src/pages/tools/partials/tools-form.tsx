import React from "react";
import { toolsSchema, type IToolData } from "../schema/tools-schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input-field";
import ImageUploader from "@/components/form/image-input";
import { Button } from "@/components/ui/button";
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
    <form onSubmit={onFormSubmit}>
      <InputField {...register("name")} error={errors.name} />
      <Controller
        control={control}
        name="imageId"
        render={({ field, fieldState }) => (
          <ImageUploader
            image={defaultImage}
            {...field}
            error={fieldState.error}
          />
        )}
      />
      <Button>Submit</Button>
    </form>
  );
};

export default ToolsForm;
