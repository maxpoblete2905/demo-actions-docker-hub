// src/auth/application/use-cases/send-password-reset-email.usecase.ts
import { Injectable } from '@nestjs/common';
import { SendPasswordResetEmailDto } from '../dtos/send-password-reset-email.dto';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';

@Injectable()
export class SendPasswordResetEmailUseCase {
    constructor(private readonly userRepository: UserRepositoryImpl) { }

    async execute(sendPasswordResetEmailDto: SendPasswordResetEmailDto): Promise<void> {
        await this.userRepository.findUserByEmail(sendPasswordResetEmailDto.email)
    }
}