import { useEffect, useRef, useState } from 'react';

export function AdvancedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    class Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      color: string;
      angle: number;
      angleSpeed: number;

      constructor() {
        this.x = (Math.random() - 0.5) * canvas.width * 2;
        this.y = (Math.random() - 0.5) * canvas.height * 2;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.vz = Math.random() * 1.5 + 0.5;
        this.size = Math.random() * 1.5 + 0.5;
        this.color = Math.random() < 0.9 ? '#14b8a6' : '#06b6d4';
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.01;
      }

      update() {
        // Move in 3D space
        this.x += this.vx;
        this.y += this.vy;
        this.z -= this.vz;
        this.angle += this.angleSpeed;

        // Reset if too close or too far
        if (this.z <= 0 || this.z > 1000) {
          this.x = (Math.random() - 0.5) * canvas.width * 2;
          this.y = (Math.random() - 0.5) * canvas.height * 2;
          this.z = 1000;
        }

        // Wrap around edges
        if (Math.abs(this.x) > canvas.width) this.x *= -0.5;
        if (Math.abs(this.y) > canvas.height) this.y *= -0.5;
      }

      draw(mouseX: number, mouseY: number) {
        if (!ctx) return;

        // 3D projection
        const scale = 500 / (500 + this.z);
        const x2d = this.x * scale + canvas.width / 2;
        const y2d = this.y * scale + canvas.height / 2;
        const size = this.size * scale;

        // Distance to mouse
        const dx = x2d - mouseX;
        const dy = y2d - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        // Interact with mouse
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          ctx.strokeStyle = this.color === '#14b8a6' ? 'rgba(20, 184, 166, 0.3)' : 'rgba(6, 182, 212, 0.3)';
          ctx.lineWidth = force * 2;
          ctx.beginPath();
          ctx.moveTo(x2d, y2d);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }

        // Draw particle
        const alpha = Math.max(0.2, 1 - this.z / 1000);
        ctx.fillStyle = this.color === '#14b8a6' 
          ? `rgba(20, 184, 166, ${alpha})` 
          : `rgba(6, 182, 212, ${alpha})`;
        
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow for closer particles
        if (this.z < 300) {
          ctx.shadowBlur = 10 * (1 - this.z / 300);
          ctx.shadowColor = this.color;
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      // Dark fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles (removed grid and neural network)
      particles.forEach(particle => {
        particle.update();
        particle.draw(mousePos.x, mousePos.y);
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const scale1 = 500 / (500 + p1.z);
          const scale2 = 500 / (500 + p2.z);

          const x1 = p1.x * scale1 + canvas.width / 2;
          const y1 = p1.y * scale1 + canvas.height / 2;
          const x2 = p2.x * scale2 + canvas.width / 2;
          const y2 = p2.y * scale2 + canvas.height / 2;

          const dx = x1 - x2;
          const dy = y1 - y2;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120 && Math.abs(p1.z - p2.z) < 200) {
            const alpha = (120 - distance) / 120 * 0.08;
            ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos.x, mousePos.y]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)' }}
    />
  );
}