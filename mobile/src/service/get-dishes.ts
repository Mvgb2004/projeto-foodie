import axiosInstance from "../axios";

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  category: string;
  is_highlighted: boolean;
}

type GetDishesResponse = Dish[];
const getDishes = async () => {
  const response = await axiosInstance.get<GetDishesResponse>("/dishes");
  return response.data;
};

export default getDishes;
