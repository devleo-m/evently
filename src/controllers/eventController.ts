import { Request, Response } from "express";
import { z, ZodError } from "zod";
import eventService from "../service/eventService";

const eventSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  event_date: z.coerce.date().min(new Date()),
  creator_id: z.number().int().positive(),
});

const eventUpdateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  event_date: z.coerce.date().min(new Date()).optional(),
  creator_id: z.number().int().positive().optional(),
});

const IdSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export namespace eventController {
  export const createEvent = async (req: Request, res: Response) => {
    try {
      const parsedData = eventSchema.parse(req.body);
      const event = await eventService.createEvent(parsedData);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
      }
      res.status(500).json({ message: "Erro ao criar usuário" });
    }
  };

  export const findAllEvents = async (req: Request, res: Response) => {
    try {
         const events = await eventService.findAllEvents();
         return res.status(200).json(events);
    } catch (error) {
         return res.status(400).json({ message: `Erro ao buscar usuários: ${error}` });
    }
}

export const findEventById = async (req: Request, res: Response):Promise<Response> => {
  try {
       const idParam = IdSchema.parse(req.params);
       const event = await eventService.findEventById(idParam.id);
       return res.status(200).json(event);
  } catch (error) {
       if (error instanceof ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
       }
       return res.status(400).json({ message: `Error finding event: ${error}` });
  }
}

export const updateEvent = async (req: Request, res: Response):Promise<Response> => {
   try {
       const idParam = IdSchema.parse(req.params);
       const event = eventUpdateSchema.parse(req.body);
       const updateEvent = await eventService.updateEvent(idParam.id, event);
       return res.status(200).json(updateEvent);
   } catch (error) {
       if (error instanceof ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
       }
       return res.status(400).json({ message: `Error updating event: ${error}` });
   }
}

export const deleteEvent = async (req: Request, res: Response):Promise<Response> => {
   try {
       const idParam = IdSchema.parse(req.params);
       const deleteEvent = await eventService.deleteEvent(idParam.id);
       return res.status(200).json({ message: `Event deleted successfully`, event: deleteEvent });
   } catch (error) {
       if (error instanceof ZodError) {
        return res.status(400).json({ message: `Dados Invalidos ${error}` });
       }
       return res.status(400).json({ message: `Error deleting event: ${error}` });
    }
  }
}