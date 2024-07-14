export interface Institution {
    uid: string; // ID único de la institución
    name: string; // Nombre de la institución
    description?: string; // Descripción opcional
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode?: string;
    };
    contact: {
        email: string;
        phone?: string;
        website?: string;
    };
    establishedAt?: Date;
    isActive: boolean;
}
