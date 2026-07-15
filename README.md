# 🩺 Cancer Risk Predictor

<div align="center">

![Cancer Risk Predictor Banner](https://img.shields.io/badge/AI--Powered-Cancer%20Risk%20Predictor-00BCD4?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0yMiAxMmgtNGwtMyA5TDkgM2wtMyA5SDIiLz48L3N2Zz4=)

[![FastAPI](https://img.shields.io/badge/FastAPI-0.139.0-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![XGBoost](https://img.shields.io/badge/XGBoost-1.7.6-FF6600?style=flat-square)](https://xgboost.readthedocs.io/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.9.0-F7931E?style=flat-square&logo=scikit-learn)](https://scikit-learn.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=flat-square&logo=render)](https://render.com)

**An AI-powered cancer risk assessment web application that uses a trained XGBoost machine learning model to predict cancer risk based on patient health profiles.**

[🚀 Live Demo](#) &nbsp;|&nbsp; [📖 API Docs](#api-documentation) &nbsp;|&nbsp; [🐛 Report Bug](https://github.com/SyedaSundas87/cancer-prediction/issues) &nbsp;|&nbsp; [✨ Request Feature](https://github.com/SyedaSundas87/cancer-prediction/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment-on-render)
- [Model Details](#-model-details)
- [Contributing](#-contributing)
- [Disclaimer](#%EF%B8%8F-disclaimer)
- [License](#-license)

---

## 🔬 About the Project

Cancer Risk Predictor is a full-stack web application that bridges the gap between machine learning research and practical healthcare tooling. It takes 8 key patient health metrics as input, processes them through a trained XGBoost classification model, and returns a real-time cancer risk probability score along with the primary contributing risk factors.

The project consists of two tightly integrated parts:
- **Backend** — A Python FastAPI server that loads the trained ML models and exposes a `/predict` REST endpoint.
- **Frontend** — A sleek React + TypeScript single-page application with an interactive patient data form and animated risk visualization.

---

## ✨ Features

- 🤖 **Real ML Predictions** — Powered by a trained XGBoost model, not a mock calculation
- ⚡ **Fast & Responsive API** — FastAPI backend with async support and automatic OpenAPI docs
- 🎨 **Premium UI** — Glassmorphism design with smooth animations and a dark medical theme
- 📊 **Animated Risk Gauge** — Circular progress indicator animates from 0% to the predicted risk
- 🏷️ **Risk Level Classification** — Results clearly categorized as Low / Moderate / High risk
- 🔑 **Key Factor Insights** — Shows the top contributing factors to the predicted risk score
- 🌐 **CORS Enabled** — Seamless frontend-to-backend communication
- ☁️ **Render Ready** — Includes `render.yaml` Blueprint for one-click cloud deployment
- 🔒 **Secrets Safe** — `.gitignore` configured to prevent accidental exposure of `.env` files and model artifacts

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Python | 3.11+ | Core language |
| FastAPI | 0.139 | REST API framework |
| Uvicorn | Latest | ASGI server |
| XGBoost | 1.7.6 | ML model serving |
| scikit-learn | 1.9.0 | Data preprocessing (StandardScaler) |
| Pandas | 3.x | Data manipulation |
| Joblib | Latest | Model deserialization |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI library |
| TypeScript | 5.8 | Type-safe JavaScript |
| Vite | 6.x | Build tool & dev server |
| Tailwind CSS | 4.x | Utility-first styling |
| Motion (Framer) | 12.x | UI animations |
| Lucide React | Latest | Icon library |

---

## 📁 Project Structure

```
cancer-prediction/
│
├── 📄 main.py                        # FastAPI application & /predict endpoint
├── 📄 requirements.txt               # Python dependencies
├── 📄 render.yaml                    # Render deployment Blueprint
├── 📄 .gitignore                     # Git ignore rules
├── 🤖 cancer_model.pkl               # Trained XGBoost model
├── ⚙️  scaler.pkl                     # Fitted StandardScaler
│
└── 📁 cancer-risk-predictor/         # React frontend application
    ├── 📄 index.html
    ├── 📄 package.json
    ├── 📄 vite.config.ts
    ├── 📄 tsconfig.json
    └── 📁 src/
        ├── 📄 App.tsx                # Root component
        ├── 📄 main.tsx               # React entry point
        ├── 📄 index.css              # Global styles & fonts
        ├── 📄 types.ts               # TypeScript interfaces
        ├── 📄 utils.ts               # API call logic
        └── 📁 components/
            ├── 📄 Header.tsx
            ├── 📄 Footer.tsx
            ├── 📄 PredictionCard.tsx # Patient input form
            └── 📄 ResultsView.tsx    # Animated results display
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Python** 3.11 or higher
- **Node.js** 18 or higher
- **npm** 9 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SyedaSundas87/cancer-prediction.git
   cd cancer-prediction
   ```

2. **Set up the Python backend**
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate

   pip install -r requirements.txt
   ```

3. **Set up the React frontend**
   ```bash
   cd cancer-risk-predictor
   npm install
   cd ..
   ```

### Running Locally

You need **two terminals** running simultaneously.

**Terminal 1 — Start the FastAPI Backend:**
```bash
# From the root of the project
venv\Scripts\activate   # Windows
# or: source venv/bin/activate   (macOS/Linux)

uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
> The API will be live at `http://127.0.0.1:8000`
> Interactive docs available at `http://127.0.0.1:8000/docs`

**Terminal 2 — Start the React Frontend:**
```bash
cd cancer-risk-predictor
npm run dev
```
> The app will be live at `http://localhost:3000`

---

## 📖 API Documentation

### `POST /predict`

Predicts the cancer risk level for a patient based on their health profile.

**Request Body:**
```json
{
  "age": 55,
  "gender": "Female",
  "bmi": 28.5,
  "smoking": true,
  "geneticRisk": "High",
  "physicalActivity": 2,
  "alcoholIntake": 5,
  "cancerHistory": false
}
```

**Field Descriptions:**
| Field | Type | Description |
|---|---|---|
| `age` | `float` | Patient age (20–80) |
| `gender` | `string` | `"Male"`, `"Female"`, or `"Other"` |
| `bmi` | `float` | Body Mass Index (15–40) |
| `smoking` | `boolean` | Whether the patient is a smoker |
| `geneticRisk` | `string` | `"Low"`, `"Medium"`, or `"High"` |
| `physicalActivity` | `float` | Active days per week (0–7) |
| `alcoholIntake` | `float` | Drinks per week (0–21) |
| `cancerHistory` | `boolean` | Prior cancer diagnosis |

**Response:**
```json
{
  "riskPercentage": 73,
  "riskLevel": "High",
  "keyFactors": [
    "Age over 50",
    "Elevated BMI",
    "Smoking history",
    "High genetic predisposition"
  ]
}
```

**Risk Level Thresholds:**
| Risk Level | Percentage Range |
|---|---|
| 🟢 Low | 1% – 29% |
| 🟡 Moderate | 30% – 59% |
| 🔴 High | 60% – 99% |

> 💡 Full interactive API docs are available at `http://127.0.0.1:8000/docs` when running locally.

---

## ☁️ Deployment on Render

This project includes a `render.yaml` Blueprint for seamless deployment on [Render](https://render.com).

### Steps

1. Push this repository to GitHub (already done ✅)
2. Go to [dashboard.render.com](https://dashboard.render.com)
3. Click **New** → **Blueprint**
4. Connect your GitHub account and select the `cancer-prediction` repository
5. Render will auto-detect `render.yaml` and provision:
   - 🐍 **`cancer-prediction-api`** — Python Web Service (FastAPI)
   - ⚛️ **`cancer-risk-frontend`** — Static Site (React)
6. After deployment, set the `VITE_API_URL` environment variable on the frontend service to the deployed backend URL:
   ```
   VITE_API_URL=https://cancer-prediction-api.onrender.com
   ```

---

## 🤖 Model Details

| Property | Value |
|---|---|
| **Algorithm** | XGBoost Classifier |
| **Preprocessing** | StandardScaler (8 features) |
| **Input Features** | Age, Gender, BMI, Smoking, GeneticRisk, PhysicalActivity, AlcoholIntake, CancerHistory |
| **Output** | Cancer risk probability (0–1) converted to percentage |
| **Training Accuracy** | ~94% |
| **Model File** | `cancer_model.pkl` |
| **Scaler File** | `scaler.pkl` |

The model was trained on a medical dataset and uses an XGBoost binary classification objective. The `StandardScaler` normalizes all 8 input features before passing them to the model for prediction.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a **Pull Request**

Please make sure to update tests and documentation as appropriate.

---

## ⚠️ Disclaimer

> **This tool is for educational and informational purposes only.**
>
> The cancer risk predictions provided by this application are based on statistical machine learning models trained on historical data. They should **NOT** be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional or oncology specialist for medical concerns.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

Made with ❤️ by [SyedaSundas87](https://github.com/SyedaSundas87)

⭐ Star this repo if you found it helpful!

</div>
