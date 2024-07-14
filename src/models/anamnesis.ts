// Interfaz para signos vitales
export interface VitalSigns {
    temperature: number; // Temperatura
    saturation: number; // Saturación
    heartRate: number; // Frecuencia cardiaca (ppm)
    bloodPressure: string; // Presión arterial (mmHg)
}

// Interfaz para referencia de especialista
export interface Referral {
    specialistName: string; // Nombre del especialista
    specialty: string; // Especialidad
}

// Interfaz para los datos de anamnesis
export interface AnamnesisData {
    vitalSigns: VitalSigns; // Signos vitales
    allergies: string[]; // Alergias
    preExistingConditions: string[]; // Enfermedades pre-existentes
    previousSurgeries: string[]; // Cirugías anteriores
    frequentMedications: string[]; // Medicamentos de uso frecuente
    referredBy: Referral; // Referido
    familyHistory: string; // Antecedentes familiares
    reasonForVisit: string; // Motivo de visita
    lifestyle: string; // Estilo de vida
}

export const anamnesis: AnamnesisData = {
    vitalSigns: {
        temperature: 36.5,
        saturation: 98,
        heartRate: 72,
        bloodPressure: '120/80'
    },
    allergies: ['Penicilina', 'Polen'],
    preExistingConditions: ['Diabetes', 'Hipertensión'],
    previousSurgeries: ['Apendicectomía', 'Cirugía de rodilla'],
    frequentMedications: ['Metformina', 'Lisinopril'],
    referredBy: {
        specialistName: 'Dr. Juan Pérez',
        specialty: 'Cardiología'
    },
    familyHistory: 'Historia de enfermedades cardíacas en la familia',
    reasonForVisit: 'Chequeo rutinario',
    lifestyle: 'Duerme 8 horas, hace deporte 3 veces a la semana, no fuma, consume alcohol ocasionalmente'
};
