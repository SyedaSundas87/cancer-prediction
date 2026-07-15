import { HeartPulse, ShieldAlert, Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="h-20 px-4 md:px-10 flex items-center justify-between border-b border-white/10 z-10 bg-transparent">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#00BCD4] rounded-lg flex items-center justify-center shadow-lg shadow-[#00BCD4]/20">
          <HeartPulse className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Cancer Risk Predictor</h1>
          <p className="text-xs text-white/60 font-medium uppercase tracking-widest hidden sm:block">AI-Powered Early Detection System</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-white/50 uppercase tracking-tighter">Empowering decisions</p>
          <p className="text-sm font-semibold">Proactive Healthcare</p>
        </div>
        <div className="w-px h-8 bg-white/20 hidden md:block"></div>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-[10px] font-mono uppercase">System Online</span>
        </div>
      </div>
    </header>
  );
}
