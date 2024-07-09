import { ApiProperty } from '@nestjs/swagger';

export class WorkPlaceDTO {
    @ApiProperty({
        example: 'Medical Center XYZ',
        description: 'The institution or company name'
    })
    institution: string;

    @ApiProperty({
        example: 'Doctor',
        description: 'The position or job title'
    })
    position: string;

    @ApiProperty({
        example: true,
        description: 'Indicates if currently working at this place'
    })
    currentlyWorking: boolean;
}
