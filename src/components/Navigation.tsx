import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code2, Briefcase, Mail, Check } from 'lucide-react';

const sections = [
  { id: 'hero', label: 'Hem', icon: Home },
  { id: 'about', label: 'Om mig', icon: User },
  { id: 'tech', label: 'Tech Stack', icon: Code2 },
  { id: 'projects', label: 'Projekt', icon: Briefcase },
  { id: 'contact', label: 'Kontakt', icon: Mail },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Justerad marginal för bättre detektering
      threshold: 0.5
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
      // Offset för att inte landa precis under navbaren på mobilen
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      /* MOBIL: Ligger i botten, full bredd. 
         DATOR: Ligger till vänster, centrerad vertikalt. 
      */
      className="fixed bottom-4 left-0 right-0 px-4 md:left-6 md:right-auto md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-[100]"
    >
      <div className="relative max-w-md mx-auto md:max-w-none">
        {/* Glow bakom menyn */}
        <div className="absolute inset-0 bg-teal-500/10 rounded-2xl blur-xl" />
        
        <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="flex flex-row md:flex-col p-2 gap-1 md:gap-2 justify-around md:justify-start">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    relative flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl
                    transition-all duration-300 group flex-1 md:flex-none
                    ${isActive ? 'text-teal-400' : 'text-gray-500 hover:text-gray-300'}
                  `}
                >
                  {/* Aktiv bakgrunds-pill */}
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-teal-500/10 rounded-xl border border-teal-500/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <div className="relative z-10">
                    {isActive ? (
                      <Check className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
                    ) : (
                      <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                    )}
                  </div>

                  <span className="relative z-10 text-[10px] md:text-xs font-bold uppercase tracking-widest hidden sm:block">
                    {section.label}
                  </span>

                  {/* Desktop-enbart: Indikator på höger sida */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute right-0 w-1 h-6 bg-teal-500 rounded-l-full hidden md:block"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Progress bar som visar hur långt man scrollat */}
          <div className="h-[2px] bg-white/5 w-full">
            <motion.div
              className="h-full bg-teal-500"
              animate={{
                width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
