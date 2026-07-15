export type Gender = 'Male' | 'Female' | 'Other';
export type GeneticRisk = 'Low' | 'Medium' | 'High';

export interface PatientData {
  age: number;
  gender: Gender;
  bmi: number;
  smoking: boolean;
  geneticRisk: GeneticRisk;
  physicalActivity: number;
  alcoholIntake: number;
  cancerHistory: boolean;
}

export interface PredictionResult {
  riskPercentage: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  keyFactors: string[];
}
