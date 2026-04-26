import { useGetVision } from "@/services/about/vision.api"
import VisionForm from "./partials/vision-form"
import { imageUrl } from "@/context/lib/helpers/image";


const VisionPage = () => {
  const { data, isLoading, isError, error } = useGetVision();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error?.message}</p>;

  if (!data?.data?.data) return <p>No Vision data found</p>;

  const vision = data.data.data;

  return (
    <div>
      <VisionForm
        defaultValues={vision}
        imageUrl={imageUrl(vision.icon?.path)}
      />
    </div>
  );
};

export default  VisionPage
