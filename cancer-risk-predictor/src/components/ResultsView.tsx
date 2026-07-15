import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PredictionResult } from '../types';
import { AlertCircle, RefreshCw, Download, Share2 } from 'lucide-react';

interface ResultsViewProps {
  result: PredictionResult;
  onReset: () => void;
}

export function ResultsView({ result, onReset }: ResultsViewProps) {
  const [displayedRisk, setDisplayedRisk] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setDisplayedRisk(Math.round((result.riskPercentage / steps) * currentStep));
      if (currentStep >= steps) {
        setDisplayedRisk(result.riskPercentage);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [result.riskPercentage]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-[#F44336]';
      case 'Moderate': return 'text-[#FFC107]';
      default: return 'text-[#4CAF50]';
    }
  };
  
  const getRiskBgColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-[#F44336]/20 border-[#F44336]/30';
      case 'Moderate': return 'bg-[#FFC107]/20 border-[#FFC107]/30';
      default: return 'bg-[#4CAF50]/20 border-[#4CAF50]/30';
    }
  };

  const getRiskStatusLabel = (level: string) => {
    switch (level) {
      case 'High': return 'ELEVATED RISK';
      case 'Moderate': return 'MODERATE RISK';
      default: return 'OPTIMAL STATUS';
    }
  };

  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayedRisk / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 w-full max-w-4xl mx-auto mb-12"
    >
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00BCD4]/5 to-transparent"></div>
        
        <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
            <circle
              cx="96" cy="96" r={radius}
              className="stroke-white/10 fill-none"
              strokeWidth="8"
            />
            <circle
              cx="96" cy="96" r={radius}
              className={`fill-none transition-all duration-300 ease-out ${getRiskColor(result.riskLevel).replace('text-', 'stroke-')}`}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-5xl font-black font-mono leading-none tracking-tighter">
              {displayedRisk}%
            </span>
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mt-1">
              Risk Level
            </span>
          </div>
        </div>
        
        <div className="z-10 w-full max-w-lg mx-auto">
          <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold border mb-6 ${getRiskBgColor(result.riskLevel)} ${getRiskColor(result.riskLevel)}`}>
            {getRiskStatusLabel(result.riskLevel)}
          </div>
          
          <div className="space-y-4 text-left bg-white/5 p-5 rounded-2xl border border-white/5 mb-6">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest border-b border-white/10 pb-2">Primary Drivers</p>
            {result.keyFactors.map((factor, idx) => (
              <div key={idx} className="flex justify-between items-center gap-4">
                <span className="text-xs text-white/80">{factor}</span>
                <span className={`text-xs font-mono whitespace-nowrap ${getRiskColor(result.riskLevel)}`}>Impact</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 text-xs font-bold text-[#00BCD4] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-3 rounded-xl flex-1 border border-white/5"
            >
              <RefreshCw className="w-4 h-4" />
              RECALCULATE
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors border border-white/5 text-white/80"
            >
              <Download className="w-4 h-4" />
              EXPORT
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white/80 rounded-xl text-xs font-bold transition-colors border border-white/5"
            >
              <Share2 className="w-4 h-4" />
              SHARE
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-4 shadow-lg">
        <div className="text-[#FFC107] mt-0.5 shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <p className="text-[10px] leading-relaxed text-white/60">
          This assessment is based on statistical data models and should not be used as a medical diagnosis. Please consult with a qualified oncology specialist for a comprehensive clinical screening.
        </p>
      </div>
    </motion.div>
  );
}
