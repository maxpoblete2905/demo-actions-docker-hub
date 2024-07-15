import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../applications/dtos/create-user.dto';
import { UserService } from '../../applications/services/user.service';
import { User } from '../../domain/entities/create-user.entity';
import { TokenGuard } from '../../../../common/guards/firebase-custom-token.guard';
import { RolesGuard } from '../../../../common/guards/roles.guard';
import { Roles } from '../../../../common/decorators/roles.decorator';
import {
    ForbiddenResponse,
    UserCreatedResponse,
    UsersReturnedResponse,
    UserReturnedResponse,
    UserUpdatedResponse,
    UserDeletedResponse,
    UserNotFoundResponse,
} from '../swagger/swagger.responses';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(TokenGuard, RolesGuard)
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @UseGuards(RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse(UserCreatedResponse)
    @ApiResponse(ForbiddenResponse)
    async create(@Body() registerUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(registerUserDto);
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles('admin', 'user')  // Los usuarios con rol 'admin' o 'user' pueden acceder a esta ruta
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse(UsersReturnedResponse)
    @ApiResponse(ForbiddenResponse)
    async findAll(): Promise<User[]> {
        return this.userService.findUsers();
    }

    @Get(':id')
    @UseGuards(RolesGuard)
    @Roles('admin', 'user')  // Los usuarios con rol 'admin' o 'user' pueden acceder a esta ruta
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse(UserReturnedResponse)
    @ApiResponse(ForbiddenResponse)
    @ApiResponse(UserNotFoundResponse)
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findUserById(id);
    }

    @Put(':id')
    @UseGuards(RolesGuard)
    @Roles('admin')  // Solo los usuarios con rol 'admin' pueden acceder a esta ruta
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse(UserUpdatedResponse)
    @ApiResponse(ForbiddenResponse)
    async update(@Body() updateUserDto: CreateUserDto, @Param('id') id: string): Promise<User> {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':dni')
    @UseGuards(RolesGuard)
    @Roles('admin')  // Solo los usuarios con rol 'admin' pueden acceder a esta ruta
    @ApiOperation({ summary: 'Delete user by DNI' })
    @ApiResponse(UserDeletedResponse)
    @ApiResponse(ForbiddenResponse)
    async remove(@Param('dni') dni: string): Promise<boolean> {
        return this.userService.deleteUser(dni);
    }
}
