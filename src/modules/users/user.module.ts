// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './presentation/controller/user.controller';
import { UserService } from './applications/services/user.service';
import { FirebaseModule } from 'src/config/firebase/firebase.module';
import { UserRepository } from './insfractructura/repositories/user.repository';
import { DeleteUserUseCase } from './applications/use-cases/delete-user.use-case';
import { CreateUserUseCase } from './applications/use-cases/create-user.use-case';
import { GetAllUsersUseCase } from './applications/use-cases/get-all-users.use-case';
import { GetUserByIdUseCase } from './applications/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from './applications/use-cases/update-user.use-case';

@Module({
  imports: [FirebaseModule],
  controllers: [UsersController],
  providers: [
    UserService,
    UserRepository,
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [UserService], // Exporta el servicio si otros módulos lo necesitan
})
export class UsersModule { }
