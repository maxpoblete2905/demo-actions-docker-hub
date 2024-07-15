// src/auth/domain/repositories/user.repository.ts
import { User } from '../entities/user.entity';

export interface UserRepository {
    createUser(user: User): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    updateUser(user: User): Promise<void>;
}
