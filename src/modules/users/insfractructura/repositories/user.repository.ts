// src/user/infrastructure/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/create-user.entity';
import { IUserService } from '../../domain/interfaces/user.interface';
import { FirebaseConfigService } from '../../../../config/firebase/firebase-config.service';

@Injectable()
export class UserRepository implements IUserService {

    private db = null;

    constructor(private readonly firebaseConfigService: FirebaseConfigService) {

        this.db = this.firebaseConfigService.firestore
    }
    async create(createUserDto: User): Promise<User> {
        const userRef = this.db.collection('users').doc();
        createUserDto.dni = userRef.id;
        await userRef.set(createUserDto);
        return createUserDto;
    }

    async findAll(): Promise<User[] | null> {
        const usersSnapshot = await this.db.collection('users').get();
        if (usersSnapshot.empty) {
            return null;
        }
        const users: User[] = [];
        usersSnapshot.forEach((doc: { data: () => User; }) => {
            users.push(doc.data() as User);
        });
        return users;
    }

    async findOne(uid: string): Promise<User | null> {
        const userDoc = await this.db.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            return null;
        }
        return userDoc.data() as User;
    }

    async update(uid: string, user: User): Promise<User> {
        await this.db.collection('users').doc(uid).update(user);
        return user;
    }

    async remove(uid: string): Promise<boolean> {
        return await this.db.collection('users').doc(uid).delete();
    }

}
