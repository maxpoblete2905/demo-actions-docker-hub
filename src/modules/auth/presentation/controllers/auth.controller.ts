import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { CreateUserfirebaseDto } from '../../application/dtos/create-user-firebase.dto';
import { SendPasswordResetEmailDto } from '../../application/dtos/send-password-reset-email.dto';
import { VerifyEmailDto } from '../../application/dtos/verify-email.dto';
import { User } from '../../domain/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: CreateUserfirebaseDto })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async register(@Body() createUserDto: CreateUserfirebaseDto): Promise<User> {
        return this.authService.register(createUserDto);
    }

    @Post('send-password-reset-email')
    @ApiOperation({ summary: 'Send a password reset email' })
    @ApiBody({ type: SendPasswordResetEmailDto })
    @ApiResponse({ status: 200, description: 'Password reset email sent successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async sendPasswordResetEmail(@Body() sendPasswordResetEmailDto: SendPasswordResetEmailDto): Promise<void> {
        return this.authService.sendPasswordResetEmail(sendPasswordResetEmailDto);
    }

    @Post('verify-email')
    @ApiOperation({ summary: 'Verify email address' })
    @ApiBody({ type: VerifyEmailDto })
    @ApiResponse({ status: 200, description: 'Email verified successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto): Promise<void> {
        return this.authService.verifyEmail(verifyEmailDto);
    }
}
