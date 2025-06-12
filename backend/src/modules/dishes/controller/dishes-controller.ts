import { prisma } from "../../../prisma/prisma-instance";
import DishesRepository from "../repositories/prisma-repository";
import DishesServices from "../services/dishes-service";
import { Request, Response } from "express";

class DishesController {
  constructor(private dishesService: DishesServices) {
    this.getDishes = this.getDishes.bind(this);
  }

  async getDishes(req: Request, res: Response) {
    try {
      const dishes = await this.dishesService.getDishes();
      res.status(200).json(dishes);
    } catch (error) {
      console.error("Error fetching dishes:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

const dishesController = new DishesController(
  new DishesServices(new DishesRepository(prisma))
);
export default dishesController;
