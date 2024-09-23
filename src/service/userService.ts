import { UserCreationAttributes, UserAttributes } from "../database/models/user";
import User from "../database/models/user";
import bcrypt from "bcryptjs";
import userRepository from "../repository/userRepository";

class UserService{

    async createUser(user: UserCreationAttributes): Promise<User> {
        // Check if the email is already in use
        const existingUser = await userRepository.findByEmailUser(user.email);
        if (existingUser) {
            throw new Error("Email already in use");
        }

        // Using bcrypt to Encrypt password before saving
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        return await userRepository.createUser(user);
    }

    async findAllUsers(): Promise<User[]> {
        return await userRepository.findAllUsers();
    }

    async findUserById(id: number): Promise<User | null> {
        return await userRepository.findByIdUser(id);
    }

    async updateUser(id: number, user: Partial<UserAttributes>): Promise<User | null> {
        const existingUser = await this.findUserById(id);
        if (!existingUser) {
            throw new Error("User not found");
        }
        return await userRepository.updateUser(id, user);
    }

    async deleteUser(id: number): Promise<void> {
        const userDelete = await userRepository.findByIdUser(id);
        if (!userDelete) {
            throw new Error("User not found");
        }
        await userRepository.deleteUser(id);    
    }
}

export default new UserService();