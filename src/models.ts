export type Patient = {
  readonly id: number
  readonly createdAt?: string
  readonly updatedAt?: string
  readonly deletedAt?: string
  readonly riskScore: RiskScore
}

type RiskScore = {
  readonly InclusionLabel: string
  readonly InclusionLabelType: string
  readonly TriageScore: string
}

enum GenderCode {
  unknown = 0,
  male = 1,
  female = 2,
  notApplicable = 9,
}

export type WaitingListApiRequest = {
  cdPersonID?: string
  cdPersonForeignID?: string
  cdPersonPassportID?: string
  cdPersonNationalityCode?: number
  cdPersonNameTitleCode?: number
  cdPersonFirstName?: string
  cdPersonMiddleName?: string
  cdPersonLastName?: string
  cdPersonGenderCode?: GenderCode
  cdPersonAge?: number
  cdPersonBirthDate?: string
  cdPersonPhone1: string
  cdPersonPhone2?: string
  cdPersonCustodialPhone1?: string
  cdPersonCustodialPhone2?: string
  cdPersonWeightMeasure?: number
  cdPersonHeightMeasure?: number
  cdPersonBMIMeasure?: number
  emLaboratoryTestATK?: boolean
  emLaboratoryTestRTPCR?: boolean
  emLaboratoryTestDate?: string // "2021-08-09T00:00:00.000+07:00"
  emPatientGotFavipiravir?: boolean
  emPatientGotFavipiravirDate?: string // "2021-06-01"
  emPatientCommitTemperature?: number
  emPatientCommitPulse?: number
  emPatientCommitOxygenSaturation?: number
  emPatientCommitOxygenSaturationPost?: number
  emPatientCommitOxygenSaturationDiff?: number
  emPatientCommitSystolic?: number
  emPatientCommitDiastolic?: number
  emPatientCommitInspirationRate?: number
  emPatientPregnancyStatus?: boolean
  emPatientPregnancyWeeks?: number
  emPatientBedriddenStatus?: boolean
  emPatientSymptomsText?: string
  emPatientAllergyDrug?: string
  emPatientAllergyFood?: string
  emPatientFoodText?: string
  emPatientSymptomsCL1?: boolean
  emPatientSymptomsCL2?: boolean
  emPatientSymptomsCL3?: boolean
  emPatientSymptomsCL4?: boolean
  emPatientSymptomsCL5?: boolean
  emPatientSymptomsCL6?: boolean
  emPatientSymptomsCL7?: boolean
  emPatientSymptomsCL8?: boolean
  emPatientSymptomsCL9?: boolean
  emPatientSymptomsCL10?: boolean
  emPatientSymptomsCL11?: boolean
  emPatientSymptomsCL12?: boolean
  emPatientSymptomsCL13?: boolean
  emPatientSymptomsCL14?: boolean
  emPatientDiseaseCD1?: boolean
  emPatientDiseaseCD2?: boolean
  emPatientDiseaseCD3?: boolean
  emPatientDiseaseCD4?: boolean
  emPatientDiseaseCD5?: boolean
  emPatientDiseaseCD6?: boolean
  emPatientDiseaseCD7?: boolean
  emPatientDiseaseCD8?: boolean
  emPatientDiseaseCD9?: boolean
  emPatientDiseaseCD10?: boolean
  emPatientDiseaseCD11?: boolean
  emPatientDiseaseCD12?: boolean
  emPatientDiseaseCD13?: boolean
  emHICICode?: number
  emHICITypeCode?: number
  cdMedicalDoctorCode?: string
  emPatientCheckInDate?: string // "2021-06-01T00:00:00.000+07:00"
  emPatientCheckOutDate?: string // "2021-06-01T00:00:00.000+07:00"
  crProvinceCode: string
  crAmpurCode: string
  crTumbolCode?: string
  crMooCode?: string
  crRoad?: string
  crTrok?: string
  crSoi?: string
  crVillage?: string
  crZoneCode?: number
  crBuildingName?: string
  crAddressText?: string
  crGeographicCoordinateLatitude?: string
  crGeographicCoordinateLongitude?: string
  emPatientCommitDate?: string // "2021-06-01T00:00:00.000+07:00"
  emPatientMovementDate?: string // "2021-06-01T00:00:00.000+07:00"
  emPatientWaitingHours?: number
  emSourceNumberCode?: number
  emMoveToLocationCode?: string
  emMoveToLocationTypeCode?: number
  emMoveFromLocationCode?: string
  emMoveFromLocationTypeCode?: number
  emMoveToMethodCode?: number
  cdOrganizationMedicalUnit?: number
  hsPatientHospitalNumber?: string
  hsPatientAdmissionNumber?: string
  hsPatientHealthCoverage?: number
  riskScore: RiskScore
}
