// src/user/interfaces/user.interface.ts
import { User } from '../entities/create-user.entity';

export interface IUserService {
    create(createUserDto: User): Promise<User>;

    findAll(): Promise<User[]>;

    findOne(uid: string): Promise<User>;

    update(uid: string, updateUserDto: User): Promise<User>;

    remove(uid: string): Promise<boolean>;
}
