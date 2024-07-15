// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './presentation/controller/user.controller';
import { UserService } from './aplications/services/user.service';
import { FirebaseModule } from 'src/config/firebase/firebase.module';
import { UserRepository } from './insfractructura/repositories/user.repository';
import { DeleteUserUseCase } from './aplications/use-cases/delete-user.use-case';
import { CreateUserUseCase } from './aplications/use-cases/create-user.use-case';
import { GetAllUsersUseCase } from './aplications/use-cases/get-all-users.use-case';
import { GetUserByIdUseCase } from './aplications/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from './aplications/use-cases/update-user.use-case';

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
