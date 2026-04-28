import { UseGetAllValuesSecApi } from "@/services/about/values.api";

export const useValuesSection = () => {
  const { data, isLoading } = UseGetAllValuesSecApi(); 

  const remove = (id: string) => {
    console.log("delete", id);
  };

  return {
    isLoading,
    remove,
    valueSectionData: data?.data,
    
  };
};
