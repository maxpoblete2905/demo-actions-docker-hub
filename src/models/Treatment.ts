// Interfaz para medicamentos
interface Medication {
    name: string; // Nombre del medicamento
    dosage: string; // Dosificación (ej. 500 mg)
    frequency: string; // Frecuencia horaria (ej. Cada 8 Hr)
    duration: string; // Duración del tratamiento (ej. 10 días)
    administrationRoute: string; // Vía de administración (ej. Oral)
}

// Interfaz para terapias
interface Therapy {
    name: string; // Nombre de la terapia
    sessions: number; // Cantidad de sesiones
    frequency: string; // Frecuencia horaria (ej. Cada 2 días)
    indications: string; // Indicaciones adicionales
}

// Interfaz para procedimientos
interface Procedure {
    name: string; // Nombre del procedimiento
    frequency: string; // Frecuencia horaria (ej. Cada 8 Hr)
    administrationRoute: string; // Vía de administración (ej. Subcutánea)
}

// Interfaz para operaciones
interface Operation {
    name: string; // Nombre de la operación
    frequency: string; // Frecuencia horaria (ej. Cada 8 Hr)
    administrationRoute: string; // Vía de administración (ej. Subcutánea)
}

// Interfaz para datos de tratamiento
interface TreatmentData {
    medications: Medication[]; // Lista de medicamentos seleccionados
    therapies: Therapy[]; // Lista de terapias seleccionadas
    procedures: Procedure[]; // Lista de procedimientos seleccionados
    operations: Operation[]; // Lista de operaciones seleccionadas
    additionalNotes: string; // Comentarios adicionales
}

// Ejemplo de uso
const treatment: TreatmentData = {
    medications: [
        {
            name: 'Ibuprofeno',
            dosage: '500 mg',
            frequency: 'Cada 8 Hr',
            duration: '10 días',
            administrationRoute: 'Oral'
        },
        {
            name: 'Acetaminofén',
            dosage: '1000 mg',
            frequency: 'Cada 8 Hr',
            duration: '10 días',
            administrationRoute: 'Oral'
        },
        {
            name: 'Densis',
            dosage: '5 mg',
            frequency: 'Cada 12 Hr',
            duration: '10 días',
            administrationRoute: 'Oral'
        },
        {
            name: 'Ambroxol',
            dosage: '10 mg',
            frequency: 'Cada 8 Hr',
            duration: '7 días',
            administrationRoute: 'Jarabe'
        },
        {
            name: 'Cetirizina',
            dosage: '10 mg',
            frequency: 'Cada 24 Hr',
            duration: '5 días',
            administrationRoute: 'Oral'
        },
        {
            name: 'Prednisona',
            dosage: '5 mg',
            frequency: 'Cada 8 Hr',
            duration: '5 días',
            administrationRoute: 'Oral'
        }
    ],
    therapies: [
        {
            name: 'Diatermia Fisioterapia con Microonda',
            sessions: 10,
            frequency: 'Cada 2 días',
            indications: 'Realizar las sesiones en la mañana.'
        }
    ],
    procedures: [
        {
            name: 'Administración de fármaco antineoplásico hormonal',
            frequency: 'Cada 8 Hr',
            administrationRoute: 'Subcutánea'
        }
    ],
    operations: [
        {
            name: 'Escisión de quiste o seno del conducto tirogloso',
            frequency: 'Una vez',
            administrationRoute: 'Subcutánea'
        }
    ],
    additionalNotes: 'Se sugiere llevar una dieta sana y hacer todos los estudios para la preparación de la operación.'
};
