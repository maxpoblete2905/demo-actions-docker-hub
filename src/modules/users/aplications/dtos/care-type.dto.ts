import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class CareTypeDto {
    @ApiProperty({
        example: true,
        description: 'Indicates if the care type is presencial'
    })
    @IsBoolean()
    presencial: boolean;

    @ApiProperty({
        example: true,
        description: 'Indicates if the care type is telemedicine'
    })
    @IsBoolean()
    telemedicine: boolean;

    @ApiProperty({
        example: true,
        description: 'Indicates if the care type is home visit'
    })
    @IsBoolean()
    homeVisit: boolean;
}
