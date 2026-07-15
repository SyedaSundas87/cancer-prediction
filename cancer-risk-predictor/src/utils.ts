import { PatientData, PredictionResult } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function analyzeRisk(data: PatientData): Promise<PredictionResult> {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching prediction:", error);
    throw error;
  }
}
