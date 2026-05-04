import { HttpClient } from "@/context/lib/network/http-client"
import { endpoints } from "@/core/constant/endpoint"
import type { IContactResponseDTO } from "@/types/contact/contact-interface"
import type { GenericPaginationParams } from "@/types/global.interface";
import { useQuery } from "@tanstack/react-query"

export const useGetAllContact=(params?:GenericPaginationParams)=>{
    return useQuery({
        queryKey:["contact",params],
        queryFn: async ()=>  await HttpClient.get<IContactResponseDTO>(endpoints.contact.get,{params}),
    })
}