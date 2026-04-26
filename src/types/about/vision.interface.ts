import type { ApiResponse, MediaDTO } from "../global.interface";

 export interface Ivision {
   id: string;
   isActive: boolean;
   createdAt: string;
   updatedAt: string; 
   iconId: string;
   title: string;
   description: string;
   icon: MediaDTO;
 }
 export type IvisionGetResponseDTO=ApiResponse<Ivision>
 export type IvisionPatchResponseDTO=ApiResponse<null>

 export interface IvisionUpdateDTO {
   iconId: string;
   title: string;
   description: string;
 }