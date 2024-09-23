import { ProfileCreationAttributes, ProfileAttributes } from "../database/models/profile";
import Profile from "../database/models/profile";
import profileRepository from "../repository/profileRepository";

class ProfileService{

    async createProfile(profile: ProfileCreationAttributes): Promise<Profile> {
        return await profileRepository.createProfile(profile);
    }

    async findAllProfiles(): Promise<Profile[]> {
        return await profileRepository.findAllProfiles();
    }

    async findProfileById(id: number): Promise<Profile | null> {
        return await profileRepository.findByIdProfile(id);
    }

    async updateProfile(id: number, profile: Partial<ProfileAttributes>): Promise<Profile | null> {
        const existingProfile = await this.findProfileById(id);
        if (!existingProfile) {
            throw new Error("Profile not found");
        }
        return await profileRepository.updateProfile(id, profile);
    }

    async deleteProfile(id: number): Promise<void> {
        const profileDelete = await profileRepository.findByIdProfile(id);
        if (!profileDelete) {
            throw new Error("Profile not found");
        }
        await profileRepository.deleteProfile(id);    
    }
}

export default new ProfileService();