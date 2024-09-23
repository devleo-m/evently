import { ParticipationCreationAttributes, ParticipationAttributes } from "../database/models/participation";
import Participation from "../database/models/participation";
import participationRepository from "../repository/participationRepository";

class ParticipationService{

    async createParticipation(participation: ParticipationCreationAttributes): Promise<Participation> {
        return await participationRepository.createParticipation(participation);
    }

    async findAllParticipations(): Promise<Participation[]> {
        return await participationRepository.findAllParticipations();
    }

    async findParticipationById(id: number): Promise<Participation | null> {
        return await participationRepository.findByIdParticipation(id);
    }

    async updateParticipation(id: number, participation: Partial<ParticipationAttributes>): Promise<Participation | null> {
        const existingParticipation = await this.findParticipationById(id);
        if (!existingParticipation) {
            throw new Error("Participation not found");
        }
        return await participationRepository.updateParticipation(id, participation);
    }

    async deleteParticipation(id: number): Promise<void> {
        const participationDelete = await participationRepository.findByIdParticipation(id);
        if (!participationDelete) {
            throw new Error("Participation not found");
        }
        await participationRepository.deleteParticipation(id);    
    }
}

export default new ParticipationService();