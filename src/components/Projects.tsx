import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { ProjectCard } from './ProjectCard';

// Vi hämtar bas-URL:en från Vite för att säkerställa rätt sökvägar på GitHub Pages
const base = import.meta.env.BASE_URL;

const projects = [
  {
    id: 1,
    name: 'BurnerID – Privacy-First Identity Service',
    description: 'En säkerhetsfokuserad tjänst för generering av temporära identiteter. Minimerar digital exponering genom automatiserad hantering av engångsprofiler och anonyma credentials. Implementerar robust kryptering för att skydda användardata i osäkra miljöer.',
    technologies: ['Node.js', '.NET 8', 'Redis', 'AES-256', 'OAuth2', 'Docker'],
    liveUrl: 'https://luxury-bublanina-733452.netlify.app/',
    image: `${base}5c2b99e35359b7a1619e2940f688236cb3545f2d.png`,
    accentColor: '#14b8a6',
  },
  {
    id: 2,
    name: 'Cafe45 – Full-stack POS & Inventory System',
    description: 'Ett integrerat affärssystem för caféverksamhet med realtidshantering av beställningar och lagerstatus. Plattformen automatiserar flödet från kundorder till köksvy och erbjuder en centraliserad databas för smidig hantering av sortiment och försäljning.',
    technologies: ['React', '.NET 8', 'Supabase', 'PostgreSQL', 'Netlify', 'Tailwind CSS'],
    liveUrl: 'https://cafe45.se/',
    image: `${base}8ebb24853f92853a4130adbef0407ff85dd7132f.png`,
    accentColor: '#14b8a6',
  },
  {
    id: 3,
    name: 'CipherStore – Clean Architecture E-Commerce',
    description: 'En robust e-handelsplattform specialiserad på säkerhetshårdvara. Utvecklad med en strikt Clean Architecture-struktur i .NET 8 för maximal testbarhet och skalbarhet. Systemet implementerar säkra transaktioner via Stripe och inkluderar en komplett kundresa från varukorg till orderbekräftelse.',
    technologies: ['React', '.NET 8', 'Stripe API', 'EF Core', 'SQL Server', 'xUnit'],
    githubUrl: 'https://github.com/Alan-Ahmed/CipherStore.git',
    liveUrl: 'https://github.com/Alan-Ahmed/CipherStore.git',
    image: `${base}bdf6735bba1dcef0595c86f23b52c98592c68f2f.png`,
    accentColor: '#14b8a6',
  },
];

export function Projects() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="projects" ref={ref} className="relative min-h-screen h-screen py-20 px-6 bg-black flex items-center justify-center snap-start overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,184,166,0.03)_0%,_transparent_70%)]" />
      
      <div className="relative max-w-7xl mx-auto w-full overflow-y-auto h-full py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '60px' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-teal-500 to-transparent mx-auto mb-4"
          />
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-100">
            Mina <span className="text-teal-400">Projekt</span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Utvalda projekt som visar min tekniska kompetens och problemlösningsförmåga
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 max-w-6xl mx-auto pb-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
