// src/user/application/services/user.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../domain/entities/create-user.entity';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { GetAllUsersUseCase } from '../use-cases/get-all-users.use-case';
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from '../use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../use-cases/delete-user.use-case';

@Injectable()
export class UserService {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.createUserUseCase.execute(createUserDto);
    }

    async findUsers(): Promise<User[]> {
        return await this.getAllUsersUseCase.execute();
    }

    async findUserById(uid: string): Promise<User | null> {
        return await this.getUserByIdUseCase.execute(uid);
    }

    async updateUser(uid: string, updateUserDto: CreateUserDto): Promise<User> {
        return await this.updateUserUseCase.execute(uid, updateUserDto);
    }

    async deleteUser(uid: string): Promise<boolean> {
        return await this.deleteUserUseCase.execute(uid);
    }
}
