import { useQuery } from "@tanstack/react-query";
import getDishes from "../service/get-dishes";

const useDishes = () => {
  const useDishesQuery = () => {
    return useQuery({
      queryKey: ["dishes"],
      queryFn: getDishes,
      staleTime: 1000 * 60 * 5,
    });
  };
  

  function formatCategory(category: string): string {
    switch (category) {
      case "PIZZA":
        return "Pizza";
      case "BURGER":
        return "Hambúrguer";
      case "SANDWICH":
        return "Sanduíche";
      case "SALAD":
        return "Salada";
      case "DESSERT":
        return "Sobremesa";
      case "DRINK":
        return "Bebida";
      default:
        return category;
    }
  }

  return {
    useDishesQuery,
    formatCategory
  };
};

export default useDishes;
