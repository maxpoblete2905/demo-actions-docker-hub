
export interface WorkPlaceModel {
    institution: string;
    position: string;
    currentlyWorking: boolean;
}

export interface CareTypeModel {
    presencial: boolean;
    telemedicine: boolean;
    homeVisit: boolean;
}

export interface Specialties {
    label: string;
    value: string
}

export interface Doctor {
    dni?: string;
    fullName: string;
    medicalRegistryNumber: string;
    specialties: Specialties[];
    workPlaces: WorkPlaceModel[];
    careTypes: CareTypeModel;
}
