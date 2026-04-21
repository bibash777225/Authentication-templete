export interface ILoginRequestDTO {
  email: string;
  password: string;
}
export interface ILoginResponseDTO {
  status: number;
  message: string;
  data: {
    loggedInUser: {
      id: string;
      createdAt: string;
      updatedAt: string;
      status: boolean;
      creatorId: string;
      fullname: string;
      email: string;
      position: string;
      role: string;
      permission: unknown;
    };
    expiryTime: string;
  };
}
