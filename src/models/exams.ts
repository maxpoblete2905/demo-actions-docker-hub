// Interface for Patient Identification
interface Identification {
    name: string; // Nombre del paciente
    age: number; // Edad del paciente
    gender: 'Male' | 'Female' | 'Other'; // Género del paciente
    // Other relevant identification fields
}

// Interface for Medical History (Anamnesis)
interface Anamnesis {
    history: string; // Antecedentes médicos
    symptoms: string; // Síntomas
    previousTreatments: string; // Tratamientos previos
    // Other relevant fields for medical history
}

// Interface for Diagnosis
interface Diagnosis {
    description: string; // Descripción del diagnóstico
    recommendations: string; // Recomendaciones
    // Other relevant fields for diagnosis
}

// Interface for Treatments
interface Treatment {
    name: string; // Nombre del tratamiento
    description: string; // Descripción del tratamiento
    duration: string; // Duración del tratamiento
    // Other relevant fields for treatments
}

// Interface for Exams
interface Exam {
    name: string; // Nombre del examen
    description: string; // Descripción del examen
    attachment: string; // Adjunto del examen (puede ser una URL o referencia al archivo)
}

// Interface for Exams Section in the UI
interface ExamsSection {
    selectedExams: Exam[]; // Exámenes seleccionados
    attachments: string[]; // Array de URLs o rutas de archivos adjuntos
    diagnosis: string; // Diagnóstico de los exámenes
}
