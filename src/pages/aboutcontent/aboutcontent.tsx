import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  AboutcontentFormSchema,
  type AboutcontentFormDTO,
} from "./schema/aboutcontent.schema";
import {
  showApiErrorMessage,
  showSuccessMessage,
} from "@/context/lib/helpers/sonner";
import { setFormError } from "@/context/lib/helpers/error-helper";
import PageHeader from "@/components/common-header/header";
import { Button } from "@/components/ui/button";
import { useGetAboutcontent, useUpdateAboutcontent } from "@/services/aboutcontent/aboutcontent";

const Aboutcontent = () => {
  const { data: aboutcontent, isLoading } = useGetAboutcontent();
  const updateMutation = useUpdateAboutcontent();

  const form = useForm<AboutcontentFormDTO>({
    resolver: zodResolver(AboutcontentFormSchema),
  });
  useEffect(() => {
    if (aboutcontent?.data) form.reset(aboutcontent.data);
  }, [aboutcontent, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    if (aboutcontent?.data.id)
      try {
        const res = await updateMutation.mutateAsync({
          id: aboutcontent?.data.id,
          data,
        });
        showSuccessMessage(res.data.message);
      } catch (e) {
        setFormError(e, form.setError);
        showApiErrorMessage(e);
      }
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Loader2 />
      </div>
    );
  return (
    <form onSubmit={handleSubmit}>
      <PageHeader title="About Us page Bottom ">
        <PageHeader.Title />
      </PageHeader>

      <Button className="mt-6">Submit</Button>
    </form>
  );
};

export default Aboutcontent;
