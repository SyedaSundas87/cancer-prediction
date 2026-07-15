import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PatientData, Gender, GeneticRisk } from '../types';
import { 
  User, Weight, Cigarette, Dna, Dumbbell, Wine, Stethoscope, 
  Activity
} from 'lucide-react';

interface PredictionCardProps {
  onPredict: (data: PatientData) => void;
  isLoading: boolean;
}

export function PredictionCard({ onPredict, isLoading }: PredictionCardProps) {
  const [data, setData] = useState<PatientData>({
    age: 40,
    gender: 'Male',
    bmi: 24,
    smoking: false,
    geneticRisk: 'Low',
    physicalActivity: 5,
    alcoholIntake: 1,
    cancerHistory: false,
  });

  const handleChange = (field: keyof PatientData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -2, transition: { duration: 0.3 } }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl w-full max-w-4xl mx-auto flex flex-col gap-8"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          
          {/* Age Slider */}
          <div className="space-y-3 group">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                <User className="w-4 h-4 text-[#00BCD4] group-hover:scale-110 transition-transform" />
                Patient Age
              </label>
              <span className="text-sm font-mono text-[#00BCD4]">{data.age} yrs</span>
            </div>
            <input 
              type="range" min="20" max="80" 
              value={data.age}
              onChange={(e) => handleChange('age', parseInt(e.target.value))}
              className="w-full accent-[#00BCD4] h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Gender Select */}
          <div className="space-y-3 group">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
              <User className="w-4 h-4 text-[#00BCD4] group-hover:scale-110 transition-transform" />
              Gender
            </label>
            <div className="flex gap-2 p-1 bg-black/20 rounded-xl border border-white/10">
              {(['Male', 'Female', 'Other'] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleChange('gender', g)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    data.gender === g 
                      ? 'bg-white/10 border border-white/20 text-white' 
                      : 'text-white/40 hover:text-white border border-transparent'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* BMI Slider */}
          <div className="space-y-3 group">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                <Weight className="w-4 h-4 text-[#00BCD4] group-hover:scale-110 transition-transform" />
                Body Mass Index (BMI)
              </label>
              <span className="text-sm font-mono text-[#00BCD4]">{data.bmi}</span>
            </div>
            <input 
              type="range" min="15" max="40" step="0.1"
              value={data.bmi}
              onChange={(e) => handleChange('bmi', parseFloat(e.target.value))}
              className="w-full accent-[#00BCD4] h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/50 px-1 font-mono uppercase tracking-tighter">
              <span>Under</span>
              <span>Normal</span>
              <span>Over</span>
              <span>Obese</span>
            </div>
          </div>

          {/* Genetic Risk */}
          <div className="space-y-3 group">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
              <Dna className="w-4 h-4 text-[#00BCD4] group-hover:scale-110 transition-transform" />
              Genetic Risk Profile
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-black/20 rounded-xl border border-white/10">
              {(['Low', 'Medium', 'High'] as GeneticRisk[]).map((level) => {
                const isActive = data.geneticRisk === level;
                let activeClass = 'bg-white/10 border border-white/20 text-white';
                if (isActive) {
                  if (level === 'Low') activeClass = 'bg-[#4CAF50]/10 border border-[#4CAF50]/50 text-[#4CAF50]';
                  else if (level === 'Medium') activeClass = 'bg-[#FFC107]/10 border border-[#FFC107]/50 text-[#FFC107]';
                  else if (level === 'High') activeClass = 'bg-[#F44336]/10 border border-[#F44336]/50 text-[#F44336]';
                }
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleChange('geneticRisk', level)}
                    className={`py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${
                      isActive ? activeClass : 'bg-transparent text-white/40 hover:text-white border border-transparent'
                    }`}
                  >
                    {level.substring(0, 3)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Physical Activity */}
          <div className="space-y-3 group">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                <Dumbbell className="w-4 h-4 text-[#00BCD4] group-hover:scale-110 transition-transform" />
                Physical Activity
              </label>
              <span className="text-sm font-mono text-[#00BCD4]">{data.physicalActivity} / 7 Days</span>
            </div>
            <input 
              type="range" min="0" max="7" 
              value={data.physicalActivity}
              onChange={(e) => handleChange('physicalActivity', parseInt(e.target.value))}
              className="w-full accent-[#00BCD4] h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Alcohol Intake */}
          <div className="space-y-3 group">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                <Wine className="w-4 h-4 text-[#00BCD4] group-hover:scale-110 transition-transform" />
                Alcohol Intake
              </label>
              <span className="text-sm font-mono text-[#00BCD4]">{data.alcoholIntake} / Week</span>
            </div>
            <input 
              type="range" min="0" max="21" 
              value={data.alcoholIntake}
              onChange={(e) => handleChange('alcoholIntake', parseInt(e.target.value))}
              className="w-full accent-[#00BCD4] h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Smoking Toggle */}
          <div className="space-y-3 group">
            <label className="text-xs font-semibold uppercase tracking-wider text-white/70">Lifestyle Factors</label>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleChange('smoking', !data.smoking)}
                className="flex items-center justify-between py-3 px-4 bg-black/20 rounded-xl border border-white/10 hover:bg-black/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Cigarette className={`w-4 h-4 ${data.smoking ? 'text-[#FFC107]' : 'text-white/50'}`} />
                  <span className="text-xs font-bold text-white/80 uppercase">Smoker</span>
                </div>
                <div className="w-10 h-5 bg-white/10 rounded-full relative border border-white/20 flex items-center p-0.5 transition-colors">
                  <div className={`absolute w-3 h-3 rounded-full transition-all ${data.smoking ? 'bg-[#FFC107] right-1' : 'bg-white/50 left-1'}`}></div>
                </div>
              </button>
            </div>
          </div>

          {/* Cancer History Toggle */}
          <div className="space-y-3 group">
            <label className="text-xs font-semibold uppercase tracking-wider text-white/70">Medical History</label>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleChange('cancerHistory', !data.cancerHistory)}
                className="flex items-center justify-between py-3 px-4 bg-black/20 rounded-xl border border-white/10 hover:bg-black/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Stethoscope className={`w-4 h-4 ${data.cancerHistory ? 'text-[#F44336]' : 'text-white/50'}`} />
                  <span className="text-xs font-bold text-white/80 uppercase">Prior Diagnosis</span>
                </div>
                <div className="w-10 h-5 bg-white/10 rounded-full relative border border-white/20 flex items-center p-0.5 transition-colors">
                  <div className={`absolute w-3 h-3 rounded-full transition-all ${data.cancerHistory ? 'bg-[#F44336] right-1' : 'bg-white/50 left-1'}`}></div>
                </div>
              </button>
            </div>
          </div>
          
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 md:mt-auto w-full h-16 bg-gradient-to-r from-[#00BCD4] to-[#1E88E5] rounded-2xl flex items-center justify-center gap-3 font-bold text-lg shadow-xl shadow-[#00BCD4]/30 hover:scale-[1.02] active:scale-[0.98] transition-all group disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>ANALYZING DATA...</span>
            </>
          ) : (
            <>
              <Activity className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>ANALYZE RISK PROFILE</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
