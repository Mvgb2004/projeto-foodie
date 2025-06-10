import type { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth-service";
import { z } from "zod";
import jsonwebtoken from "jsonwebtoken";
import { AuthRepository } from "../repositories/prisma-repository";
import { BcryptHasher } from "../cryptography/cryptography-bcrypt-hash";
import { prisma } from "../../../prisma/prisma-instance";

const authRepository = new AuthRepository(prisma);
const hasher = new BcryptHasher();
const authService = new AuthService(authRepository, hasher, hasher);

class AuthController {
  constructor(private authService: AuthService) {
    this.createUser = this.createUser.bind(this);
    this.createSession = this.createSession.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const schema = z.object({
      email: z.string().email(),
      name: z.string(),
      password: z.string().min(6),
      address: z.string(),
      addressComplement: z.string(),
      cep: z.string(),
      city: z.string(),
      neighborhood: z.string(),
      state: z.string(),
    });

    try {
      const {
        email,
        name,
        password,
        address,
        addressComplement,
        cep,
        city,
        neighborhood,
        state,
      } = schema.parse(req.body);

      const user = await this.authService.createUser({
        email,
        name,
        password,
        address,
        addressComplement,
        cep,
        city,
        neighborhood,
        state,
      });

      if (user.isLeft()) {
        const error = user.value;
        res.status(400).json({ message: error.message });
        return;
      }

      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      next(error);
    }
  }

  async createSession(req: Request, res: Response, next: NextFunction) {
    const schema = z.object({
      email: z.string(),
      password: z.string().min(6),
    });

    try {
      const { email, password } = schema.parse(req.body);

      const session = await this.authService.createSession({
        email,
        password,
      });

      if (session.isLeft()) {
        const error = session.value;
        res.status(401).json({ message: error.message });
        return;
      }

      const tokenJwt = jsonwebtoken.sign(
        { id: session.value.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "24h",
        }
      );

      const user = session.value;

      res.status(201).json({
        message: "Session created successfully",
        accessToken: tokenJwt,
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const updateUserParamsSchema = z.object({
      userId: z.string().regex(/^\d+$/, "userId must be a number"),
    });

    const updateUserBodySchema = z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      cep: z.string().optional(),
      address: z.string().optional(),
      address_number: z.string().optional(),
      address_complement: z.string().optional(),
      neighborhood: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
    });

    try {
      const data = updateUserBodySchema.parse(req.body);
      const { userId } = updateUserParamsSchema.parse(req.params);

      const result = await this.authService.updateUser(Number(userId), data);

      if (result.isLeft()) {
        res.status(400).json({ message: result.value.message });
        return
      }

      res.status(200).json({
        message: "User updated successfully",
        user: result.value,
      });
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController(authService);

export { authController };
