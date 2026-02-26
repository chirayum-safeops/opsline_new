import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const PARTICLE_COUNT = Math.min(70, Math.floor(window.innerWidth / 20));
    const CONNECTION_DIST = 180;
    const MOUSE_RADIUS = 200;

    particlesRef.current = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.8,
        hue: 206 + Math.random() * 20,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.015,
      });
    }

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    const animate = () => {
      timeRef.current += 0.016;
      const time = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (const p of particles) {
        p.x += p.vx + Math.sin(time * 0.2 + p.y * 0.002) * 0.12;
        p.y += p.vy + Math.cos(time * 0.15 + p.x * 0.002) * 0.1;
        p.pulse += p.pulseSpeed;

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_RADIUS && mDist > 0) {
          const force = (1 - mDist / MOUSE_RADIUS) * 1.5;
          p.x += (mdx / mDist) * force;
          p.y += (mdy / mDist) * force;
        }

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx.strokeStyle = `hsla(214, 80%, 60%, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Particles
      for (const p of particles) {
        const pulseSize = Math.max(0.3, p.size + Math.sin(p.pulse) * 0.4);
        const alpha = 0.25 + Math.sin(p.pulse) * 0.1;

        // Subtle glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseSize * 4);
        glow.addColorStop(0, `hsla(${p.hue}, 80%, 55%, ${alpha * 0.25})`);
        glow.addColorStop(1, `hsla(${p.hue}, 80%, 55%, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseSize * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `hsla(${p.hue}, 80%, 55%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle ambient glow
      for (let i = 0; i < 2; i++) {
        const orbX = w * (0.25 + 0.5 * i) + Math.sin(time * 0.08 + i * 3) * 200;
        const orbY = h * (0.35 + 0.15 * i) + Math.cos(time * 0.06 + i) * 120;
        const gradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, 400);
        gradient.addColorStop(0, `hsla(214, 100%, 55%, 0.025)`);
        gradient.addColorStop(1, "hsla(214, 100%, 50%, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(orbX - 400, orbY - 400, 800, 800);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
};

export default ParticleBackground;
