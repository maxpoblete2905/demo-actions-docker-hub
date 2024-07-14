import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { TokenGuard } from 'src/modules/auth/auth.strategy';
import { User } from './interface/register-user.entity'; // Asegúrate de importar User adecuadamente

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @UseGuards(TokenGuard)
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() registerUserDto: RegisterUserDto): Promise<User> {
        return this.usersService.create(registerUserDto);
    }

    @Get()
    @UseGuards(TokenGuard)
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(TokenGuard)
    @ApiOperation({ summary: 'Get user by DNI' })
    @ApiResponse({ status: 200, description: 'Return the user with the given DNI.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    @UseGuards(TokenGuard)
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async update(@Body() registerUserDto: RegisterUserDto, @Param('id') id: string): Promise<User> {
        return this.usersService.update(id, registerUserDto);
    }

    @Delete(':dni')
    @UseGuards(TokenGuard)
    @ApiOperation({ summary: 'Delete user by DNI' })
    @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async remove(@Param('dni') dni: string): Promise<boolean> {
        return this.usersService.remove(dni);
    }
}
