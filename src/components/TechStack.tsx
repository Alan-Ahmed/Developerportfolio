import { motion } from 'framer-motion'; // Ändrat till standard framer-motion för stabilitet
import { useInView } from './hooks/useInView';
import { Code2, Database, Boxes, GitBranch, Server, Braces, Key } from 'lucide-react';

const technologies = [
  { name: 'C#', icon: Braces },
  { name: '.NET 8', icon: Code2 },
  { name: 'ASP.NET Core Web API', icon: Server },
  { name: 'Clean Architecture', icon: Boxes },
  { name: 'CQRS / MediatR', icon: Boxes },
  { name: 'Entity Framework Core', icon: Database },
  { name: 'SQL Server', icon: Database },
  { name: 'JWT-autentisering', icon: Key },
  { name: 'Git / GitHub', icon: GitBranch },
];

export function TechStack() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="tech" ref={ref} className="relative min-h-screen py-32 px-6 bg-black flex items-center justify-center snap-start overflow-hidden">
      {/* Bakgrunds-glow för djup */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,184,166,0.05)_0%,_transparent_50%)]" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '60px' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-teal-500 mx-auto mb-6"
          />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
            Tech <span className="text-teal-400">Stack</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Kärnteknologier som driver mina projekt. Fokus på robust arkitektur och modern backend.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Yttre glow vid hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                
                {/* Kortet */}
                <div className="relative p-6 bg-[#0a0a0a] border border-white/5 rounded-xl transition-all duration-500 group-hover:border-teal-500/40 group-hover:scale-[1.02]">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">
                      {tech.name}
                    </h3>
                  </div>
                  
                  {/* Underlinje som växer fram vid hover */}
                  <div className="mt-4 h-[1px] w-0 bg-gradient-to-r from-teal-500 to-transparent group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
