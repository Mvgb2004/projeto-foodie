import { Router } from "express";
import dishesController from "../controller/dishes-controller";

const router = Router();

const { getDishes } = dishesController;

router.get("/", getDishes);

export default router;
