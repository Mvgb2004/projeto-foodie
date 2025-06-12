import express, { type Request, type Response, type Express } from "express";
import cors from "cors";
import authRoutes from "../modules/auth/routes/auth-routes";
import dishesRoutes from "../modules/dishes/routes/dishes-routes";

const setupRoutes = (app: Express) => {
  app.use(express.json());
  app.use(cors());

  const apiRouter = express.Router();

  apiRouter.get("/server-test", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is running!" });
  });

  apiRouter.use("/auth", authRoutes);
  apiRouter.use("/dishes", dishesRoutes);

  app.use("/api/v1", apiRouter);
};

export default setupRoutes;
