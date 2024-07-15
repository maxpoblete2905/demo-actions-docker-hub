// src/auth/application/services/auth.service.ts
import { Injectable } from '@nestjs/common';
import { RegisterUserUseCase } from '../use-cases/register-user.usecase';
import { SendPasswordResetEmailUseCase } from '../use-cases/send-password-reset-email.usecase';
import { VerifyEmailUseCase } from '../use-cases/verify-email.usecase';
import { CreateUserfirebaseDto } from '../dtos/create-user-firebase.dto';
import { SendPasswordResetEmailDto } from '../dtos/send-password-reset-email.dto';
import { VerifyEmailDto } from '../dtos/verify-email.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly sendPasswordResetEmailUseCase: SendPasswordResetEmailUseCase,
        private readonly verifyEmailUseCase: VerifyEmailUseCase,
    ) { }

    async register(createUserDto: CreateUserfirebaseDto): Promise<User> {
        return this.registerUserUseCase.execute(createUserDto);
    }

    async sendPasswordResetEmail(sendPasswordResetEmailDto: SendPasswordResetEmailDto): Promise<void> {
        return this.sendPasswordResetEmailUseCase.execute(sendPasswordResetEmailDto);
    }

    async verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<void> {
        return this.verifyEmailUseCase.execute(verifyEmailDto);
    }
}
