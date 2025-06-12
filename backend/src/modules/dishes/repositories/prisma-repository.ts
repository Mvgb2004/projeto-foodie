import { Dishes, PrismaClient } from "@prisma/client";
import { IDishesRepository } from "../contract/dishes-contract";

class DishesRepository implements IDishesRepository {
  constructor(private prisma: PrismaClient) {}

  async getDishes(): Promise<Dishes[]> {
    return await this.prisma.dishes.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }
}

export default DishesRepository;