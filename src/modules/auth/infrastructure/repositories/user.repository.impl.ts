// src/auth/infrastructure/repositories/user.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(private readonly firebaseService: FirebaseService) { }

    async createUser(user: User): Promise<User> {
        const userRecord = await this.firebaseService.auth.createUser({
            email: user.email,
            password: user.password,
            displayName: user.displayName,
            photoURL: user.photoURL,
        });
        return { ...user, uid: userRecord.uid };
    }

    async findUserByEmail(email: string): Promise<User | null> {
        try {
            const userRecord = await this.firebaseService.auth.getUserByEmail(email);
            return {
                uid: userRecord.uid,
                email: userRecord.email,
                displayName: userRecord.displayName,
                photoURL: userRecord.photoURL,
            };
        } catch (error) {
            return null;
        }
    }

    async updateUser(user: User): Promise<void> {
        await this.firebaseService.auth.updateUser(user.uid, {
            displayName: user.displayName,
            photoURL: user.photoURL,
        });
    }
}
