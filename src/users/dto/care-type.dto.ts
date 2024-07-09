import { IsBoolean } from 'class-validator';

export class CareTypeDto {
    @IsBoolean()
    presencial: boolean;

    @IsBoolean()
    telemedicine: boolean;

    @IsBoolean()
    homeVisit: boolean;
}
