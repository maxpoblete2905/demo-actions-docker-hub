// src/user/application/use-cases/update-user.use-case.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../domain/entities/create-user.entity';
import { UserRepository } from '../../insfractructura/repositories/user.repository';

@Injectable()
export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(uid: string, updateUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.update(uid, { ...new User(), ...updateUserDto });
    }
}
