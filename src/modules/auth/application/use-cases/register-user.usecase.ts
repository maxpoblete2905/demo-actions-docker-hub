// src/auth/application/use-cases/register-user.usecase.ts
import { Injectable } from '@nestjs/common';
import { CreateUserfirebaseDto } from '../dtos/create-user-firebase.dto';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  async execute(createUserDto: CreateUserfirebaseDto): Promise<User> {
    const user: User = {
      email: createUserDto.email,
      password: createUserDto.password,
      displayName: createUserDto.displayName,
      photoURL: createUserDto.photoURL,
    };
    return this.userRepository.createUser(user);
  }
}