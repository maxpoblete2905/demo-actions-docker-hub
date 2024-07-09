import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmailDto {
  @ApiProperty({
    example: '123456789',
    description: 'The UID of the user'
  })
  @IsString()
  @IsNotEmpty({ message: 'UID cannot be empty' })
  uid: string;

  @ApiProperty({
    example: 'newemail@example.com',
    description: 'The new email address of the user'
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'New email cannot be empty' })
  newEmail: string;
}
