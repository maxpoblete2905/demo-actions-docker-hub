import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../domain/entities/create-user.entity';
import { UserRepository } from '../../insfractructura/repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.create({ ...new User(), ...createUserDto });
    }

}
