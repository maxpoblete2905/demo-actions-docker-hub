import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
    @ApiProperty({
        example: 'example.jpg',
        description: 'The original name of the file',
    })
    @IsNotEmpty({ message: 'Original name must not be empty' })
    @IsString({ message: 'Original name must be a string' })
    originalname: string;
}
