import { Request, Response } from 'express';
import Participation from '../database/models/participation';
import { z } from 'zod';

const participationSchema = z.object({
  user_id: z.number().int().positive(),
  event_id: z.number().int().positive(),
});

export namespace participationController {
  export const createParticipation = async (req: Request, res: Response) => {
    try {
      const parsedData = participationSchema.parse(req.body);
      const participation = await Participation.create(parsedData);
      res.status(201).json(participation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: 'Dados inválidos', errors: error.errors });
      }
      console.error('Erro ao criar participação:', error);
      res.status(500).json({ message: 'Erro ao criar participação' });
    }
  };

  export const getParticipations = async (req: Request, res: Response) => {
    try {
      const participations = await Participation.findAll();
      res.json(participations);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar participações' });
    }
  };

  export const getParticipationById = async (req: Request, res: Response) => {
    try {
      const participation = await Participation.findByPk(req.params.id);
      if (participation) {
        res.json(participation);
      } else {
        res.status(404).json({ message: 'Participação não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar participação' });
    }
  };

  export const updateParticipation = async (req: Request, res: Response) => {
    try {
      const parsedData = participationSchema.parse(req.body);
      const [updated] = await Participation.update(parsedData, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedParticipation = await Participation.findByPk(req.params.id);
        res.json(updatedParticipation);
      } else {
        res.status(404).json({ message: 'Participação não encontrada' });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: 'Dados inválidos', errors: error.errors });
      }
      console.error('Erro ao atualizar participação:', error);
      res.status(500).json({ message: 'Erro ao atualizar participação' });
    }
  };

  export const deleteParticipation = async (req: Request, res: Response) => {
    try {
      const deleted = await Participation.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.json({ message: 'Participação deletada com sucesso' });
      } else {
        res.status(404).json({ message: 'Participação não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar participação' });
    }
  };
}
