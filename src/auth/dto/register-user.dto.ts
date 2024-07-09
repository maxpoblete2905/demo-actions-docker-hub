import { IsString, IsOptional, IsEmail, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO para crear un usuario en Firebase
export class CreateUserFirebaseDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user'
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user'
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The display name of the user'
  })
  @IsString()
  displayName: string;

  @ApiProperty({
    example: '123456789',
    description: 'The phone number of the user (optional)'
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: 'The URL of the user\'s photo (optional)'
  })
  @IsOptional()
  @IsString()
  photoURL?: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the email address has been verified'
  })
  @IsBoolean()
  emailVerified: boolean;

  @ApiProperty({
    example: false,
    description: 'Indicates if the account is disabled'
  })
  @IsBoolean()
  disabled: boolean;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user (optional)'
  })
  @IsOptional()
  @IsString()
  fullName?: string;
}
