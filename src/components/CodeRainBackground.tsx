import { useEffect, useRef } from 'react';

export function CodeRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Characters to display
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|~`';
    const codeSnippets = [
      'async', 'await', 'class', 'interface', 'public', 'private', 'void', 
      'string', 'int', 'var', 'const', 'return', 'if', 'else', 'for', 'while',
      'try', 'catch', 'new', 'this', 'static', 'namespace', 'using', 'Task',
      '0x', '0b', '||', '&&', '==', '!=', '++', '--', '=>', '??', 'null'
    ];

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Drop class
    class Drop {
      x: number;
      y: number;
      speed: number;
      chars: string[];
      isRed: boolean;
      opacity: number;

      constructor(x: number) {
        this.x = x;
        this.y = Math.random() * -canvas.height;
        this.speed = Math.random() * 3 + 2; // Faster speed
        this.chars = [];
        this.isRed = Math.random() < 0.15; // 15% chance of being red
        this.opacity = Math.random() * 0.3 + 0.4; // Slightly dimmer for dark theme
        
        // Generate random characters for this drop
        const length = Math.floor(Math.random() * 20) + 15; // Longer drops
        for (let i = 0; i < length; i++) {
          if (Math.random() < 0.4) {
            this.chars.push(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
          } else {
            this.chars.push(chars[Math.floor(Math.random() * chars.length)]);
          }
        }
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height + this.chars.length * fontSize) {
          this.y = Math.random() * -200;
          this.isRed = Math.random() < 0.15;
          this.opacity = Math.random() * 0.5 + 0.5;
        }
      }

      draw() {
        if (!ctx) return;
        
        this.chars.forEach((char, i) => {
          const charY = this.y + i * fontSize;
          if (charY > 0 && charY < canvas.height) {
            // Calculate opacity based on position in drop
            const normalizedPos = i / this.chars.length;
            let alpha = this.opacity;
            
            // Fade effect at the tail
            if (normalizedPos > 0.7) {
              alpha *= (1 - (normalizedPos - 0.7) / 0.3);
            }
            
            // Brightest at the head
            if (i === this.chars.length - 1) {
              alpha = 1;
              ctx.shadowBlur = 10;
              ctx.shadowColor = this.isRed ? '#ff0040' : '#00ff41';
            } else {
              ctx.shadowBlur = 0;
            }

            // Set color
            if (this.isRed) {
              ctx.fillStyle = `rgba(255, 0, 64, ${alpha})`;
            } else {
              ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
            }

            // Draw character
            ctx.font = `${fontSize}px "Courier New", monospace`;
            ctx.fillText(char, this.x * fontSize, charY);
          }
        });
      }
    }

    // Create drops
    const drops: Drop[] = [];
    for (let i = 0; i < columns; i++) {
      if (Math.random() < 0.75) { // 75% density - much more code
        drops.push(new Drop(i));
      }
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      // Darker fade effect for dark theme
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach(drop => {
        drop.update();
        drop.draw();
      });

      // Randomly add new drops
      if (Math.random() < 0.02 && drops.length < columns * 0.85) {
        const randomCol = Math.floor(Math.random() * columns);
        if (!drops.find(d => d.x === randomCol)) {
          drops.push(new Drop(randomCol));
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#000000' }}
    />
  );
}