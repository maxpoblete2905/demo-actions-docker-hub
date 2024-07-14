// Interfaz para datos de diagnóstico
export interface DiagnosisData {
    diagnosisType: DiagnosisType; // Tipo de diagnóstico
    cie10Code: string; // Código CIE 10
    description: string; // Descripción del diagnóstico
    observations: string; // Observaciones
}

// Enum para tipos de diagnóstico
export enum DiagnosisType {
    Presumptive = 'Presuntivo',
    Definitive = 'Definitivo'
}

export const diagnosis: DiagnosisData = {
    diagnosisType: DiagnosisType.Presumptive,
    cie10Code: 'A00',
    description: 'Cólera debido a Vibrio cholerae 01, biovar cholerae',
    observations: 'El paciente presenta síntomas leves.'
};
