// src/user/interfaces/user.interface.ts
import { RegisterUserDto } from '../dto/register-user.dto';
import { User } from './register-user.entity';

export interface IUserService {
    create(createUserDto: User): Promise<User>;

    findAll(): Promise<User[]>;

    findOne(uid: string): Promise<User>;

    update(uid: string, updateUserDto: Partial<RegisterUserDto>): Promise<User>;

    remove(uid: string): Promise<boolean>;
}
