import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'; // Importa las decoraciones necesarias
import { CreateUserFirebaseDto } from './dto/register-user.dto';
import { TokenGuard } from './auth.strategy';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user in firebase autentication' }) // Descripción del endpoint en Swagger
    @ApiBody({ type: CreateUserFirebaseDto }) // Especifica el tipo de cuerpo (body) esperado en Swagger
    @UseGuards(TokenGuard)
    async register(@Body() registerUserDto: CreateUserFirebaseDto) {
        return await this.authService.crearteUserAccessFirebase(registerUserDto);
    }

    @Post('recover-password')
    @ApiOperation({ summary: 'Recover password for a user' })
    @ApiResponse({ status: 200, description: 'Password recovery email sent successfully' })
    @UseGuards(TokenGuard)
    async recoverPassword(@Body('email') email: string) {
        return await this.authService.recoverPassword(email);
    }

}
