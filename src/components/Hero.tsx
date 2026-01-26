import { motion } from 'motion/react';
import { AdvancedBackground } from './AdvancedBackground';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden snap-start">
      <AdvancedBackground />
      
      {/* Dark overlay to dim the background more */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Subtle gradient overlay instead of grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Hero Box Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 via-transparent to-cyan-500/10 rounded-3xl blur-2xl" />
            
            {/* Main box */}
            <div className="relative bg-black/95 backdrop-blur-xl border border-teal-500/20 rounded-2xl p-12 md:p-16 shadow-[0_0_60px_rgba(20,184,166,0.1)]">
              {/* Corner decorations - more subtle */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-teal-500/40 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-teal-500/40 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-teal-500/40 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-teal-500/40 rounded-br-xl" />
              
              {/* Scan line effect - more subtle */}
              <motion.div
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/5 to-transparent h-32 pointer-events-none rounded-2xl"
              />
              
              <div className="relative">
                {/* Glitch effect on name */}
                <motion.h1 
                  className="text-6xl md:text-8xl font-bold mb-4 relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-teal-400 via-teal-500 to-cyan-400 bg-clip-text text-transparent">
                    Alan Ahmed
                  </span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <h2 className="text-2xl md:text-4xl text-gray-200 mb-6">
                    Fullstack Developer <span className="text-teal-400 font-bold">(.NET)</span>
                  </h2>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent my-8" />
                  
                  <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Jag bygger robusta system med clean architecture och skalbar backend. 
                    Driven av att leverera lösningar som håller över tid.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <button
                    onClick={scrollToProjects}
                    className="group relative px-8 py-4 bg-teal-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:scale-105"
                  >
                    <span className="relative z-10">Visa projekt</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>
                  
                  <button
                    onClick={scrollToContact}
                    className="group relative px-8 py-4 border-2 border-teal-500/50 text-teal-400 font-semibold rounded-lg overflow-hidden transition-all duration-500 hover:bg-teal-500/10 hover:border-teal-400 hover:scale-105"
                  >
                    <span className="relative z-10">Kontakta mig</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8 text-teal-400/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}