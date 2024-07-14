// Interfaz base con datos comunes de usuario
export interface User {
    documentType: string; // Tipo de documento
    documentNumber: string; // Número de documento
    firstName: string; // Nombres
    lastName: string; // Apellidos
    age: number; // Edad
    phoneNumber: string; // Teléfono
}

// Interfaz para los datos personales del paciente, extendiendo de User
export interface PatientPersonalData extends User {
    medicalHistory: string; // Historia clínica
    insuranceType: string; // Tipo de seguro
    dateOfBirth: string; // Fecha de nacimiento
    sex: string; // Sexo
    maritalStatus: string; // Estado civil
    countryOfBirth: string; // País de nacimiento
    cityOfBirth: string; // Ciudad de nacimiento
    religion: string; // Religión
    ethnicity: string; // Etnia
    address: string; // Dirección
    addressNumber: string; // Número de casa o departamento
    educationLevel: string; // Grado de instrucción
    occupation: string; // Ocupación
    email: string; // Correo electrónico
    weight?: number; // Peso (opcional)
    height?: number; // Altura (opcional)
    bloodType?: string; // Grupo sanguíneo (opcional)
    hasCompanion?: boolean; // ¿El paciente viene con acompañante? (opcional)
}

// Interfaz para los datos del acompañante, extendiendo de User
export interface CompanionData extends User {
    relationship: string; // Parentesco con el paciente
}

// Ejemplo de uso
export const patient: PatientPersonalData = {
    documentType: 'DNI',
    documentNumber: '42181478-9',
    medicalHistory: '42181478',
    insuranceType: 'SOAT',
    firstName: 'Jimmy',
    lastName: 'Sarmiento',
    dateOfBirth: '09/01/1980',
    age: 33,
    sex: 'Masculino',
    maritalStatus: 'Casado',
    countryOfBirth: 'Perú',
    cityOfBirth: 'Lima',
    religion: 'No especifica',
    ethnicity: 'No especifica',
    address: 'Caserío Peregrino 1022',
    addressNumber: 'Casa 15',
    educationLevel: 'Universitario',
    occupation: 'Arquitecto',
    phoneNumber: '+51 2334 11 22',
    email: 'jimmy@gmail.com',
    weight: 70,
    height: 1.75,
    bloodType: 'O+',
    hasCompanion: true
};

export const companion: CompanionData = {
    documentType: 'DNI',
    documentNumber: '1235066-2',
    firstName: 'Margarita Francisca',
    lastName: 'Parra Castro',
    age: 67,
    phoneNumber: '+51 233 666 444',
    relationship: 'Familia'
};
