/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PredictionCard } from './components/PredictionCard';
import { ResultsView } from './components/ResultsView';
import { PatientData, PredictionResult } from './types';
import { analyzeRisk } from './utils';

export default function App() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (data: PatientData) => {
    setIsPredicting(true);
    setResult(null);
    setError(null);
    try {
      const res = await analyzeRisk(data);
      setResult(res);
    } catch (error) {
      console.error("Prediction failed:", error);
      setError("Could not connect to the prediction service. Please ensure the backend is running.");
    } finally {
      setIsPredicting(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0A2463] to-[#1E88E5] text-white font-sans flex flex-col overflow-x-hidden relative selection:bg-[#00BCD4] selection:text-white">
      {/* Background blurs */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00BCD4]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#1E88E5]/20 rounded-full blur-[80px] pointer-events-none z-0"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 w-full flex flex-col items-center justify-center p-4 md:p-10 z-10">
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/40 rounded-2xl text-red-200 text-sm max-w-4xl w-full">
              ⚠️ {error}
            </div>
          )}
          {!result ? (
            <PredictionCard onPredict={handlePredict} isLoading={isPredicting} />
          ) : (
            <ResultsView result={result} onReset={handleReset} />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
