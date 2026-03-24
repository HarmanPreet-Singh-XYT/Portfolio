'use client';
import { useEffect, useRef } from 'react';

const CYCLE_CHARS = '0123456789ABCDEF!@#$[]{}|<>/\\;.,_-+=~?%^&*()';
const RESOLVE_CHARS = '0123456789ABCDEF';

export default function AsciiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COL_W = 16;
    const ROW_H = 20;
    const FONT_SIZE = 12;

    let cols: number, rows: number, len: number;
    let states: Uint8Array;     // 0=inactive 1=cycling 2=resolved
    let chars: string[];
    let cycleCounts: Uint8Array;
    let maxCycles: Uint8Array;

    function resize() {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.offsetWidth : window.innerWidth;
      canvas.height = parent ? parent.offsetHeight : window.innerHeight;
      cols = Math.ceil(canvas.width / COL_W);
      rows = Math.ceil(canvas.height / ROW_H);
      len = cols * rows;
      states = new Uint8Array(len);
      chars = Array(len).fill('0');
      cycleCounts = new Uint8Array(len);
      maxCycles = new Uint8Array(len).map(() => 6 + Math.floor(Math.random() * 20));
    }

    resize();

    const rc = () => CYCLE_CHARS[Math.floor(Math.random() * CYCLE_CHARS.length)];
    const rr = () => RESOLVE_CHARS[Math.floor(Math.random() * RESOLVE_CHARS.length)];

    let frame = 0;
    let animId: number;

    function loop() {
      animId = requestAnimationFrame(loop);
      frame++;
      if (frame % 2 !== 0) return; // throttle to ~30fps

      // Randomly activate cells
      const toActivate = Math.max(1, Math.ceil(len * 0.003));
      for (let i = 0; i < toActivate; i++) {
        const idx = Math.floor(Math.random() * len);
        if (states[idx] === 0) {
          states[idx] = 1;
          cycleCounts[idx] = 0;
          maxCycles[idx] = 5 + Math.floor(Math.random() * 18);
        }
      }

      // Column burst every ~2s — signature WD2 feel
      if (frame % 64 === 0) {
        const col = Math.floor(Math.random() * cols);
        const startRow = Math.floor(Math.random() * rows);
        const burstLen = 4 + Math.floor(Math.random() * 14);
        for (let r = startRow; r < Math.min(startRow + burstLen, rows); r++) {
          const idx = r * cols + col;
          states[idx] = 1;
          cycleCounts[idx] = 0;
          maxCycles[idx] = 4 + Math.floor(Math.random() * 8);
        }
      }

      // Occasional block activation — "data packet" feel
      if (frame % 48 === 0) {
        const startCol = Math.floor(Math.random() * (cols - 4));
        const startRow = Math.floor(Math.random() * (rows - 3));
        for (let r = startRow; r < startRow + 2; r++) {
          for (let c = startCol; c < startCol + 3; c++) {
            const idx = r * cols + c;
            states[idx] = 1;
            cycleCounts[idx] = 0;
            maxCycles[idx] = 3 + Math.floor(Math.random() * 6);
          }
        }
      }

      // Draw frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px "Courier New", monospace`;

      for (let idx = 0; idx < len; idx++) {
        const s = states[idx];
        if (s === 0) continue;

        const r = Math.floor(idx / cols);
        const c = idx % cols;

        if (s === 1) {
          // Cycling: bright, rapidly changing
          chars[idx] = rc();
          cycleCounts[idx]++;
          if (cycleCounts[idx] >= maxCycles[idx]) {
            states[idx] = 2;
            chars[idx] = rr();
          }
          // Occasionally a char is extra bright (priority data)
          ctx.fillStyle = Math.random() < 0.05
            ? 'rgba(74,222,128,0.9)'
            : 'rgba(74,222,128,0.55)';
        } else {
          // Resolved: dim, static, slowly fades out
          if (Math.random() < 0.0008) {
            states[idx] = 0;
            continue;
          }
          ctx.fillStyle = 'rgba(74,222,128,0.1)';
        }

        ctx.fillText(chars[idx], c * COL_W, r * ROW_H + FONT_SIZE);
      }
    }

    loop();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
