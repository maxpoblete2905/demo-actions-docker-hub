// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './presentation/controllers/auth.controller';
import { FirebaseService } from './infrastructure/firebase/firebase.service';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
import { RegisterUserUseCase } from './application/use-cases/register-user.usecase';
import { SendPasswordResetEmailUseCase } from './application/use-cases/send-password-reset-email.usecase';
import { VerifyEmailUseCase } from './application/use-cases/verify-email.usecase';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    FirebaseService,
    RegisterUserUseCase,
    SendPasswordResetEmailUseCase,
    VerifyEmailUseCase,
    UserRepositoryImpl
  ],
})
export class AuthModule { }
