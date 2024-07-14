interface PatientBasicInfo {
    documentType: string;
    documentNumber: string;
    fullName: string;
    email: string;
    contactPhone: string;
    insurance: string;
}

interface ConsultationDetails {
    patientInfo: PatientBasicInfo;
    consultationType: string;
}

const exampleConsultation: ConsultationDetails = {
    patientInfo: {
        documentType: "DNI",
        documentNumber: "42181478-9",
        fullName: "Jorge Tamani",
        email: "j.tamani1993@gmail.com",
        contactPhone: "+51 2334 11 22",
        insurance: "SOAT"
    },
    consultationType: "Presencial (Centro de salud)"
};
