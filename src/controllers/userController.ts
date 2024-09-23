import { Request, Response } from "express";
import User from "../database/models/user";
import { z, ZodError } from "zod";
import userService from "../service/userService";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export const IdSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export namespace userController {

  export const createUser = async (req: Request, res: Response) => {
    try {
      const parsedData = userSchema.parse(req.body);
      const user = await userService.createUser(parsedData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
      }
      res.status(500).json({ message: "Erro ao criar usuário" });
    }
  };

  export const findAllUsers = async (req: Request, res: Response) => {
    try {
         const users = await userService.findAllUsers();
         return res.status(200).json(users);
    } catch (error) {
         return res.status(400).json({ message: `Erro ao buscar usuários: ${error}` });
    }
}

export const findUserById = async (req: Request, res: Response):Promise<Response> => {
  try {
       const idParam = IdSchema.parse(req.params);
       const user = await userService.findUserById(idParam.id);
       return res.status(200).json(user);
  } catch (error) {
       if (error instanceof ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
       }
       return res.status(400).json({ message: `Error finding user: ${error}` });
  }
}

export const updateUser = async (req: Request, res: Response):Promise<Response> => {
   try {
       const idParam = IdSchema.parse(req.params);
       const user = userUpdateSchema.parse(req.body);
       const updateUser = await userService.updateUser(idParam.id, user);
       return res.status(200).json(updateUser);
   } catch (error) {
       if (error instanceof ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
       }
       return res.status(400).json({ message: `Error updating user: ${error}` });
   }
}

export const deleteUser = async (req: Request, res: Response):Promise<Response> => {
   try {
       const idParam = IdSchema.parse(req.params);
       const deleteUser = await userService.deleteUser(idParam.id);
       return res.status(200).json({ message: `User deleted successfully`, user: deleteUser });
   } catch (error) {
       if (error instanceof ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
       }
       return res.status(400).json({ message: `Error deleting user: ${error}` });
    }
  }
}