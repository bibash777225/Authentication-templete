import { useGetMission } from "@/services/about/mission.api";
import MissionForm from "./partials/mission-form";
import { imageUrl } from "@/context/lib/helpers/image";

const MissionPage = () => {
  const { data, isLoading, isError, error } = useGetMission();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error?.message}</p>;

  if (!data?.data?.data) return <p>No mission data found</p>;

  const mission = data.data.data;

  return (
    <div>
      <MissionForm
        defaultValues={mission}
        imageUrl={imageUrl(mission.icon?.path)}
      />
    </div>
  );
};

export default MissionPage;
