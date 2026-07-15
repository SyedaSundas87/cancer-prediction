from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# Allow your AI Studio UI (running on a different domain) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # for testing; restrict later to your UI's actual domain
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your saved model and scaler once, when the server starts
model = joblib.load("cancer_model.pkl")
scaler = joblib.load("scaler.pkl")

# Define the shape of the incoming data (must match your training features)
class PatientData(BaseModel):
    age: float
    gender: int
    bmi: float
    smoking: int
    genetic_risk: int
    physical_activity: float
    alcohol_intake: float
    cancer_history: int

@app.post("/predict")
def predict(data: PatientData):
    features = np.array([[
        data.age, data.gender, data.bmi, data.smoking,
        data.genetic_risk, data.physical_activity,
        data.alcohol_intake, data.cancer_history
    ]])
    
    scaled_features = scaler.transform(features)
    
    prediction = model.predict(scaled_features)[0]
    probability = model.predict_proba(scaled_features)[0][1]  # confidence of "cancer" class
    
    return {
        "prediction": int(prediction),
        "result": "High Risk" if prediction == 1 else "Low Risk",
        "confidence": round(float(probability), 3)
    }

@app.get("/")
def health_check():
    return {"status": "API is running"}
