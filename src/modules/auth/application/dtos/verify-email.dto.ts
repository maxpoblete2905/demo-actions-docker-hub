// src/auth/application/dtos/verify-email.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class VerifyEmailDto {
    @ApiProperty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
}
