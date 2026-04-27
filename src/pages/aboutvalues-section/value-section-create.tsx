import { useValuesSection } from "./hooks/use-values-section";
import { ValuesSectionTable } from "./partials/values-section-table";



const AboutValuesPage = () => {
  const data = useValuesSection(); 

  return (
    <div>
      <ValuesSectionTable data={data} />
    </div>
  );
};

export default AboutValuesPage;
