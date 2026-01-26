import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Code2, Database, Shield, Boxes, GitBranch, Server, Braces, Key } from 'lucide-react';

const technologies = [
  { name: 'C#', icon: Braces, color: '#14b8a6' },
  { name: '.NET 8', icon: Code2, color: '#14b8a6' },
  { name: 'ASP.NET Core Web API', icon: Server, color: '#14b8a6' },
  { name: 'Clean Architecture', icon: Boxes, color: '#14b8a6' },
  { name: 'CQRS / MediatR', icon: Boxes, color: '#14b8a6' },
  { name: 'Entity Framework Core', icon: Database, color: '#14b8a6' },
  { name: 'SQL Server', icon: Database, color: '#14b8a6' },
  { name: 'JWT-autentisering', icon: Key, color: '#14b8a6' },
  { name: 'Git / GitHub', icon: GitBranch, color: '#14b8a6' },
];

export function TechStack() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="tech" ref={ref} className="relative min-h-screen h-screen py-32 px-6 bg-gradient-to-b from-black via-[#0a0a0a] to-black flex items-center justify-center snap-start">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '60px' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-teal-500 to-transparent mx-auto mb-6"
          />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
            Tech <span className="text-teal-400">Stack</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Kärnteknologier som driver mina projekt. Fokus på kvalitet över kvantitet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
              >
                <div className="group relative h-full">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Card */}
                  <div className="relative h-full p-6 bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] rounded-xl border border-teal-500/20 group-hover:border-teal-400/40 transition-all duration-700 group-hover:scale-105">
                    {/* Icon */}
                    <div className="mb-4 inline-block p-3 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/15 transition-colors duration-500">
                      <Icon className="w-8 h-8 text-teal-400" strokeWidth={2} />
                    </div>
                    
                    {/* Tech name */}
                    <h3 className="text-xl font-semibold text-gray-200 group-hover:text-teal-400 transition-colors duration-500">
                      {tech.name}
                    </h3>
                    
                    {/* Animated line */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '0%' }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.5 }}
                      className="h-0.5 bg-gradient-to-r from-teal-400 to-transparent mt-3"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}