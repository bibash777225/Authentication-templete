import type { ApiResponse } from "../global.interface";

export interface IContact {
  id: string;
  createdAt: string;
  fullName: string;
  company: string;
  workEmail: string;
  serviceId: string;
  description: string;
  phone:string;
  budget:string
}
export type IContactResponseDTO=ApiResponse<IContact[]>
