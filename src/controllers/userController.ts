import { Request, Response } from "express";
import User from "../database/models/user";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6), //no caso a senha deve ter no min 6 caracters
});

export namespace userController {
  export const getUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  };

  export const createUser = async (req: Request, res: Response) => {
    try {
      const parsedData = userSchema.parse(req.body);
      const user = await User.create(parsedData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log('Validation Errors:', error.errors);
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro ao criar usuário" });
    }
  };
  

  export const getUserById = async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Erro ao buscar usuário" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  };

  export const updateUser = async (req: Request, res: Response) => {
    try {
      const parsedData = userSchema.parse(req.body);
      const [updated] = await User.update(parsedData, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedUser = await User.findByPk(req.params.id);
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: "Erro ao atualizar usuário" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Dados inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  };

  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const deleted = await User.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.json({ message: "Usuário deletado com sucesso" });
      } else {
        res.status(404).json({ message: "Erro ao deletar usuário" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar usuário" });
    }
  };
}