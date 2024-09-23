import { Request, Response } from 'express';
import { z, ZodError } from 'zod';
import participationService from '../service/participationService';

const participationSchema = z.object({
  user_id: z.number().int().positive(),
  event_id: z.number().int().positive(),
});

const participationUpdateSchema = z.object({
  user_id: z.number().int().positive().optional(),
  event_id: z.number().int().positive().optional(),
});

export const IdSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export namespace participationController {
  export const createParticipation = async (req: Request, res: Response) => {
    try {
      const parsedData = participationSchema.parse(req.body);
      const participation = await participationService.createParticipation(parsedData);
      res.status(201).json(participation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
      }
      res.status(500).json({ message: "Erro ao criar usuário" });
    }
  };

  export const findAllParticipations = async (req: Request, res: Response) => {
    try {
         const participations = await participationService.findAllParticipations();
         return res.status(200).json(participations);
    } catch (error) {
         return res.status(400).json({ message: `Erro ao buscar usuários: ${error}` });
    }
}

export const findParticipationById = async (req: Request, res: Response):Promise<Response> => {
  try {
       const idParam = IdSchema.parse(req.params);
       const participation = await participationService.findParticipationById(idParam.id);
       return res.status(200).json(participation);
  } catch (error) {
       if (error instanceof ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
       }
       return res.status(400).json({ message: `Error finding participation: ${error}` });
  }
}

export const updateParticipation = async (req: Request, res: Response):Promise<Response> => {
   try {
       const idParam = IdSchema.parse(req.params);
       const participation = participationUpdateSchema.parse(req.body);
       const updateParticipation = await participationService.updateParticipation(idParam.id, participation);
       return res.status(200).json(updateParticipation);
   } catch (error) {
       if (error instanceof ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
       }
       return res.status(400).json({ message: `Error updating participation: ${error}` });
   }
}

export const deleteParticipation = async (req: Request, res: Response):Promise<Response> => {
   try {
       const idParam = IdSchema.parse(req.params);
       const deleteParticipation = await participationService.deleteParticipation(idParam.id);
       return res.status(200).json({ message: `Participation deleted successfully`, participation: deleteParticipation });
   } catch (error) {
       if (error instanceof ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
       }
       return res.status(400).json({ message: `Error deleting participation: ${error}` });
    }
  }
}