import { useEffect, useRef, useState } from "react";

type Vec = { x: number; y: number };

const HOLES: Array<{
  ball: Vec;
  hole: Vec;
  walls: Array<{ x: number; y: number; w: number; h: number }>;
  par: number;
}> = [
  {
    ball: { x: 90, y: 280 },
    hole: { x: 700, y: 180 },
    walls: [{ x: 320, y: 80, w: 24, h: 220 }],
    par: 2,
  },
  {
    ball: { x: 80, y: 80 },
    hole: { x: 720, y: 300 },
    walls: [
      { x: 220, y: 0, w: 24, h: 240 },
      { x: 480, y: 140, w: 24, h: 240 },
    ],
    par: 3,
  },
  {
    ball: { x: 100, y: 320 },
    hole: { x: 720, y: 60 },
    walls: [
      { x: 260, y: 120, w: 24, h: 240 },
      { x: 420, y: 0, w: 24, h: 200 },
      { x: 580, y: 180, w: 24, h: 200 },
    ],
    par: 4,
  },
];

const WIDTH = 800;
const HEIGHT = 380;
const BALL_R = 9;
const HOLE_R = 14;
const FRICTION = 0.985;
const STOP_THRESHOLD = 0.06;
const MAX_POWER = 18;

export function MiniGolf() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [holeIdx, setHoleIdx] = useState(0);
  const [strokes, setStrokes] = useState(0);
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(false);
  const stateRef = useRef({
    ball: { ...HOLES[0].ball },
    vel: { x: 0, y: 0 },
    aiming: false,
    mouse: { x: 0, y: 0 },
    sunk: false,
  });

  useEffect(() => {
    stateRef.current.ball = { ...HOLES[holeIdx].ball };
    stateRef.current.vel = { x: 0, y: 0 };
    stateRef.current.sunk = false;
    setStrokes(0);
  }, [holeIdx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    ctx.scale(dpr, dpr);

    let raf = 0;
    const s = stateRef.current;

    const getPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) / rect.width) * WIDTH,
        y: ((e.clientY - rect.top) / rect.height) * HEIGHT,
      };
    };

    const onDown = (e: PointerEvent) => {
      if (s.sunk) return;
      if (Math.hypot(s.vel.x, s.vel.y) > STOP_THRESHOLD) return;
      s.aiming = true;
      s.mouse = getPos(e);
    };
    const onMove = (e: PointerEvent) => {
      if (!s.aiming) return;
      s.mouse = getPos(e);
    };
    const onUp = () => {
      if (!s.aiming) return;
      s.aiming = false;
      const dx = s.ball.x - s.mouse.x;
      const dy = s.ball.y - s.mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 4) return;
      const power = Math.min(dist / 12, MAX_POWER);
      s.vel.x = (dx / dist) * power;
      s.vel.y = (dy / dist) * power;
      setStrokes((n) => n + 1);
    };

    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    const draw = () => {
      const hole = HOLES[holeIdx];

      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      const g = ctx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 60, WIDTH / 2, HEIGHT / 2, 520);
      g.addColorStop(0, "#1c4a3a");
      g.addColorStop(1, "#0c2820");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < WIDTH; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y < HEIGHT; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(WIDTH, y);
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(201,168,76,0.45)";
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, WIDTH - 2, HEIGHT - 2);

      for (const w of hole.walls) {
        ctx.fillStyle = "rgba(201,168,76,0.85)";
        ctx.fillRect(w.x, w.y, w.w, w.h);
        ctx.strokeStyle = "rgba(255,236,200,0.5)";
        ctx.strokeRect(w.x, w.y, w.w, w.h);
      }

      ctx.beginPath();
      ctx.arc(hole.hole.x, hole.hole.y, HOLE_R, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.strokeStyle = "rgba(201,168,76,0.9)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,236,200,0.7)";
      ctx.beginPath();
      ctx.moveTo(hole.hole.x, hole.hole.y);
      ctx.lineTo(hole.hole.x, hole.hole.y - 28);
      ctx.stroke();
      ctx.fillStyle = "#c9a84c";
      ctx.beginPath();
      ctx.moveTo(hole.hole.x, hole.hole.y - 28);
      ctx.lineTo(hole.hole.x + 14, hole.hole.y - 22);
      ctx.lineTo(hole.hole.x, hole.hole.y - 16);
      ctx.closePath();
      ctx.fill();

      if (!s.sunk) {
        s.ball.x += s.vel.x;
        s.ball.y += s.vel.y;
        s.vel.x *= FRICTION;
        s.vel.y *= FRICTION;

        if (s.ball.x - BALL_R < 0) {
          s.ball.x = BALL_R;
          s.vel.x *= -0.7;
        }
        if (s.ball.x + BALL_R > WIDTH) {
          s.ball.x = WIDTH - BALL_R;
          s.vel.x *= -0.7;
        }
        if (s.ball.y - BALL_R < 0) {
          s.ball.y = BALL_R;
          s.vel.y *= -0.7;
        }
        if (s.ball.y + BALL_R > HEIGHT) {
          s.ball.y = HEIGHT - BALL_R;
          s.vel.y *= -0.7;
        }

        for (const w of hole.walls) {
          const cx = Math.max(w.x, Math.min(s.ball.x, w.x + w.w));
          const cy = Math.max(w.y, Math.min(s.ball.y, w.y + w.h));
          const dx = s.ball.x - cx;
          const dy = s.ball.y - cy;
          const d2 = dx * dx + dy * dy;
          if (d2 < BALL_R * BALL_R) {
            const d = Math.sqrt(d2) || 0.01;
            const nx = dx / d;
            const ny = dy / d;
            const overlap = BALL_R - d;
            s.ball.x += nx * overlap;
            s.ball.y += ny * overlap;
            const dot = s.vel.x * nx + s.vel.y * ny;
            s.vel.x = (s.vel.x - 2 * dot * nx) * 0.75;
            s.vel.y = (s.vel.y - 2 * dot * ny) * 0.75;
          }
        }

        if (Math.abs(s.vel.x) < STOP_THRESHOLD) s.vel.x = 0;
        if (Math.abs(s.vel.y) < STOP_THRESHOLD) s.vel.y = 0;

        const hd = Math.hypot(s.ball.x - hole.hole.x, s.ball.y - hole.hole.y);
        if (hd < HOLE_R - 2 && Math.hypot(s.vel.x, s.vel.y) < 8) {
          s.sunk = true;
          s.vel.x = 0;
          s.vel.y = 0;
        }
      }

      if (s.aiming && !s.sunk) {
        const dx = s.ball.x - s.mouse.x;
        const dy = s.ball.y - s.mouse.y;
        const dist = Math.min(Math.hypot(dx, dy), 220);
        const ang = Math.atan2(dy, dx);
        const ex = s.ball.x + Math.cos(ang) * dist;
        const ey = s.ball.y + Math.sin(ang) * dist;
        ctx.strokeStyle = "rgba(255,236,200,0.55)";
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.ball.x, s.ball.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.setLineDash([]);
        const power = Math.min(dist / 12, MAX_POWER) / MAX_POWER;
        ctx.fillStyle = `rgba(${255 - 80 * (1 - power)},${200 - 100 * power},120,0.9)`;
        ctx.fillRect(20, HEIGHT - 28, 200 * power, 10);
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.strokeRect(20, HEIGHT - 28, 200, 10);
      }

      if (!s.sunk) {
        ctx.beginPath();
        ctx.arc(s.ball.x + 1, s.ball.y + 2, BALL_R, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fill();
        const bg = ctx.createRadialGradient(
          s.ball.x - 3,
          s.ball.y - 3,
          1,
          s.ball.x,
          s.ball.y,
          BALL_R,
        );
        bg.addColorStop(0, "#ffffff");
        bg.addColorStop(1, "#cfcfcf");
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(s.ball.x, s.ball.y, BALL_R, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "rgba(255,236,200,0.85)";
      ctx.font = "600 11px 'IBM Plex Mono', monospace";
      ctx.fillText(
        `HOLE ${holeIdx + 1}/${HOLES.length}   PAR ${hole.par}   STROKES ${strokesRef.current}`,
        16,
        22,
      );

      raf = requestAnimationFrame(draw);
    };

    const strokesRef = { current: 0 };
    raf = requestAnimationFrame(draw);

    const sync = setInterval(() => {
      strokesRef.current = currentStrokesRef.current;
    }, 100);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(sync);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [holeIdx]);

  const currentStrokesRef = useRef(0);
  useEffect(() => {
    currentStrokesRef.current = strokes;
  }, [strokes]);

  useEffect(() => {
    const id = setInterval(() => {
      if (stateRef.current.sunk && !completed) {
        const finishedTotal = total + strokes;
        if (holeIdx === HOLES.length - 1) {
          setTotal(finishedTotal);
          setCompleted(true);
        }
      }
    }, 120);
    return () => clearInterval(id);
  }, [strokes, total, holeIdx, completed]);

  const nextHole = () => {
    setTotal((t) => t + strokes);
    if (holeIdx < HOLES.length - 1) {
      setHoleIdx((i) => i + 1);
    } else {
      setCompleted(true);
    }
  };

  const restart = () => {
    setTotal(0);
    setCompleted(false);
    setHoleIdx(0);
    stateRef.current.ball = { ...HOLES[0].ball };
    stateRef.current.vel = { x: 0, y: 0 };
    stateRef.current.sunk = false;
    setStrokes(0);
  };

  const [, force] = useState(0);
  useEffect(() => {
    const id = setInterval(() => force((n) => n + 1), 150);
    return () => clearInterval(id);
  }, []);

  const isSunk = stateRef.current.sunk;
  const par = HOLES[holeIdx].par;

  return (
    <section className="relative px-5 sm:px-8 md:px-12 lg:px-16 py-20 border-t border-border emerald-wash">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-4 mb-6">
          <span className="block h-px w-12 bg-primary" />
          <span className="font-mono text-primary text-[10px] sm:text-[11px] tracking-[0.35em] uppercase">
            // Bonus Round
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[0.96] max-w-2xl">
            Play a round of <span className="italic text-gold">Atlas Mini-Golf</span>.
          </h2>
          <p className="font-display text-sm md:text-base text-muted-foreground max-w-md">
            Built in an afternoon with hand-rolled canvas physics. The same team builds your
            website, app, social, and video.
          </p>
        </div>

        <div className="relative rounded-sm overflow-hidden border border-primary/30 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: `${WIDTH} / ${HEIGHT}`,
              display: "block",
              cursor: isSunk ? "default" : "crosshair",
              touchAction: "none",
            }}
          />

          {isSunk && !completed && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
              <div className="text-center px-6">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-2">
                  Hole {holeIdx + 1} Complete
                </div>
                <div className="font-serif text-3xl md:text-4xl mb-2">
                  {strokes} {strokes === 1 ? "stroke" : "strokes"}
                  <span className="text-muted-foreground text-base ml-3">
                    ({strokes - par > 0 ? `+${strokes - par}` : strokes - par} vs par)
                  </span>
                </div>
                <button
                  onClick={nextHole}
                  className="mt-4 cta-lux px-6 py-3 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
                >
                  {holeIdx < HOLES.length - 1 ? "Next Hole →" : "Finish Round"}
                </button>
              </div>
            </div>
          )}

          {completed && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center px-6">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-2">
                  Round Complete
                </div>
                <div className="font-serif text-4xl md:text-5xl mb-3">
                  Total: <span className="text-gold">{total + strokes}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-5 max-w-sm mx-auto">
                  Nice round. Now let us build something for your business.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={restart}
                    className="px-5 py-3 border border-border font-mono text-[11px] uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
                  >
                    Play Again
                  </button>
                  <a
                    href="/contact"
                    className="cta-lux px-5 py-3 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
                  >
                    Start a Project →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>Click & drag from the ball to aim. Release to putt.</span>
          <span>
            Round total: <span className="text-foreground">{total + strokes}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
