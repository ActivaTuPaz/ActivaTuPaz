import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
  twinkleSpeed: number;
  twinkleDir: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 2 + 1;
    // Movimiento suave y errático (polvo flotando)
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2 - 0.3; 
    
    // Mitad oro (212, 175, 55), mitad blanco
    this.color = Math.random() > 0.5 ? "255, 255, 255" : "212, 175, 55"; 
    this.opacity = Math.random() * 0.6 + 0.3;
    
    // Titileo
    this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity += this.twinkleSpeed * this.twinkleDir;
    if (this.opacity >= 1) this.twinkleDir = -1;
    if (this.opacity <= 0.2) this.twinkleDir = 1;
    // Si sale de la pantalla, vuelve a entrar por el otro lado
    if (this.y < 0) this.y = height;
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    // Resplandor (Glow) sutil
    ctx.shadowBlur = 4;
    ctx.shadowColor = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

class ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  active: boolean;

  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.length = 0;
    this.speed = 0;
    this.opacity = 0;
  }

  spawn(width: number, height: number) {
    this.active = true;
    // Nace en el cuadrante superior derecho para cruzar la pantalla
    this.x = (Math.random() * width) / 2 + width / 2;
    this.y = Math.random() * -50; 
    this.length = Math.random() * 150 + 100; // cola larga
    this.speed = Math.random() * 15 + 20; // velocidad
    this.opacity = 1;
  }

  update(width: number, height: number) {
    if (!this.active) return;
    
    // Ángulo de 45 grados (abajo a la izquierda)
    this.x -= this.speed;
    this.y += this.speed;
    
    this.opacity -= 0.015;
    // Resetear si se apaga o se va de pantalla
    if (this.opacity <= 0 || this.y > height || this.x < -this.length) {
      this.active = false;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return;
    
    const endX = this.x + this.length;
    const endY = this.y - this.length;
    const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
    gradient.addColorStop(0, `rgba(255, 215, 0, ${this.opacity})`); // Dorado brillante
    gradient.addColorStop(1, "rgba(255, 215, 0, 0)"); // Cola transparente
    
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2.5;
    
    ctx.shadowBlur = 8;
    ctx.shadowColor = `rgba(255, 215, 0, ${this.opacity})`;
    
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

export function MagicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let particles: Particle[] = [];
    let shootingStar: ShootingStar;
    let animationFrameId: number;
    
    // Soporte para pantallas de alta densidad (Retina Displays)
    const pixelRatio = window.devicePixelRatio || 1;
    
    const init = () => {
      canvas.width = canvas.offsetWidth * pixelRatio;
      canvas.height = canvas.offsetHeight * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
      
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      // Menos partículas en celular por rendimiento
      const particleCount = width < 768 ? 40 : 100;
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
      
      shootingStar = new ShootingStar();
      setTimeout(() => shootingStar.spawn(width, height), 500);
    };

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((particle) => {
        particle.update(width, height);
        particle.draw(ctx);
      });
      
      // Probabilidad de spawn (aprox cada 2 segundos a 60fps)
      if (!shootingStar.active && Math.random() < 0.01) {
        shootingStar.spawn(width, height);
      }
      
      shootingStar.update(width, height);
      shootingStar.draw(ctx);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();
    
    const handleResize = () => init();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none"
    />
  );
}
