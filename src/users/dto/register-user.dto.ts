import { IsString, IsNotEmpty, IsArray, ValidateNested, IsObject, IsOptional, ArrayMinSize, IsBoolean, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { WorkPlaceDTO } from '../dto/work-place';
import { CareTypeDto } from '../dto/care-type.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {

    @ApiProperty({
        example: 'John Doe',
        description: 'The full name of the user'
    })
    @IsString()
    @IsNotEmpty({ message: 'Full name cannot be empty' })
    fullName: string;

    @ApiProperty({
        example: 'MRN123456',
        description: 'The medical registry number of the user'
    })
    @IsString()
    @IsNotEmpty()
    medicalRegistryNumber: string;

    @ApiProperty({
        example: ['Cardiology', 'Neurology'],
        description: 'The specialties of the user',
        isArray: true
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    specialties: string[];

    @ApiProperty({
        type: [WorkPlaceDTO],
        description: 'The work places of the user',
        example: [{ name: 'Hospital A', address: '123 Street' }]
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => WorkPlaceDTO)
    workPlaces: WorkPlaceDTO[];

    @ApiProperty({
        type: CareTypeDto,
        description: 'The care types of the user',
        example: { type: 'Primary Care', availability: 'Full-time' }
    })
    @IsObject()
    @ValidateNested()
    @Type(() => CareTypeDto)
    careTypes: CareTypeDto;
}
