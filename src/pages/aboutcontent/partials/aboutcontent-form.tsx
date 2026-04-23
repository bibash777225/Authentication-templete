import { Plus, Trash } from "lucide-react";
import type { AboutcontentFormDTO } from "../schema/aboutcontent.schema";
import {  useFieldArray, type UseFormReturn } from "react-hook-form";
import InputField from "@/components/ui/input-field";
import CustomTextarea from "@/components/form/textarea";


type Props = {
  form: UseFormReturn<AboutcontentFormDTO>;
  itemUrlsMap: Map<string | undefined, string | undefined>;
};

const AboutcontentForm = ({ form,  }: Props) => {
  const {
    control,
    register,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <div className="space-y-10">
      {/* HEADER SECTION */}
      <Section
        title="Content"
        description="Main heading and tag of the section"
      >
        <div className="gap-4 grid grid-cols-2">
          <InputField
            label="Title"
            {...register("title")}
            error={errors.title}
          />

          <InputField
            label="Subtitle"
            {...register("tag")}
            error={errors.tag}
          />
        </div>
      </Section>

      {/* Items SECTION */}
      <Section title="Items" description="Add and manage item highlights">
        <div className="space-y-4">
          {fields.map((field, index) => {
            const error = errors.items?.[index];

            return (
              <div
                key={field.id}
                className="space-y-4 bg-muted/30 p-4 border rounded-xl"
              >
                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <p className="font-medium text-sm">Item #{index + 1}</p>

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-100 hover:bg-red-200 p-2 rounded-md text-red-600"
                  >
                    <Trash size={16} />
                  </button>
                </div>

                {/* TITLE + IMAGE */}
                <div className="gap-4 grid grid-cols-2">
                  <InputField
                    label="Item Title"
                    {...register(`items.${index}.title`)}
                    error={error?.title}
                  />

                  
                </div>

                {/* DESCRIPTION */}
                <CustomTextarea
                  label="Description"
                  {...register(`items.${index}.desc`)}
                  error={error?.desc}
                />
              </div>
            );
          })}

          {/* ADD BUTTON */}
          <button
            type="button"
            onClick={() => append({ title: "", desc: "" })}
            className="flex items-center gap-2 font-medium text-blue-600 hover:underline"
          >
            <Plus size={16} /> Add Feature
          </button>

          {/* ARRAY ERROR */}
          {typeof errors.items?.message === "string" && (
            <p className="text-red-500 text-sm">{errors.items.message}</p>
          )}
        </div>
      </Section>
    </div>
  );
};

export default AboutcontentForm;

const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="gap-8 grid pt-8 border-t w-full">
    <div>
      <h3 className="font-semibold text-base">{title}</h3>
      <p className="mt-1 text-muted-foreground text-sm">{description}</p>
    </div>
    <div>{children}</div>
  </div>
);
