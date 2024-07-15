// src/user/application/use-cases/get-user-by-id.use-case.ts
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/create-user.entity';
import { UserRepository } from '../../insfractructura/repositories/user.repository';

@Injectable()
export class GetUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(uid: string): Promise<User | null> {
        return await this.userRepository.findOne(uid);
    }
}
