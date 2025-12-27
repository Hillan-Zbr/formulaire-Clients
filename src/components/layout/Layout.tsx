import React from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative overflow-hidden">
      
      {/* Background Decoratif (Renforcé) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-300/40 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-cyan-200/50 blur-[120px]" />
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        {children}
      </main>

      {/* Indicateur de version */}
      <footer className="fixed bottom-2 right-4 z-50">
        <p className="text-xs text-slate-400/80 font-mono">
          v1.2.3 (Final Light Design)
        </p>
      </footer>
    </div>
  );
};
