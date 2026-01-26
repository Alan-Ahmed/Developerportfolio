import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
    // Use Intersection Observer for accurate section detection
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    let currentSection = 'hero';

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          currentSection = entry.target.id;
          setActiveSection(currentSection);
          console.log('Active section:', currentSection); // Debug
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sectionIds = ['hero', 'about', 'tech', 'projects', 'contact'];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
      className="fixed top-1/2 -translate-y-1/2 left-6 z-50"
    >
      {/* Navigation container - compact and always showing labels */}
      <div className="relative">
        {/* Subtle glow */}
        <div className="absolute inset-0 bg-teal-500/10 rounded-xl blur-lg" />
        
        {/* Nav card */}
        <div className="relative bg-black/95 backdrop-blur-md rounded-xl border border-teal-500/20 overflow-hidden shadow-2xl">
          <div className="p-2 space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  whileHover={{ x: 4, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`
                    group relative w-full flex items-center gap-2 px-3 py-2 rounded-lg
                    transition-all duration-500
                    ${isActive 
                      ? 'bg-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.4)]' 
                      : 'text-gray-400 hover:text-teal-400 hover:bg-teal-500/10'
                    }
                  `}
                >
                  {/* Icon */}
                  <motion.div 
                    className="shrink-0"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    {isActive ? (
                      <Check className="w-4 h-4" strokeWidth={3} />
                    ) : (
                      <Icon className="w-4 h-4" strokeWidth={2} />
                    )}
                  </motion.div>

                  {/* Label - always visible */}
                  <span className={`text-xs font-semibold whitespace-nowrap ${isActive ? 'font-bold' : ''}`}>
                    {section.label}
                  </span>

                  {/* Active indicator - stripe on right */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 w-1 h-6 bg-white rounded-l-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover glow effect - only for inactive items */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-teal-500/0 blur-sm -z-10"
                      whileHover={{ 
                        backgroundColor: 'rgba(20, 184, 166, 0.15)',
                        scale: 1.05
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Progress bar at bottom */}
          <div className="h-1 bg-[#0a0a0a]/80">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
              style={{
                width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}