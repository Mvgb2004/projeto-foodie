import axiosInstance from "../axios";
import { CreateUserRequest } from "../types/user";


const createUser = async (data: CreateUserRequest) => {
  const response = await axiosInstance.post("/auth/users", data);
  return response.data;
};

export default createUser;
