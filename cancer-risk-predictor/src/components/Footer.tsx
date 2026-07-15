import { ShieldCheck, Info } from 'lucide-react';

export function Footer() {
  return (
    <footer className="h-12 px-4 md:px-10 flex items-center justify-between border-t border-white/10 bg-black/20 z-10 w-full mt-auto">
      <div className="flex items-center gap-4 text-[10px] font-medium text-white/40">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-[#4CAF50]" />
          <span className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-white/70">v1.0</span>
          <span>Accuracy: 94%</span>
        </div>
        <div className="w-px h-3 bg-white/20 hidden sm:block"></div>
        <div className="hidden sm:flex items-center gap-1.5">
          <Info className="w-3 h-3" />
          <span>For informational purposes only. Consult healthcare professional.</span>
        </div>
      </div>
      
      <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest text-white/50">
        <span className="hover:text-white transition-colors cursor-pointer">Privacy Notice</span>
      </div>
    </footer>
  );
}
