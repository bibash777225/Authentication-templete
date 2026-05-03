import type { ApiResponse, MediaDTO } from "../global.interface";

export interface ITeamMember {
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  sectionId: string;
  image: MediaDTO | null;
  imageId: string;
  name: string;
  position: string;
  order: number;

}
export type ITeamMemberResponseDTO=ApiResponse<ITeamMember[]>
export type ITeamMemberPostResponseDTO=ApiResponse<null>
export type ITeamMemberUpdateResponseDTO=ApiResponse<null>
export type ITeamMemberDeleteResponseDTO=ApiResponse<null>
 

export  interface ITeamMemberPayLoadDTO{
   
    name:string;
    imageId?:string|null;
    position:string;
}