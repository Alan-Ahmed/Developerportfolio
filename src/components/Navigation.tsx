import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Code2, Briefcase, Mail, Check } from 'lucide-react';

const sections = [
  { id: 'hero', label: 'Hem', icon: Home },
  { id: 'about', label: 'Om mig', icon: User },
  { id: 'tech', label: 'Tech Stack', icon: Code2 },
  { id: 'projects', label: 'Projekt', icon: Briefcase },
  { id: 'contact', label: 'Kontakt', icon: Mail },
];

export function Navigation() {
  const [activeSection, setActiveSection] = sectionIds(); // Hjälpfunktion för att hitta ID

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      /* MOBIL: Ligger horisontellt i botten.
         DATOR: Din gamla vertikala meny till vänster.
      */
      className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 z-[100] w-[90%] md:w-auto"
    >
      <div className="relative">
        {/* Glow-effekten */}
        <div className="absolute inset-0 bg-teal-500/10 rounded-2xl blur-lg" />
        
        {/* Nav card */}
        <div className="relative bg-black/90 backdrop-blur-md rounded-2xl border border-teal-500/20 shadow-2xl overflow-hidden">
          <div className="flex flex-row md:flex-col p-2 gap-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative flex items-center justify-center md:justify-start gap-3 px-3 py-3 md:px-4 md:py-2.5 rounded-xl
                    transition-all duration-300 flex-1 md:flex-none
                    ${isActive ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-gray-400 hover:text-teal-400 hover:bg-teal-500/5'}
                  `}
                >
                  {/* Ikon - syns alltid */}
                  <div className="shrink-0">
                    {isActive ? <Check className="w-4 h-4" strokeWidth={3} /> : <Icon className="w-4 h-4" />}
                  </div>

                  {/* Text - döljs på mobil, visas på desktop (md:block) */}
                  <span className="text-xs font-bold uppercase tracking-widest hidden md:block whitespace-nowrap">
                    {section.label}
                  </span>

                  {/* Din gamla indikator (bara på desktop) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute right-0 w-1 h-6 bg-white rounded-l-full hidden md:block"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// Enkel hjälpfunktion för useState i detta exempel
function sectionIds() {
  const [active, setActive] = useState('hero');
  return [active, setActive] as const;
}
