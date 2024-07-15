import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../aplications/services/user.service';
import { CreateUserDto } from '../../aplications/dtos/create-user.dto';
import { TokenGuard } from '../../../../common/guards/firebase-custom-token.guard';
import { RolesGuard } from '../../../../common/guards/roles.guard';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { User } from '../../domain/entities/create-user.entity'; // Asegúrate de importar User adecuadamente

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(TokenGuard, RolesGuard) // Aplicar guards a nivel de controlador
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @UseGuards(RolesGuard)
    @Roles('admin')  // Solo los usuarios con rol 'admin' pueden acceder a esta ruta
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() registerUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(registerUserDto);
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles('admin', 'user')  // Los usuarios con rol 'admin' o 'user' pueden acceder a esta ruta
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findAll(): Promise<User[]> {
        return this.userService.findUsers();
    }

    @Get(':id')
    @UseGuards(RolesGuard)
    @Roles('admin', 'user')  // Los usuarios con rol 'admin' o 'user' pueden acceder a esta ruta
    @ApiOperation({ summary: 'Get user by DNI' })
    @ApiResponse({ status: 200, description: 'Return the user with the given DNI.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findUserById(id);
    }

    @Put(':id')
    @UseGuards(RolesGuard)
    @Roles('admin')  // Solo los usuarios con rol 'admin' pueden acceder a esta ruta
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async update(@Body() registerUserDto: CreateUserDto, @Param('id') id: string): Promise<User> {
        return this.userService.updateUser(id, registerUserDto);
    }

    @Delete(':dni')
    @UseGuards(RolesGuard)
    @Roles('admin')  // Solo los usuarios con rol 'admin' pueden acceder a esta ruta
    @ApiOperation({ summary: 'Delete user by DNI' })
    @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async remove(@Param('dni') dni: string): Promise<boolean> {
        return this.userService.deleteUser(dni);
    }
}
