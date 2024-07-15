// src/auth/application/dtos/send-password-reset-email.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendPasswordResetEmailDto {
    @ApiProperty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
}
