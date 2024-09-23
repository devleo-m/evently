import Participation, { ParticipationAttributes, ParticipationCreationAttributes } from "../database/models/participation";

class ParticipationRepository{
    async createParticipation(participation: ParticipationCreationAttributes): Promise<Participation> {
        try {
            return await Participation.create(participation);
        } catch (error) {
            throw new Error(`Failed to create participation ${error}`);
        }
    }

    async findAllParticipations(): Promise<Participation[]> {
        try {
            return await Participation.findAll();
        } catch (error) {
            throw new Error(`Failed to retrieve Participations ${error}`);
        }
    }

    async findByIdParticipation(id: number): Promise<Participation | null> {
        try {
            return await Participation.findByPk(id);
        } catch (error) {
            throw new Error(`Failed to retrieve Participation ${error}`);
        }    
    }

    async updateParticipation(id: number, participation: Partial<ParticipationAttributes>): Promise<Participation | null> {
        try {
            const existingParticipation = await this.findByIdParticipation(id);
            if (!existingParticipation) {
                throw new Error(`Participation with id:${id} not found`)
            }
            return await existingParticipation.update(participation);
        } catch (error) {
            throw new Error(`Failed to update Participation ${error}`);
        }
    }

    async deleteParticipation(id: number): Promise<void> {
        try {
            const existingParticipation = await this.findByIdParticipation(id);
            if (!existingParticipation) {
                throw new Error(`Participation with id ${id} not found`);
            }
            await existingParticipation.destroy();
        } catch (error) {
            throw new Error(`Failed to delete Participation ${error}`);
        }
    }
}

export default new ParticipationRepository();