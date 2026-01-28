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
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Detekterar sektionen i mitten av skärmen
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 z-[100] w-auto"
    >
      <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl border border-teal-500/20 shadow-2xl p-1.5 md:p-2">
        <div className="flex flex-row md:flex-col gap-1 md:gap-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  relative flex items-center gap-3 px-4 py-3 md:py-2.5 rounded-xl transition-all duration-300
                  ${isActive ? 'bg-teal-500 text-black' : 'text-gray-400 hover:bg-white/5'}
                `}
              >
                <div className="shrink-0">
                  {isActive ? <Check className="w-4 h-4" strokeWidth={3} /> : <Icon className="w-4 h-4" />}
                </div>
                
                {/* Text döljs på mobilen (hidden) men visas på datorn (md:block) */}
                <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block whitespace-nowrap">
                  {section.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute right-0 w-1 h-5 bg-white rounded-l-full hidden md:block"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
