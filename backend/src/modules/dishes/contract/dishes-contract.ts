import { Dishes } from "@prisma/client";

export interface IDishesRepository {
  getDishes(): Promise<Dishes[]>;
}
