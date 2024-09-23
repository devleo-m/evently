import Event, { EventAttributes, EventCreationAttributes } from "../database/models/event";

class EventRepository{
    async createEvent(event: EventCreationAttributes): Promise<Event> {
        try {
            return await Event.create(event);
        } catch (error) {
            throw new Error(`Failed to create event ${error}`);
        }
    }

    async findAllEvents(): Promise<Event[]> {
        try {
            return await Event.findAll();
        } catch (error) {
            throw new Error(`Failed to retrieve Events ${error}`);
        }
    }

    async findByIdEvent(id: number): Promise<Event | null> {
        try {
            return await Event.findByPk(id);
        } catch (error) {
            throw new Error(`Failed to retrieve Event ${error}`);
        }    
    }

    async updateEvent(id: number, event: Partial<EventAttributes>): Promise<Event | null> {
        try {
            const existingEvent = await this.findByIdEvent(id);
            if (!existingEvent) {
                throw new Error(`Event with id:${id} not found`)
            }
            return await existingEvent.update(event);
        } catch (error) {
            throw new Error(`Failed to update Event ${error}`);
        }
    }

    async deleteEvent(id: number): Promise<void> {
        try {
            const existingEvent = await this.findByIdEvent(id);
            if (!existingEvent) {
                throw new Error(`Event with id ${id} not found`);
            }
            await existingEvent.destroy();
        } catch (error) {
            throw new Error(`Failed to delete Event ${error}`);
        }
    }
}

export default new EventRepository();