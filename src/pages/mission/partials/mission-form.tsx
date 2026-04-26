import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MissionSchema, type IMissionData } from "../schema/mission-schema";
import InputField from "@/components/ui/input-field";
import { useUpdateMission } from "@/services/about/mission.api";
import {
  showApiErrorMessage,
  showSuccessMessage,
} from "@/context/lib/helpers/sonner";
import { Button } from "@/components/ui/button";
import CustomTextarea from "@/components/form/textarea";
import ImageUploader from "@/components/form/image-input";

type Props = {
  defaultValues?: IMissionData;
  imageUrl?: string;
};

const MissionForm = ({ defaultValues, imageUrl }: Props) => {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(MissionSchema),
  });

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const { mutateAsync: updateMission, isPending } = useUpdateMission();

  const handleSubmit = form.handleSubmit(
    async (data) => {
      try {
        const res = await updateMission(data);
        showSuccessMessage(res.data.message);
      } catch (error) {
        showApiErrorMessage(error);
      }
    },
    (e) => console.log(e),
  );

  return (
   
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/*Card Header */}
      
      <div className="border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
        <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Mission
        </h2>
        <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
          Update your organisation's mission statement and icon.
        </p>
      </div>

      {/*  Form Body*/}
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-6 px-6 py-6">
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
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Icon
            </label>
            <Controller
              name="iconId"
              control={control}
              render={({ field, fieldState }) => (
                <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4 transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-zinc-600">
                  <ImageUploader
                    label="Upload Icon"
                    value={field.value || null}
                    onChange={field.onChange}
                    error={fieldState.error}
                    image={imageUrl}
                  />
                </div>
              )}
            />
          </div>

          {/*  textarea*/}
          
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Description
            </label>
            <CustomTextarea label=""
              {...register("description")}
              error={errors.description}
              className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 min-h-[120px] resize-y"
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
          <Button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {isPending ? (
              <>
                {/* Spinner  */}
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Saving…
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MissionForm;
