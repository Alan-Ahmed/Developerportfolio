import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Mail, Github, Linkedin, ArrowRight, Download } from 'lucide-react';

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const contactLinks = [
    {
      name: 'Email',
      icon: Mail,
      value: 'alanxahmed8@gmail.com',
      href: 'mailto:alanxahmed8@gmail.com',
      color: '#14b8a6',
    },
    {
      name: 'GitHub',
      icon: Github,
      value: 'github.com/Alan-Ahmed',
      href: 'https://github.com/Alan-Ahmed',
      color: '#14b8a6',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      value: 'linkedin.com/in/alan-ahmed1',
      href: 'https://linkedin.com/in/alan-ahmed1',
      color: '#14b8a6',
    },
  ];

  return (
    <section id="contact" ref={ref} className="relative min-h-screen py-20 px-6 bg-gradient-to-b from-black via-[#0a0a0a] to-black overflow-hidden flex items-center justify-center snap-start">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,184,166,0.04)_0%,_transparent_70%)]" />

      <div className="relative max-w-4xl mx-auto w-full">
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
            className="h-1 bg-gradient-to-r from-teal-500 to-transparent mx-auto mb-6"
          />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
            Låt oss <span className="text-teal-400">bygga</span> något
          </h2>
          <p className="text-lg text-gray-300 mb-2">
            Söker LIA 2 eller en långsiktig roll
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            Jag är öppen för möjligheter där jag kan bidra med mina kunskaper 
            och samtidigt fortsätta växa som utvecklare. Hör gärna av dig!
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {contactLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -3 }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Card */}
                <div className="relative p-4 bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] rounded-xl border border-teal-500/20 group-hover:border-teal-400/40 transition-all duration-700 h-[90px]">
                  <div className="flex items-center gap-3 h-full">
                    <div className="p-2 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/15 transition-colors duration-500">
                      <Icon className="w-5 h-5 text-teal-400" strokeWidth={2} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-xs text-gray-400 mb-1">{link.name}</p>
                      <p className="text-sm text-gray-200 font-medium group-hover:text-teal-400 transition-colors duration-500">
                        {link.value}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-shrink-0" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent mb-4" />
          <p className="text-gray-500 text-sm">
            © 2026 Alan Ahmed. Byggd med passion för clean code.
          </p>
        </motion.div>
      </div>
    </section>
  );
}