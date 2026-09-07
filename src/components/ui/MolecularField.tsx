'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

type Variant = 'labs' | 'tech' | 'neutral';
type Density = 'sparse' | 'base' | 'dense';

const GLOW_VAR: Record<'labs' | 'tech', string> = {
  labs: '--color-labs-glow',
  tech: '--color-tech-glow',
};

const NODE_COUNT: Record<Density, number> = { sparse: 14, base: 24, dense: 36 };

interface Node { x: number; y: number; vx: number; vy: number }

/**
 * Identidad molecular del sistema oscuro (CLAUDE.md, "Identidad molecular"):
 * nodos + enlaces a la deriva, nunca polvo de estrellas genérico — conecta
 * con los isotipos de molécula de Labs/Tech. Sustituye a MoleculeField.tsx
 * (estático). Por defecto dibuja un único frame fijo. La animación requiere
 * opt-in y sigue desactivada bajo prefers-reduced-motion (regla 8).
 */
export function MolecularField({
  variant,
  density = 'base',
  animated = false,
  className,
}: {
  variant: Variant;
  density?: Density;
  animated?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const color = variant === 'neutral'
      ? '255, 255, 255'
      : hexToRgbTriplet(getComputedStyle(document.documentElement).getPropertyValue(GLOW_VAR[variant]).trim());

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;

    function seed() {
      const count = NODE_COUNT[density];
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const maxDist = Math.max(100, Math.min(width, height) * 0.24);

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i]!;
          const b = nodes[j]!;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < maxDist) {
            ctx!.strokeStyle = `rgba(${color}, ${0.22 * (1 - dist / maxDist)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      ctx!.fillStyle = `rgba(${color}, 0.6)`;
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function step() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(step);
    }

    resize();
    if (reduced || !animated) {
      draw();
    } else {
      raf = requestAnimationFrame(step);
    }

    const onResize = () => {
      resize();
      if (reduced || !animated) draw();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [variant, density, reduced, animated]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 size-full', className)}
    />
  );
}

function hexToRgbTriplet(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
