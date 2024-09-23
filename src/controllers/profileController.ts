import { Request, Response } from 'express';
import { z, ZodError } from 'zod';
import profileService from '../service/profileService';

const profileSchema = z.object({
  name: z.string().min(1),
  bio: z.string().optional(),
  birth_date: z.coerce.date().min(new Date('1900-01-01')),
  user_id: z.number().int(),
});

const profileUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  bio: z.string().optional(),
  birth_date: z.coerce.date().min(new Date('1900-01-01')).optional(),
  user_id: z.number().int().optional(),
});

export const IdSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export namespace profileController {
  export const createProfile = async (req: Request, res: Response) => {
    try {
      const parsedData = profileSchema.parse(req.body);
      const profile = await profileService.createProfile(parsedData);
      res.status(201).json(profile);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
      }
      res.status(500).json({ message: "Erro ao criar perfil" });
    }
  };

  export const findAllProfiles = async (req: Request, res: Response) => {
    try {
         const profiles = await profileService.findAllProfiles();
         return res.status(200).json(profiles);
    } catch (error) {
         return res.status(400).json({ message: `Erro ao buscar usuários: ${error}` });
    }
}

export const findProfileById = async (req: Request, res: Response):Promise<Response> => {
  try {
       const idParam = IdSchema.parse(req.params);
       const profile = await profileService.findProfileById(idParam.id);
       return res.status(200).json(profile);
  } catch (error) {
       if (error instanceof ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
       }
       return res.status(400).json({ message: `Error finding profile: ${error}` });
  }
}

export const updateProfile = async (req: Request, res: Response):Promise<Response> => {
   try {
       const idParam = IdSchema.parse(req.params);
       const profile = profileUpdateSchema.parse(req.body);
       const updateProfile = await profileService.updateProfile(idParam.id, profile);
       return res.status(200).json(updateProfile);
   } catch (error) {
       if (error instanceof ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
       }
       return res.status(400).json({ message: `Error updating profile: ${error}` });
   }
}

export const deleteProfile = async (req: Request, res: Response):Promise<Response> => {
   try {
       const idParam = IdSchema.parse(req.params);
       const deleteProfile = await profileService.deleteProfile(idParam.id);
       return res.status(200).json({ message: `Profile deleted successfully`, profile: deleteProfile });
   } catch (error) {
       if (error instanceof ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
       }
       return res.status(400).json({ message: `Error deleting profile: ${error}` });
    }
  }
}