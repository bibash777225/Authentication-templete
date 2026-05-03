import type { MediaDTO } from "@/types/global.interface";
import { memberSchema, type IMemberData } from "../schema/member-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import InputField from "@/components/ui/input-field";
import ImageUploader from "@/components/form/image-input";


interface IMemberFormProps{
    defaultValues?:IMemberData;
    defaultImage?:MediaDTO|string;
    onSubmit?:(data:IMemberData)=>void|Promise<void>
}


const MemberForm:React.FC<IMemberFormProps>= ({
  defaultImage,
  defaultValues,
  onSubmit,
}) => {
  const{
    register,control,handleSubmit,formState:{errors,isSubmitting }
}=useForm({
  defaultValues,
  resolver:zodResolver(memberSchema)
})
const onFormSubmit=handleSubmit((data)=>{
  onSubmit?.(data);

})
return (
  <form onSubmit={onFormSubmit} className="space-y-4  w-full">
    <div className="space-y-2">
    <label className="  block text-xs font-medium text-gray-600">
      Members Name
    </label>
      <InputField
        {...register("name")}
        error={errors.name}
        placeholder="Enter Team Name"
        className="w-full"
      />
    
    </div>

    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-600">
        Position
      </label>
      <InputField
        {...register("position")}
        error={errors.position}
        placeholder="Enter position (e.g. Frontend Developer)"
        className="w-full"
      />
     
    </div>

    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-600">
        Members Image{" "}
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
      disabled={isSubmitting}
      type="submit"
      className="w-full py-2 bg-purple-400 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition mt-2"
    >
      Save changes
    </button>
  </form>
);
}
export default MemberForm;
