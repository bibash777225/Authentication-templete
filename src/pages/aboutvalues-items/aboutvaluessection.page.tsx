



import { imageUrl } from "@/context/lib/helpers/image";
import { UseGetAllValuesSecApi } from "@/services/about/values.api";
import AboutValuesSectionForm from "./partials/aboutvaluessection-form";

const AboutValuesSectionPage = () => {
  const { data, isLoading, isError, error } = UseGetAllValuesSecApi();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error?.message}</p>;

  if (!data?.data?.data) return <p>No mission data found</p>;

  const valuesec= data.data.data;

  return (
    <div>
      <AboutValuesSectionForm
        defaultValues={valuesec}
        imageUrl={imageUrl(valuesec.icon?.path)}
      />
    </div>
  );
};

export default AboutValuesSectionPage;
