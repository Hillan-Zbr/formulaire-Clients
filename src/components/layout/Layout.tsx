import React from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 relative overflow-hidden selection:bg-brand-100 selection:text-brand-900">
      {/* Background Decoratif */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-200/30 blur-[100px]" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-200/30 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-blue-100/40 blur-[100px]" />
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        {children}
      </main>

      {/* Indicateur de version */}
      <footer className="fixed bottom-2 right-4 z-50">
        <p className="text-xs text-slate-400/80 font-mono">
          v1.2.0 (Design Update)
        </p>
      </footer>
    </div>
  );
};
