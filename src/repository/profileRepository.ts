import Profile, { ProfileAtributes, ProfileCreationAttributes } from "../database/models/profile";

class ProfileRepository{
    async createProfile(profile: ProfileCreationAttributes): Promise<Profile> {
        try {
            return await Profile.create(profile);
        } catch (error) {
            throw new Error(`Failed to create profile ${error}`);
        }
    }

    async findAllProfiles(): Promise<Profile[]> {
        try {
            return await Profile.findAll();
        } catch (error) {
            throw new Error(`Failed to retrieve Profiles ${error}`);
        }
    }

    async findByIdProfile(id: number): Promise<Profile | null> {
        try {
            return await Profile.findByPk(id);
        } catch (error) {
            throw new Error(`Failed to retrieve Profile ${error}`);
        }    
    }

    async updateProfile(id: number, profile: Partial<ProfileAtributes>): Promise<Profile | null> {
        try {
            const existingProfile = await this.findByIdProfile(id);
            if (!existingProfile) {
                throw new Error(`Profile with id:${id} not found`)
            }
            return await existingProfile.update(profile);
        } catch (error) {
            throw new Error(`Failed to update Profile ${error}`);
        }
    }

    async deleteProfile(id: number): Promise<void> {
        try {
            const existingProfile = await this.findByIdProfile(id);
            if (!existingProfile) {
                throw new Error(`Profile with id ${id} not found`);
            }
            await existingProfile.destroy();
        } catch (error) {
            throw new Error(`Failed to delete Profile ${error}`);
        }
    }
}

export default new ProfileRepository();