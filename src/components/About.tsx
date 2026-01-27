import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';

export function About() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="about" ref={ref} className="relative min-h-screen h-screen py-32 px-6 bg-black flex items-center justify-center snap-start">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/10 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
              
              {/* Image container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-teal-500/20 group-hover:border-teal-400/40 transition-colors duration-700">
                {/* FIX: Vi använder BASE_URL och pekar på .jpg-filen i public-mappen */}
                <img
                  src={`${import.meta.env.BASE_URL}e8de0b64c271dbb9e4c5b70b7ecc24031de5766e.jpg`}
                  alt="Alan Ahmed - Developer portrait"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-6">
              <div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '60px' } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="h-1 bg-gradient-to-r from-teal-500 to-transparent mb-4"
                />
                <h2 className="text-4xl md:text-5xl font-bold mb-2 text-gray-100">
                  <span className="text-teal-400">Om</span> mig
                </h2>
              </div>

              <h3 className="text-2xl font-semibold text-gray-200">
                Alan Ahmed
              </h3>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Jag är en Fullstack Developer med passion för att bygga 
                  <span className="text-teal-400 font-semibold"> robusta, skalbara system</span>. 
                  Med fokus på .NET-ekosystemet och clean architecture strävar jag efter att 
                  skapa lösningar som är lika eleganta i kod som de är kraftfulla i produktion.
                </p>

                <p>
                  Mitt driv kommer från att lösa verkliga problem med teknologi. 
                  Jag tänker i system, värdesätter kodkvalitet och ser varje projekt som en 
                  möjlighet att lära och växa.
                </p>

                <p>
                  Just nu söker jag <span className="text-teal-400 font-semibold">LIA 2</span> där 
                  jag kan bidra med mina kunskaper samtidigt som jag fortsätter utvecklas som utvecklare.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-4"
              >
                <div className="inline-block px-6 py-3 border border-teal-500/30 rounded-lg bg-teal-500/5">
                  <p className="text-teal-400 font-semibold">
                    Målmedveten • Hungrig • Framtidsinriktad
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
