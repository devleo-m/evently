import { EventCreationAttributes, EventAttributes } from "../database/models/event";
import Event from "../database/models/event";
import eventRepository from "../repository/eventRepository";

class EventService{

    async createEvent(event: EventCreationAttributes): Promise<Event> {
        return await eventRepository.createEvent(event);
    }

    async findAllEvents(): Promise<Event[]> {
        return await eventRepository.findAllEvents();
    }

    async findEventById(id: number): Promise<Event | null> {
        return await eventRepository.findByIdEvent(id);
    }

    async updateEvent(id: number, event: Partial<EventAttributes>): Promise<Event | null> {
        const existingEvent = await this.findEventById(id);
        if (!existingEvent) {
            throw new Error("Event not found");
        }
        return await eventRepository.updateEvent(id, event);
    }

    async deleteEvent(id: number): Promise<void> {
        const eventDelete = await eventRepository.findByIdEvent(id);
        if (!eventDelete) {
            throw new Error("Event not found");
        }
        await eventRepository.deleteEvent(id);    
    }
}

export default new EventService();