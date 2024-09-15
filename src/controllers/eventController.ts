import { Request, Response } from "express";
import Event from "../database/models/event";
import { z } from "zod";

export namespace eventController {
  export const getEvents = async (req: Request, res: Response) => {
    try {
      const events = await Event.findAll();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar eventos" });
    }
  };

  export const createEvent = async (req: Request, res: Response) => {
    try {
      const parsedData = eventSchema.parse(req.body);
      const [day, month, year] = parsedData.event_date.split('/');
      const formattedDate = `${year}-${month}-${day}`;
      
      const event = await Event.create({
        ...parsedData,
        event_date: formattedDate
      });

      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Dados inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro ao criar evento" });
    }
  };

  export const getEventById = async (req: Request, res: Response) => {
    try {
      const event = await Event.findByPk(req.params.id);
      if (event) {
        res.json(event);
      } else {
        res.status(404).json({ message: "Evento não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar evento" });
    }
  };

  export const updateEvent = async (req: Request, res: Response) => {
    try {
      const parsedData = eventSchema.parse(req.body);
      const [updated] = await Event.update(parsedData, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedEvent = await Event.findByPk(req.params.id);
        res.json(updatedEvent);
      } else {
        res.status(404).json({ message: "Evento não encontrado" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Dados inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro ao atualizar evento" });
    }
  };

  export const deleteEvent = async (req: Request, res: Response) => {
    try {
      const deleted = await Event.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.json({ message: "Evento deletado com sucesso" });
      } else {
        res.status(404).json({ message: "Evento não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar evento" });
    }
  };
}

// verifica se uma data é válida / padronizando o formato DD/MM/YYYY
const isValidDate = (dateString: string): boolean => {
    const regex = /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(dateString)) return false;
  
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
  
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
};

const eventSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    event_date: z.string().refine(isValidDate, {
      message: "Data inválida, use o formato DD/MM/YYYY",
    }),
    creator_id: z.number()
});
  