// src/web/controllers/profileController.ts
import { Request, Response } from 'express';
import Profile from '../database/models/profile';
import { z } from 'zod';

// Definindo o esquema de validação
const profileSchema = z.object({
  name: z.string().min(1),
  bio: z.string().optional(),
  birth_date: z.string().optional(),
  user_id: z.number().int(),
});

export namespace profileController {
  export const getProfiles = async (req: Request, res: Response) => {
    try {
      const profiles = await Profile.findAll();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar perfis' });
    }
  };

  export const createProfile = async (req: Request, res: Response) => {
    try {
      const parsedData = profileSchema.parse(req.body);
      const profile = await Profile.create(parsedData);
      res.status(201).json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: 'Dados inválidos', errors: error.errors });
      }
      res.status(500).json({ message: 'Erro ao criar perfil' });
    }
  };

  export const getProfileById = async (req: Request, res: Response) => {
    try {
      const profile = await Profile.findByPk(req.params.id);
      if (profile) {
        res.json(profile);
      } else {
        res.status(404).json({ message: 'Perfil não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar perfil' });
    }
  };

  export const updateProfile = async (req: Request, res: Response) => {
    try {
      const parsedData = profileSchema.parse(req.body);
      const [updated] = await Profile.update(parsedData, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedProfile = await Profile.findByPk(req.params.id);
        res.json(updatedProfile);
      } else {
        res.status(404).json({ message: 'Perfil não encontrado' });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: 'Dados inválidos', errors: error.errors });
      }
      res.status(500).json({ message: 'Erro ao atualizar perfil' });
    }
  };

  export const deleteProfile = async (req: Request, res: Response) => {
    try {
      const deleted = await Profile.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.json({ message: 'Perfil deletado com sucesso' });
      } else {
        res.status(404).json({ message: 'Perfil não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar perfil' });
    }
  };
}