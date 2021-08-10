export type Patient = {
  readonly id: number
  readonly createdAt?: Date
  readonly updatedAt?: Date
  readonly deletedAt?: Date
  readonly riskScore: RiskScore
}

type RiskScore = {
  readonly InclusionLabel: string
  readonly InclusionLabelType: string
  readonly TriageScore: string
}
