import { UseGetAllValuesItemsApi } from "@/services/about/values.api";


export const useValuesItems = () => {
  const { data, isLoading } = UseGetAllValuesItemsApi(); 

  const remove = (id: string) => {
    console.log("delete", id);
  };

  return {
    isLoading,
    remove,
    valueSectionData: data?.data,
    
  };
};
