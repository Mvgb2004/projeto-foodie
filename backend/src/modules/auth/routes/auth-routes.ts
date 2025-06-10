import { Router } from "express";
import { authController } from "../controller/auth-controller";

const router = Router();

const {
  createSession,
  createUser,
  updateUser,
} = authController;

router.post("/users", createUser);
router.post("/session", createSession);
router.patch("/users/:userId", updateUser);

export default router;
