// src/user/application/use-cases/get-all-users.use-case.ts
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/create-user.entity';
import { UserRepository } from '../../insfractructura/repositories/user.repository';

@Injectable()
export class GetAllUsersUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(): Promise<User[]> {
        return await this.userRepository.findAll();
    }
}
