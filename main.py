from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import xgboost as xgb

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the models
scaler = joblib.load('scaler.pkl')
model = joblib.load('cancer_model.pkl')

class PatientData(BaseModel):
    age: float
    gender: str
    bmi: float
    smoking: bool
    geneticRisk: str
    physicalActivity: float
    alcoholIntake: float
    cancerHistory: bool

def map_features(data: PatientData) -> pd.DataFrame:
    gender_map = {'Male': 0, 'Female': 1, 'Other': 2}
    genetic_risk_map = {'Low': 0, 'Medium': 1, 'High': 2}
    features = {
        'Age': data.age,
        'Gender': gender_map.get(data.gender, 0),
        'BMI': data.bmi,
        'Smoking': 1 if data.smoking else 0,
        'GeneticRisk': genetic_risk_map.get(data.geneticRisk, 0),
        'PhysicalActivity': data.physicalActivity,
        'AlcoholIntake': data.alcoholIntake,
        'CancerHistory': 1 if data.cancerHistory else 0
    }
    return pd.DataFrame([features])

@app.post("/predict")
def predict_risk(data: PatientData):
    input_data = map_features(data)
    scaled_data = scaler.transform(input_data)
    dmatrix = xgb.DMatrix(scaled_data, feature_names=list(scaler.feature_names_in_))
    prediction_proba = model.get_booster().predict(dmatrix)
    risk_probability = float(prediction_proba[0]) * 100
    final_risk = max(1, min(99, round(risk_probability)))

    risk_level = 'Low'
    if final_risk >= 60:
        risk_level = 'High'
    elif final_risk >= 30:
        risk_level = 'Moderate'

    key_factors = []
    if data.age > 50: key_factors.append('Age over 50')
    if data.bmi > 25: key_factors.append('Elevated BMI')
    if data.smoking: key_factors.append('Smoking history')
    if data.geneticRisk == 'High': key_factors.append('High genetic predisposition')
    if data.cancerHistory: key_factors.append('Previous history of cancer')
    if not key_factors: key_factors.append('No major risk factors identified')

    return {
        "riskPercentage": final_risk,
        "riskLevel": risk_level,
        "keyFactors": key_factors
    }
