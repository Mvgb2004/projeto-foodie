import { IDishesRepository } from "../contract/dishes-contract";

class DishesServices {
  constructor(private dishesRepository: IDishesRepository) {}

  async getDishes() {
    return await this.dishesRepository.getDishes();
  }
}

export default DishesServices;