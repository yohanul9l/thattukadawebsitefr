import { useEffect, useRef } from 'react';

interface Droplet {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  trail: { x: number; y: number; r: number; alpha: number }[];
  isSliding: boolean;
  slideTimer: number;
  pauseTimer: number;
  mass: number;
}

interface StaticDroplet {
  x: number;
  y: number;
  r: number;
  aspect: number;
  alpha: number;
}

interface DistantStreak {
  x: number;
  y: number;
  len: number;
  speed: number;
  alpha: number;
}

export function RainWindowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initDroplets();
    };

    // Static micro-droplets on the glass
    let staticDrops: StaticDroplet[] = [];
    // Dynamic sliding droplets
    let slidingDrops: Droplet[] = [];
    // Distant atmospheric rain streaks behind the glass
    let distantStreaks: DistantStreak[] = [];

    const initDroplets = () => {
      // 1. Static condensation drops
      const staticCount = Math.floor((width * height) / 12000);
      staticDrops = [];
      for (let i = 0; i < staticCount; i++) {
        staticDrops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.8 + Math.random() * 2.6,
          aspect: 0.85 + Math.random() * 0.3,
          alpha: 0.35 + Math.random() * 0.45,
        });
      }

      // 2. Sliding droplets with stick-slip friction
      const slideCount = Math.max(7, Math.floor(width / 160));
      slidingDrops = [];
      for (let i = 0; i < slideCount; i++) {
        slidingDrops.push(createSlidingDrop(Math.random() * height));
      }

      // 3. Faint background rain streaks (monsoon drizzle outside)
      const streakCount = Math.floor(width / 24);
      distantStreaks = [];
      for (let i = 0; i < streakCount; i++) {
        distantStreaks.push({
          x: Math.random() * (width + 200) - 100,
          y: Math.random() * height,
          len: 12 + Math.random() * 26,
          speed: 14 + Math.random() * 12,
          alpha: 0.08 + Math.random() * 0.14,
        });
      }
    };

    const createSlidingDrop = (startY = -20): Droplet => {
      const mass = 2.5 + Math.random() * 4.5;
      return {
        x: Math.random() * width,
        y: startY,
        r: mass,
        vy: 0.4 + Math.random() * 0.8,
        vx: (Math.random() - 0.5) * 0.15,
        trail: [],
        isSliding: Math.random() > 0.4,
        slideTimer: Math.random() * 80 + 40,
        pauseTimer: Math.random() * 60 + 20,
        mass,
      };
    };

    // Draw realistic liquid droplet with refraction, meniscus, and specular highlights
    const drawRealisticDroplet = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      r: number,
      aspect = 1,
      isMoving = false,
      vy = 0
    ) => {
      if (r <= 0.4) return;
      context.save();
      context.translate(cx, cy);

      const ry = isMoving ? r * (1 + Math.min(vy * 0.25, 0.6)) : r * aspect;
      const rx = isMoving ? r * 0.88 : r;

      // 1. Dark outer meniscus shadow (liquid edge catching environmental dark)
      context.beginPath();
      context.ellipse(0, 0, rx + 0.6, ry + 0.6, 0, 0, Math.PI * 2);
      context.fillStyle = 'rgba(0, 0, 0, 0.45)';
      context.fill();

      // 2. Refractive core (lens effect - inverted ambient dark/light body)
      const coreGrad = context.createRadialGradient(-rx * 0.2, -ry * 0.2, 0, 0, 0, Math.max(rx, ry));
      coreGrad.addColorStop(0, 'rgba(215, 235, 255, 0.22)');
      coreGrad.addColorStop(0.5, 'rgba(20, 35, 45, 0.45)');
      coreGrad.addColorStop(0.85, 'rgba(10, 18, 25, 0.65)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0.55)');

      context.beginPath();
      context.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      context.fillStyle = coreGrad;
      context.fill();

      // 3. Bottom light reflection (internal bounce through droplet)
      context.beginPath();
      context.ellipse(rx * 0.1, ry * 0.45, rx * 0.55, ry * 0.28, 0, 0, Math.PI);
      context.fillStyle = 'rgba(255, 255, 255, 0.28)';
      context.fill();

      // 4. Primary Specular Highlight (Crisp pinpoint light source reflection)
      const hlX = -rx * 0.35;
      const hlY = -ry * 0.38;
      const hlR = Math.max(rx * 0.28, 0.7);

      context.beginPath();
      context.arc(hlX, hlY, hlR, 0, Math.PI * 2);
      context.fillStyle = 'rgba(255, 255, 255, 0.88)';
      context.shadowColor = 'rgba(255, 255, 255, 0.6)';
      context.shadowBlur = 1.5;
      context.fill();

      // 5. Tiny secondary glint
      if (r > 2) {
        context.beginPath();
        context.arc(hlX + rx * 0.22, hlY + ry * 0.15, hlR * 0.45, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 255, 255, 0.6)';
        context.fill();
      }

      context.restore();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // --- Layer 1: Distant Falling Rain Streaks (Behind Window) ---
      ctx.strokeStyle = 'rgba(175, 210, 235, 0.18)';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      const windAngle = 0.14; // gentle monsoon diagonal slant

      for (let i = 0; i < distantStreaks.length; i++) {
        const s = distantStreaks[i];
        ctx.beginPath();
        ctx.strokeStyle = `rgba(165, 195, 220, ${s.alpha})`;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.len * windAngle, s.y + s.len);
        ctx.stroke();

        s.y += s.speed;
        s.x += s.speed * windAngle;

        if (s.y > height) {
          s.y = -s.len;
          s.x = Math.random() * (width + 200) - 100;
        }
      }

      // --- Layer 2: Static Condensation Micro-Droplets on the Glass Pane ---
      for (let i = 0; i < staticDrops.length; i++) {
        const sd = staticDrops[i];
        drawRealisticDroplet(ctx, sd.x, sd.y, sd.r, sd.aspect, false, 0);
      }

      // --- Layer 3: Dynamic Sliding Water Droplets & Wet Trails ---
      for (let i = 0; i < slidingDrops.length; i++) {
        const d = slidingDrops[i];

        // 3a. Draw water trail left behind sliding drop
        for (let t = 0; t < d.trail.length; t++) {
          const pt = d.trail[t];
          if (pt.alpha > 0.05) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(220, 240, 255, ${pt.alpha * 0.45})`;
            ctx.fill();
            // Tiny meniscus
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.r + 0.3, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 0, 0, ${pt.alpha * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.restore();

            pt.alpha -= 0.0025; // slowly evaporates / thins
          }
        }
        // Prune faded trail points
        d.trail = d.trail.filter((pt) => pt.alpha > 0.05);

        // 3b. Natural Stick-Slip Physics (Water hesitating, bursting down, pausing)
        if (d.isSliding) {
          d.slideTimer--;
          // Accelerate slightly as water flows
          d.y += d.vy * (1.2 + d.mass * 0.25);
          d.x += d.vx;

          // Occasionally leave a micro-bead in the wake
          if (Math.random() < 0.35) {
            d.trail.push({
              x: d.x + (Math.random() - 0.5) * 1.5,
              y: d.y - d.r * 0.8,
              r: 0.6 + Math.random() * (d.r * 0.35),
              alpha: 0.65,
            });
          }

          if (d.slideTimer <= 0) {
            d.isSliding = false;
            d.pauseTimer = Math.random() * 80 + 30; // pause on surface tension
          }
        } else {
          d.pauseTimer--;
          // Very slight crawl even when paused
          d.y += 0.04;

          if (d.pauseTimer <= 0) {
            d.isSliding = true;
            d.slideTimer = Math.random() * 60 + 30;
            d.vy = 0.6 + Math.random() * 1.2;
            d.vx = (Math.random() - 0.5) * 0.2;
          }
        }

        // Draw main sliding droplet
        drawRealisticDroplet(ctx, d.x, d.y, d.r, 1, d.isSliding, d.vy);

        // Respawn when falling off the screen bottom
        if (d.y > height + 30) {
          slidingDrops[i] = createSlidingDrop(-15);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Pause when tab is not visible to conserve CPU/GPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85 select-none"
      style={{
        width: '100vw',
        height: '100vh',
      }}
      aria-hidden="true"
    />
  );
}
