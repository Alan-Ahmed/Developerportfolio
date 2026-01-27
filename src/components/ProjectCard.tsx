import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'; // Ändrade till framer-motion då det är standard
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl: string;
  image: string;
  hoverImage?: string;
  accentColor: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 35 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 35 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className="relative h-full group cursor-pointer"
    >
      {/* Glow effect bakom kortet */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="absolute -inset-1 bg-gradient-to-r from-teal-500/30 via-cyan-500/30 to-teal-500/30 rounded-2xl blur-2xl"
        style={{ transform: 'translateZ(-10px)' }}
      />

      {/* Card container */}
      <div className="relative h-full bg-[#0a0a0a] rounded-2xl border border-teal-500/20 group-hover:border-teal-400/50 transition-all duration-700 overflow-hidden shadow-2xl">
        
        {/* Image preview */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.7 }}
            className="w-full h-full"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Bild+saknas';
              }}
            />
            {/* Gradient overlay på bilden */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Content - translateZ ger en "pop-out" effekt vid tilt */}
        <div className="p-5 space-y-4" style={{ transform: 'translateZ(40px)' }}>
          <h3 className="text-xl font-bold text-gray-100 group-hover:text-teal-400 transition-colors duration-500">
            {project.name}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={`${project.id}-${tech}`}
                className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-teal-500/5 text-teal-400 rounded-md border border-teal-500/20"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg border border-white/10 transition-all"
              >
                <Github className="w-4 h-4" />
                <span className="text-xs font-bold">Code</span>
              </motion.a>
            )}

            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-black rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(20,184,166,0.2)]"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-xs">Live Demo</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Scanline animation (den ljusa linjen som åker över vid hover) */}
        <motion.div
          animate={{
            y: isHovered ? ['-100%', '200%'] : '-100%',
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
          }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/10 to-transparent h-40 pointer-events-none"
        />
      </div>
    </motion.div>
  );
}
