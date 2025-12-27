import React from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // TEST: Fond sombre dégradé pour vérifier l'application du style
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 font-sans text-white relative overflow-hidden">
      
      {/* Background Decoratif (plus lumineux pour contraster) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500 blur-[100px]" />
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        {children}
      </main>

      {/* Indicateur de version */}
      <footer className="fixed bottom-2 right-4 z-50">
        <p className="text-xs text-slate-400 font-mono">
          v1.2.2 (Dark Mode Test)
        </p>
      </footer>
    </div>
  );
};
