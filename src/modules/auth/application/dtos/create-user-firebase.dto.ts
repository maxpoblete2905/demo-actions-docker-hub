// src/auth/application/dtos/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateUserfirebaseDto {
    @ApiProperty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    displayName: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    photoURL?: string;
}
