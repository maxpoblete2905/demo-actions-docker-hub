// src/user/application/use-cases/delete-user.use-case.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../insfractructura/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(uid: string): Promise<boolean> {
        return await this.userRepository.remove(uid);
    }
}
