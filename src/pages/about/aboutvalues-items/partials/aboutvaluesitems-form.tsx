import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import InputField from "@/components/ui/input-field";
import ImageUploader from "@/components/form/image-input";
import CustomTextarea from "@/components/form/textarea";
import { Button } from "@/components/ui/button";
import {
  AboutValuesItemsSchema,
  type IValuesItemsData,
} from "../schema/aboutvaluesitems.schema";
import type { MediaDTO } from "@/types/global.interface";

interface IValuesItemsFormProps {
  defaultValues?: IValuesItemsData;
  defaultImage?: MediaDTO | string;
  onSubmit?: (data: IValuesItemsData) => void | Promise<void>;
}
const AboutValuesItemsForm: React.FC<IValuesItemsFormProps> = ({
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
    resolver: zodResolver(AboutValuesItemsSchema),
  });
  const onFormSubmit = handleSubmit((data) => {
    onSubmit?.(data);
  });
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/*Card Header */}

      <div className="border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
        <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Value items
        </h2>
        <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
          Update your organisation's value items statement title and icon.
        </p>
      </div>

      {/*  Form Body*/}
      <form onSubmit={onFormSubmit} noValidate>
        <div className="space-y-4 px-6 py-6">
          {/* text input*/}

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Title
            </label>
            <InputField
              {...register("title")}
              error={errors.title}
              className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
            />
          </div>

          {/*image / file uploader*/}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Icon</label>
            <Controller
              name="iconId"
              control={control}
              render={({ field, fieldState }) => (
                <div className="rounded-xl  border-zinc-300 bg-zinc-50 p-4 transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-zinc-600">
                  <ImageUploader
                    label="Upload Icon"
                    value={field.value || null}
                    onChange={field.onChange}
                    error={fieldState.error}
                    image={defaultImage}
                  />
                </div>
              )}
            />
          </div>

          {/*  textarea*/}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">
              Description
            </label>
            <CustomTextarea
              label=""
              {...register("description")}
              error={errors.description}
              className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 min-h-30 resize-y"
            />
          </div>
        </div>

        {/*Card Footer*/}

        <div className="flex items-center justify-end gap-3 rounded-b-2xl border-t border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <Button
            type="button"
            variant="ghost"
            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            Cancel
          </Button>
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition mt-2"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutValuesItemsForm;
