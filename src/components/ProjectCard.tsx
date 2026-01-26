import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

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
        transformStyle: 'preserve-3d',
      }}
      className="relative h-full group cursor-pointer"
    >
      {/* Glow effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-teal-500/20 rounded-2xl blur-xl"
        style={{ transform: 'translateZ(-50px)' }}
      />

      {/* Card container */}
      <div className="relative h-full bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] rounded-2xl border border-teal-500/20 group-hover:border-teal-400/40 transition-all duration-700 overflow-hidden">
        {/* Image preview */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.7 }}
            className="w-full h-full"
          >
            {/* FIX: Använder vanlig img-tagg för att läsa direkt från public-mappen */}
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Enkel fallback om bilden mot förmodan inte hittas
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Bild+saknas';
              }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </motion.div>

          <motion.div
            animate={{
              opacity: isHovered ? 0.5 : 0,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3" style={{ transform: 'translateZ(50px)' }}>
          <h3 className="text-lg font-bold text-gray-100 group-hover:text-teal-400 transition-colors duration-500">
            {project.name}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs bg-teal-500/10 text-teal-400 rounded border border-teal-500/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 hover:bg-teal-500/15 text-teal-400 rounded-lg border border-teal-500/30 hover:border-teal-400/50 transition-all duration-500"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">GitHub</span>
              </motion.a>
            )}

            {project.liveUrl && project.liveUrl !== project.githubUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-all duration-500 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Öppna</span>
              </motion.a>
            )}
          </div>
        </div>

        <motion.div
          animate={{
            y: isHovered ? ['-100%', '100%'] : '-100%',
          }}
          transition={{
            duration: 2.5,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
          }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/5 to-transparent h-32 pointer-events-none"
        />
      </div>
    </motion.div>
  );
}
