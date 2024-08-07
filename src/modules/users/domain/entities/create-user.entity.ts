import { WorkPlace } from './work-place';
import { CareType } from './care-type';

export class User {
    dni?: string;
    fullName: string;
    medicalRegistryNumber: string;
    specialties: string[];
    workPlaces: WorkPlace[];
    careTypes: CareType;
}
