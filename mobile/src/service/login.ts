import axiosInstance from "../axios";
import { User } from "../types/user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  user: User
}

const login = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const res = await axiosInstance.post<LoginResponse>(
    "/auth/session",
    data
  );
  return res.data;
};

export default login;
