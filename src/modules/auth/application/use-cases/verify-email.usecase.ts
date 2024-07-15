// src/auth/application/use-cases/verify-email.usecase.ts
import { Injectable } from '@nestjs/common';
import { VerifyEmailDto } from '../dtos/verify-email.dto';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';

@Injectable()
export class VerifyEmailUseCase {
  constructor(private readonly firebaseService: UserRepositoryImpl) { }

  async execute(verifyEmailDto: VerifyEmailDto): Promise<void> {
    await this.firebaseService.findUserByEmail(verifyEmailDto.email);
  }
}