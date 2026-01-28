import { motion } from 'framer-motion';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    /* ÄNDRING: min-h-screen istället för h-[100dvh] och py-12 för att 
       minska det tomma utrymmet i botten */
    <section id="hero" className="relative min-h-[85dvh] flex items-center justify-center overflow-hidden bg-black py-12">
      {/* 1. Bakgrund */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,184,166,0.1)_0%,_transparent_50%)] z-0" />
      
      {/* 2. Innehållskontainer */}
      <div className="relative z-10 text-center px-6 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-teal-500/5 blur-[100px] rounded-full" />
          
          <div className="relative bg-black/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-16 shadow-2xl">
            {/* Hörndekorationer */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-teal-500/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-teal-500/30 rounded-br-3xl" />
            
            <div className="space-y-6 md:space-y-8">
              <div>
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-teal-400 via-teal-200 to-cyan-400 bg-clip-text text-transparent">
                    Alan Ahmed
                  </span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-4"
                >
                  <h2 className="text-lg md:text-3xl text-gray-400 font-light tracking-widest uppercase">
                    Fullstack Developer <span className="text-teal-500 font-bold">.NET</span>
                  </h2>
                </motion.div>
              </div>
              
              <div className="max-w-xl mx-auto">
                <div className="h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent mb-6 md:mb-8" />
                <p className="text-sm md:text-lg text-gray-400 leading-relaxed italic px-2">
                  "Jag bygger robusta system med clean architecture och skalbar backend. 
                  Driven av att leverera lösningar som håller över tid."
                </p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button
                  onClick={() => scrollToSection('projects')}
                  className="w-full sm:w-auto px-10 py-4 bg-teal-500 text-black font-bold rounded-full hover:bg-teal-400 transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:scale-105 active:scale-95"
                >
                  Visa projekt
                </button>
                
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full sm:w-auto px-10 py-4 border border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Kontakta mig
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
