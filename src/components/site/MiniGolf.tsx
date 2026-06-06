import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

// ─── Types ────────────────────────────────────────────────────────────────────

type Vec = { x: number; y: number };

type WallObs  = { type: "wall";   x: number; y: number; w: number; h: number };
type BumpObs  = { type: "bumper"; cx: number; cy: number; r: number };
type SandObs  = { type: "sand";   x: number; y: number; w: number; h: number };
type Obstacle = WallObs | BumpObs | SandObs;

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  maxLife: number;
  color: string;
  r: number;
  spin: number;
  square: boolean;
};

interface HoleDef {
  name: string;
  ball: Vec;
  hole: Vec;
  par: number;
  obstacles: Obstacle[];
}

// ─── Course data ──────────────────────────────────────────────────────────────

const W = 1000;
const H = 460;

const HOLES: HoleDef[] = [
  {
    name: "The Opener",
    par: 2,
    ball: { x: 95, y: 230 },
    hole: { x: 882, y: 230 },
    obstacles: [
      { type: "wall", x: 380, y: 80,  w: 22, h: 200 },
      { type: "wall", x: 380, y: 360, w: 22, h: 100 },
    ],
  },
  {
    name: "The Dog-Leg",
    par: 3,
    ball: { x: 95, y: 380 },
    hole: { x: 882, y: 80 },
    obstacles: [
      { type: "wall", x: 290, y: 180, w: 22, h: 280 },
      { type: "wall", x: 560, y: 0,   w: 22, h: 280 },
      { type: "sand", x: 620, y: 300, w: 200, h: 120 },
    ],
  },
  {
    name: "Bumper Alley",
    par: 3,
    ball: { x: 95, y: 230 },
    hole: { x: 882, y: 230 },
    obstacles: [
      { type: "bumper", cx: 340, cy: 130, r: 28 },
      { type: "bumper", cx: 500, cy: 330, r: 28 },
      { type: "bumper", cx: 660, cy: 130, r: 28 },
      { type: "wall",   x: 140, y: 0,    w: 22, h: 160 },
      { type: "wall",   x: 140, y: 310,  w: 22, h: 150 },
    ],
  },
  {
    name: "The Labyrinth",
    par: 4,
    ball: { x: 95, y: 380 },
    hole: { x: 882, y: 80 },
    obstacles: [
      { type: "wall",   x: 240, y: 140, w: 22, h: 320 },
      { type: "wall",   x: 460, y: 0,   w: 22, h: 320 },
      { type: "wall",   x: 680, y: 140, w: 22, h: 320 },
      { type: "bumper", cx: 350, cy: 80,  r: 24 },
      { type: "bumper", cx: 570, cy: 380, r: 24 },
      { type: "sand",   x: 0,   y: 180,  w: 200, h: 100 },
    ],
  },
  {
    name: "The Championship",
    par: 5,
    ball: { x: 95, y: 400 },
    hole: { x: 882, y: 60 },
    obstacles: [
      { type: "wall",   x: 200, y: 0,   w: 22, h: 300 },
      { type: "wall",   x: 380, y: 160, w: 22, h: 300 },
      { type: "wall",   x: 560, y: 0,   w: 22, h: 300 },
      { type: "wall",   x: 740, y: 160, w: 22, h: 300 },
      { type: "bumper", cx: 290, cy: 380, r: 26 },
      { type: "bumper", cx: 470, cy: 80,  r: 26 },
      { type: "bumper", cx: 650, cy: 380, r: 26 },
      { type: "sand",   x: 820, y: 160,  w: 140, h: 200 },
    ],
  },
];

// ─── Physics constants ────────────────────────────────────────────────────────

const BALL_R        = 10;
const HOLE_R        = 15;
const FRICTION      = 0.983;
const SAND_FRICTION = 0.93;
const BOUNCE        = 0.62;
const STOP_V        = 0.07;
const MAX_POWER     = 20;
const MAX_DRAG      = 260;

// ─── Particle helpers ─────────────────────────────────────────────────────────

const SPARK_COLORS    = ["#c9a84c", "#ffe8a0", "#ffffff", "#e6c76a"];
const CONFETTI_COLORS = ["#c9a84c", "#ffffff", "#22c55e", "#ffd700", "#ff6b6b", "#4ecdc4"];

function makeSpark(x: number, y: number, nx: number, ny: number): Particle[] {
  return Array.from({ length: 7 }, () => {
    const spread = 1.2;
    const speed  = 1.2 + Math.random() * 2.5;
    const a      = Math.atan2(ny, nx) + (Math.random() - 0.5) * spread;
    return {
      x, y,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed,
      life: 1, maxLife: 1,
      color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
      r: 1.5 + Math.random() * 2,
      spin: 0, square: false,
    };
  });
}

function makeConfetti(x: number, y: number, count = 40): Particle[] {
  return Array.from({ length: count }, () => {
    const a     = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    return {
      x, y,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed - 3,
      life: 1, maxLife: 1,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      r: 3 + Math.random() * 4,
      spin: (Math.random() - 0.5) * 0.3,
      square: Math.random() > 0.5,
    };
  });
}

// ─── Game state ref ───────────────────────────────────────────────────────────

function freshState(holeIdx: number) {
  return {
    ball:        { ...HOLES[holeIdx].ball } as Vec,
    vel:         { x: 0, y: 0 } as Vec,
    aiming:      false,
    aimStart:    { x: 0, y: 0 } as Vec,
    mouse:       { x: 0, y: 0 } as Vec,
    sunk:        false,
    sinkProgress: 0,
    trail:       [] as Vec[],
    particles:   [] as Particle[],
    bumperFlash: new Map<number, number>(),
    strokes:     0,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MiniGolf() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [holeIdx,    setHoleIdx]    = useState(0);
  const [scores,     setScores]     = useState<number[]>([]);
  const [holeInOnes, setHoleInOnes] = useState<number[]>([]);
  const [uiStrokes,  setUiStrokes]  = useState(0);
  const [showNext,   setShowNext]   = useState(false);
  const [completed,  setCompleted]  = useState(false);

  const gs = useRef(freshState(0));

  // Sync strokes from game state → React UI every 100 ms
  useEffect(() => {
    const id = setInterval(() => setUiStrokes(gs.current.strokes), 100);
    return () => clearInterval(id);
  }, []);

  // Reset game state when hole changes
  useEffect(() => {
    gs.current = freshState(holeIdx);
    setUiStrokes(0);
    setShowNext(false);
  }, [holeIdx]);

  // ── Main game loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const s = gs.current;
    let raf = 0;
    let sunkFrames = 0;

    // ── Pointer helpers ─────────────────────────────────────────────────────

    const toCanvas = (e: PointerEvent): Vec => {
      const r = canvas.getBoundingClientRect();
      return {
        x: ((e.clientX - r.left) / r.width)  * W,
        y: ((e.clientY - r.top)  / r.height) * H,
      };
    };

    const onDown = (e: PointerEvent) => {
      if (s.sunk) return;
      if (Math.hypot(s.vel.x, s.vel.y) > STOP_V * 3) return;
      s.aiming    = true;
      s.aimStart  = toCanvas(e);
      s.mouse     = s.aimStart;
    };
    const onMove = (e: PointerEvent) => {
      if (!s.aiming) return;
      s.mouse = toCanvas(e);
    };
    const onUp = () => {
      if (!s.aiming) return;
      s.aiming = false;
      const dx   = s.ball.x - s.mouse.x;
      const dy   = s.ball.y - s.mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 5) return;
      const power = Math.min(dist / 13, MAX_POWER);
      s.vel.x = (dx / dist) * power;
      s.vel.y = (dy / dist) * power;
      s.strokes += 1;
    };

    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove",  onMove);
    window.addEventListener("pointerup",    onUp);

    // ── Draw utilities ──────────────────────────────────────────────────────

    function drawGrass() {
      const g = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, 600);
      g.addColorStop(0, "#1e5c40");
      g.addColorStop(1, "#0d2e1e");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // Subtle grid
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y <= H; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Fairway stripe highlight
      ctx.fillStyle = "rgba(255,255,255,0.012)";
      for (let i = 0; i < 5; i++) {
        ctx.fillRect(i * 200, 0, 100, H);
      }

      // Border
      ctx.strokeStyle = "rgba(201,168,76,0.55)";
      ctx.lineWidth = 3;
      ctx.strokeRect(2, 2, W - 4, H - 4);
      // Inner glow
      ctx.strokeStyle = "rgba(201,168,76,0.15)";
      ctx.lineWidth = 1;
      ctx.strokeRect(8, 8, W - 16, H - 16);
    }

    function drawSand(ob: SandObs) {
      ctx.save();
      ctx.fillStyle = "rgba(210,175,100,0.22)";
      ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
      // dotted texture
      ctx.fillStyle = "rgba(220,190,120,0.18)";
      for (let tx = ob.x + 8; tx < ob.x + ob.w; tx += 12) {
        for (let ty = ob.y + 8; ty < ob.y + ob.h; ty += 12) {
          ctx.beginPath();
          ctx.arc(tx + Math.sin(tx * ty) * 2, ty, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.strokeStyle = "rgba(210,175,100,0.4)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(ob.x, ob.y, ob.w, ob.h);
      ctx.setLineDash([]);
      ctx.restore();
    }

    function drawWall(ob: WallObs) {
      const grad = ctx.createLinearGradient(ob.x, ob.y, ob.x + ob.w, ob.y + ob.h);
      grad.addColorStop(0, "rgba(201,168,76,0.95)");
      grad.addColorStop(1, "rgba(150,115,40,0.85)");
      ctx.fillStyle = grad;
      ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
      // Highlight edge
      ctx.fillStyle = "rgba(255,240,180,0.45)";
      ctx.fillRect(ob.x, ob.y, ob.w, 2);
      ctx.fillRect(ob.x, ob.y, 2, ob.h);
      // Shadow edge
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(ob.x + ob.w - 2, ob.y, 2, ob.h);
      ctx.fillRect(ob.x, ob.y + ob.h - 2, ob.w, 2);
    }

    function drawBumper(ob: BumpObs, flash: number) {
      const glow = Math.max(0, flash);
      // Outer glow when flashing
      if (glow > 0) {
        ctx.beginPath();
        ctx.arc(ob.cx, ob.cy, ob.r + 10 * glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,200,80,${0.35 * glow})`;
        ctx.fill();
      }
      // Body
      const g = ctx.createRadialGradient(ob.cx - ob.r * 0.3, ob.cy - ob.r * 0.3, 1, ob.cx, ob.cy, ob.r);
      g.addColorStop(0, glow > 0.5 ? "#ffe070" : "#d4a830");
      g.addColorStop(0.6, glow > 0.5 ? "#c9a84c" : "#9a7020");
      g.addColorStop(1, "#5a4010");
      ctx.beginPath();
      ctx.arc(ob.cx, ob.cy, ob.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      // Ring
      ctx.beginPath();
      ctx.arc(ob.cx, ob.cy, ob.r, 0, Math.PI * 2);
      ctx.strokeStyle = glow > 0 ? "rgba(255,240,140,0.9)" : "rgba(255,225,120,0.55)";
      ctx.lineWidth = 2;
      ctx.stroke();
      // Shine
      ctx.beginPath();
      ctx.arc(ob.cx - ob.r * 0.28, ob.cy - ob.r * 0.28, ob.r * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.fill();
    }

    function drawHole(hole: Vec, t: number) {
      // Hole shadow
      ctx.beginPath();
      ctx.ellipse(hole.x + 2, hole.y + 3, HOLE_R + 2, HOLE_R, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();
      // Hole
      const hg = ctx.createRadialGradient(hole.x - 3, hole.y - 3, 1, hole.x, hole.y, HOLE_R);
      hg.addColorStop(0, "#1a1a1a");
      hg.addColorStop(1, "#000000");
      ctx.beginPath();
      ctx.arc(hole.x, hole.y, HOLE_R, 0, Math.PI * 2);
      ctx.fillStyle = hg;
      ctx.fill();
      ctx.strokeStyle = "rgba(201,168,76,0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Flag pole
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(hole.x, hole.y - 4);
      ctx.lineTo(hole.x, hole.y - 38);
      ctx.stroke();

      // Waving flag using bezier
      const wave = Math.sin(t * 3.2) * 5;
      const w2   = Math.sin(t * 3.2 + 0.6) * 3;
      ctx.beginPath();
      ctx.moveTo(hole.x, hole.y - 38);
      ctx.bezierCurveTo(
        hole.x + 7,  hole.y - 38 + wave * 0.4,
        hole.x + 14, hole.y - 32 + w2,
        hole.x,      hole.y - 26
      );
      ctx.fillStyle = "#c9a84c";
      ctx.fill();
      ctx.strokeStyle = "rgba(180,140,30,0.8)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function drawBall(ball: Vec) {
      // Drop shadow
      ctx.beginPath();
      ctx.ellipse(ball.x + 2, ball.y + 4, BALL_R * 0.9, BALL_R * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fill();
      // Ball body
      const bg = ctx.createRadialGradient(ball.x - 3, ball.y - 3, 1, ball.x, ball.y, BALL_R);
      bg.addColorStop(0, "#ffffff");
      bg.addColorStop(0.6, "#e8e8e8");
      bg.addColorStop(1, "#c0c0c0");
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2);
      ctx.fillStyle = bg;
      ctx.fill();
      // Dimples (6)
      ctx.fillStyle = "rgba(160,160,160,0.5)";
      for (let i = 0; i < 6; i++) {
        const a  = (i / 6) * Math.PI * 2 + 0.4;
        const dr = BALL_R * 0.52;
        ctx.beginPath();
        ctx.arc(ball.x + Math.cos(a) * dr, ball.y + Math.sin(a) * dr, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      // Centre dimple
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Specular
      ctx.beginPath();
      ctx.arc(ball.x - 3.5, ball.y - 3.5, BALL_R * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.75)";
      ctx.fill();
    }

    function drawTrail(trail: Vec[]) {
      for (let i = 0; i < trail.length; i++) {
        const a = (i / trail.length) * 0.45;
        const r = BALL_R * 0.55 * (i / trail.length);
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, r, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function drawAim(ball: Vec, mouse: Vec) {
      const dx    = ball.x - mouse.x;
      const dy    = ball.y - mouse.y;
      const dist  = Math.min(Math.hypot(dx, dy), MAX_DRAG);
      const ang   = Math.atan2(dy, dx);
      const power = Math.min(dist / 13, MAX_POWER) / MAX_POWER;

      // Dotted guide line — trajectory dots
      const dotCount = 10;
      for (let i = 1; i <= dotCount; i++) {
        const t = i / dotCount;
        const r = BALL_R * (0.7 - t * 0.45);
        ctx.globalAlpha = (1 - t * 0.85) * 0.7;
        ctx.beginPath();
        ctx.arc(
          ball.x + Math.cos(ang) * dist * 1.3 * t,
          ball.y + Math.sin(ang) * dist * 1.3 * t,
          Math.max(r, 1), 0, Math.PI * 2
        );
        ctx.fillStyle = "#ffecc8";
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Direction arrow tip
      const arrowX = ball.x + Math.cos(ang) * Math.min(dist * 1.3, 220);
      const arrowY = ball.y + Math.sin(ang) * Math.min(dist * 1.3, 220);
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(
        arrowX - Math.cos(ang - 0.4) * 10,
        arrowY - Math.sin(ang - 0.4) * 10,
      );
      ctx.lineTo(
        arrowX - Math.cos(ang + 0.4) * 10,
        arrowY - Math.sin(ang + 0.4) * 10,
      );
      ctx.closePath();
      ctx.fillStyle = "rgba(255,236,200,0.75)";
      ctx.fill();

      // Power bar
      const barX = 20, barY = H - 36, barW = 180, barH = 12;
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(barX - 2, barY - 2, barW + 4, barH + 4);
      const pg = ctx.createLinearGradient(barX, 0, barX + barW, 0);
      pg.addColorStop(0,   "#22c55e");
      pg.addColorStop(0.5, "#facc15");
      pg.addColorStop(1,   "#ef4444");
      ctx.fillStyle = pg;
      ctx.fillRect(barX, barY, barW * power, barH);
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1;
      ctx.strokeRect(barX, barY, barW, barH);
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "bold 9px 'IBM Plex Mono', monospace";
      ctx.fillText("POWER", barX, barY - 5);
    }

    function drawParticles(particles: Particle[]) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.12;
        p.vx *= 0.97;
        p.life -= 0.028;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        if (p.square) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.spin * (1 - p.life) * 20);
          ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    function drawHUD(hole: HoleDef, hIdx: number, t: number) {
      // Top strip
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, 0, W, 34);

      ctx.fillStyle = "rgba(201,168,76,0.9)";
      ctx.font = "600 11px 'IBM Plex Mono', monospace";
      ctx.fillText(`HOLE ${hIdx + 1} / ${HOLES.length}`, 16, 22);

      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillText(`PAR ${hole.par}`, 160, 22);

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fillText(`STROKES  ${s.strokes}`, 250, 22);

      // Hole name on right
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = "400 10px 'IBM Plex Mono', monospace";
      ctx.fillText(hole.name.toUpperCase(), W - 16, 22);
      ctx.textAlign = "left";

      // Pulsing ready indicator when ball is stopped
      const moving = Math.hypot(s.vel.x, s.vel.y) > STOP_V * 3;
      if (!moving && !s.sunk && !s.aiming) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 4);
        ctx.globalAlpha = 0.5 + 0.4 * pulse;
        ctx.fillStyle = "#c9a84c";
        ctx.font = "400 9px 'IBM Plex Mono', monospace";
        ctx.fillText("● READY TO AIM", 16, H - 12);
        ctx.globalAlpha = 1;
      }
    }

    // ── Main loop ───────────────────────────────────────────────────────────

    const draw = () => {
      const hole = HOLES[holeIdx];
      const t    = performance.now() / 1000;

      ctx.clearRect(0, 0, W, H);
      drawGrass();

      // Sand zones first (below everything)
      for (const ob of hole.obstacles) {
        if (ob.type === "sand") drawSand(ob as SandObs);
      }

      // Hole
      drawHole(hole.hole, t);

      // Ball start marker
      ctx.beginPath();
      ctx.arc(hole.ball.x, hole.ball.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Walls
      for (const ob of hole.obstacles) {
        if (ob.type === "wall") drawWall(ob as WallObs);
      }

      // Bumpers
      hole.obstacles.forEach((ob, idx) => {
        if (ob.type === "bumper") {
          const flash = s.bumperFlash.get(idx) ?? 0;
          drawBumper(ob as BumpObs, flash);
          if (flash > 0) s.bumperFlash.set(idx, flash - 0.06);
        }
      });

      // Physics update
      if (!s.sunk) {
        // Check sand
        let inSand = false;
        for (const ob of hole.obstacles) {
          if (ob.type === "sand") {
            const sand = ob as SandObs;
            if (
              s.ball.x > sand.x && s.ball.x < sand.x + sand.w &&
              s.ball.y > sand.y && s.ball.y < sand.y + sand.h
            ) inSand = true;
          }
        }
        const frict = inSand ? SAND_FRICTION : FRICTION;

        s.ball.x += s.vel.x;
        s.ball.y += s.vel.y;
        s.vel.x  *= frict;
        s.vel.y  *= frict;

        // Border bounces
        if (s.ball.x - BALL_R < 0) {
          s.ball.x = BALL_R;
          s.vel.x  = Math.abs(s.vel.x) * BOUNCE;
          s.particles.push(...makeSpark(s.ball.x, s.ball.y, 1, 0));
        }
        if (s.ball.x + BALL_R > W) {
          s.ball.x = W - BALL_R;
          s.vel.x  = -Math.abs(s.vel.x) * BOUNCE;
          s.particles.push(...makeSpark(s.ball.x, s.ball.y, -1, 0));
        }
        if (s.ball.y - BALL_R < 0) {
          s.ball.y = BALL_R;
          s.vel.y  = Math.abs(s.vel.y) * BOUNCE;
          s.particles.push(...makeSpark(s.ball.x, s.ball.y, 0, 1));
        }
        if (s.ball.y + BALL_R > H) {
          s.ball.y = H - BALL_R;
          s.vel.y  = -Math.abs(s.vel.y) * BOUNCE;
          s.particles.push(...makeSpark(s.ball.x, s.ball.y, 0, -1));
        }

        // Wall collisions
        for (const ob of hole.obstacles) {
          if (ob.type !== "wall") continue;
          const w  = ob as WallObs;
          const cx = Math.max(w.x, Math.min(s.ball.x, w.x + w.w));
          const cy = Math.max(w.y, Math.min(s.ball.y, w.y + w.h));
          const dx = s.ball.x - cx;
          const dy = s.ball.y - cy;
          const d2 = dx * dx + dy * dy;
          if (d2 < BALL_R * BALL_R) {
            const d  = Math.sqrt(d2) || 0.001;
            const nx = dx / d;
            const ny = dy / d;
            s.ball.x += nx * (BALL_R - d);
            s.ball.y += ny * (BALL_R - d);
            const dot = s.vel.x * nx + s.vel.y * ny;
            const spd = Math.hypot(s.vel.x, s.vel.y);
            s.vel.x   = (s.vel.x - 2 * dot * nx) * BOUNCE;
            s.vel.y   = (s.vel.y - 2 * dot * ny) * BOUNCE;
            if (spd > 1.5) s.particles.push(...makeSpark(cx, cy, nx, ny));
          }
        }

        // Bumper collisions
        hole.obstacles.forEach((ob, idx) => {
          if (ob.type !== "bumper") return;
          const b  = ob as BumpObs;
          const dx = s.ball.x - b.cx;
          const dy = s.ball.y - b.cy;
          const d  = Math.hypot(dx, dy);
          const minD = BALL_R + b.r;
          if (d < minD) {
            const nx = dx / (d || 0.001);
            const ny = dy / (d || 0.001);
            s.ball.x = b.cx + nx * minD;
            s.ball.y = b.cy + ny * minD;
            const dot = s.vel.x * nx + s.vel.y * ny;
            s.vel.x   = (s.vel.x - 2 * dot * nx) * 1.05; // bumpers give slight boost
            s.vel.y   = (s.vel.y - 2 * dot * ny) * 1.05;
            s.bumperFlash.set(idx, 1);
            s.particles.push(...makeSpark(s.ball.x, s.ball.y, nx, ny));
          }
        });

        // Stop threshold
        if (Math.abs(s.vel.x) < STOP_V) s.vel.x = 0;
        if (Math.abs(s.vel.y) < STOP_V) s.vel.y = 0;

        // Trail
        const spd = Math.hypot(s.vel.x, s.vel.y);
        if (spd > STOP_V * 3) {
          s.trail.push({ x: s.ball.x, y: s.ball.y });
          if (s.trail.length > 14) s.trail.shift();
        } else {
          if (s.trail.length > 0) s.trail.shift();
        }

        // Hole detection
        const hd = Math.hypot(s.ball.x - hole.hole.x, s.ball.y - hole.hole.y);
        if (hd < HOLE_R - 2 && spd < 9) {
          s.sunk = true;
          s.vel  = { x: 0, y: 0 };
          s.particles.push(...makeConfetti(hole.hole.x, hole.hole.y));
          sunkFrames = 0;
        }
      } else {
        // Animate ball sinking
        s.sinkProgress = Math.min(s.sinkProgress + 0.07, 1);
        sunkFrames++;
        if (sunkFrames === 40) {
          // Trigger React UI
          setShowNext(true);
        }
      }

      // Draw trail
      drawTrail(s.trail);

      // Draw ball (with sink shrink animation)
      if (s.sunk) {
        const scale = 1 - s.sinkProgress;
        if (scale > 0.02) {
          ctx.save();
          ctx.translate(hole.hole.x, hole.hole.y);
          ctx.scale(scale, scale);
          ctx.translate(-hole.hole.x, -hole.hole.y);
          drawBall({ x: hole.hole.x, y: hole.hole.y });
          ctx.restore();
        }
      } else {
        drawBall(s.ball);
      }

      // Aim guide
      if (s.aiming && !s.sunk) drawAim(s.ball, s.mouse);

      // Particles
      drawParticles(s.particles);

      // HUD
      drawHUD(hole, holeIdx, t);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove",  onMove);
      window.removeEventListener("pointerup",    onUp);
    };
  }, [holeIdx]);

  // ── Hole complete handler ─────────────────────────────────────────────────

  const handleNext = () => {
    const finalStrokes = gs.current.strokes;
    const isAce        = finalStrokes === 1;

    setScores((prev) => [...prev, finalStrokes]);
    if (isAce) setHoleInOnes((prev) => [...prev, holeIdx]);

    if (holeIdx < HOLES.length - 1) {
      setHoleIdx((i) => i + 1);
    } else {
      setCompleted(true);
    }
  };

  const restart = () => {
    setHoleIdx(0);
    setScores([]);
    setHoleInOnes([]);
    setUiStrokes(0);
    setShowNext(false);
    setCompleted(false);
    gs.current = freshState(0);
  };

  const hole           = HOLES[holeIdx];
  const par            = hole.par;
  const isSunk         = gs.current.sunk;
  const hasAce         = holeInOnes.length > 0;
  const grandTotal     = scores.reduce((a, b) => a + b, 0);
  const totalPar       = HOLES.slice(0, scores.length).reduce((a, h) => a + h.par, 0);
  const scoreDiff      = grandTotal - totalPar;
  const scoreLabel     = (s: number, p: number) => {
    const d = s - p;
    if (s === 1)  return { text: "HOLE IN ONE!", cls: "text-yellow-400" };
    if (d <= -2)  return { text: "Eagle", cls: "text-yellow-400" };
    if (d === -1) return { text: "Birdie", cls: "text-emerald-400" };
    if (d === 0)  return { text: "Par", cls: "text-foreground" };
    if (d === 1)  return { text: "Bogey", cls: "text-orange-400" };
    return               { text: `+${d}`, cls: "text-red-400" };
  };

  return (
    <section className="relative px-5 sm:px-8 md:px-12 lg:px-16 py-14 sm:py-20 border-t border-border bg-background overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-1/4 h-[30rem] w-[30rem] rounded-full bg-primary/8 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="block h-px w-12 bg-primary" />
              <span className="font-mono text-primary text-[10px] sm:text-[11px] tracking-[0.35em] uppercase">
                // Bonus Round
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[0.96]">
              Play a round of{" "}
              <span className="italic text-gold">Atlas Mini-Golf.</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="font-display text-sm text-muted-foreground leading-relaxed mb-2">
              5 holes. Hand-rolled physics. Built by the same team that builds your website.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary border border-primary/30 px-3 py-2 inline-block">
              ★ Hole in one = $250 off your project
            </p>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative border border-primary/30 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: `${W} / ${H}`,
              display: "block",
              cursor: isSunk ? "default" : "crosshair",
              touchAction: "none",
            }}
          />

          {/* Hole complete overlay */}
          {showNext && !completed && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/75 backdrop-blur-sm">
              <div className="text-center px-6 py-8 border border-border bg-background max-w-xs w-full mx-4">
                {gs.current.strokes === 1 ? (
                  <div className="mb-4">
                    <div className="font-serif text-5xl text-gold mb-1">★</div>
                    <div className="font-mono text-[11px] tracking-[0.35em] uppercase text-yellow-400 mb-2">
                      Hole in One!
                    </div>
                    <div className="font-display text-sm text-muted-foreground">
                      You've unlocked $250 off your first project with Atlas!
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-2">
                      Hole {holeIdx + 1} Complete
                    </div>
                    <div className="font-serif text-4xl mb-1">
                      {gs.current.strokes}{" "}
                      <span className="text-muted-foreground text-xl">
                        {gs.current.strokes === 1 ? "stroke" : "strokes"}
                      </span>
                    </div>
                    <div className={`font-mono text-[10px] uppercase tracking-[0.25em] mb-4 ${
                      scoreLabel(gs.current.strokes, hole.par).cls
                    }`}>
                      {scoreLabel(gs.current.strokes, hole.par).text}
                      {" · "}
                      {gs.current.strokes - hole.par > 0 ? `+${gs.current.strokes - hole.par}` : gs.current.strokes - hole.par} vs par {hole.par}
                    </div>
                  </>
                )}
                <button
                  onClick={handleNext}
                  className="cta-lux w-full px-6 py-3 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
                >
                  {holeIdx < HOLES.length - 1 ? "Next Hole →" : "Finish Round →"}
                </button>
              </div>
            </div>
          )}

          {/* Final scorecard */}
          {completed && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/85 backdrop-blur-md overflow-y-auto py-4">
              <div className="w-full max-w-lg mx-4 border border-border bg-background shadow-2xl">
                {/* Scorecard header */}
                <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-1">
                      Round Complete
                    </div>
                    <div className="font-serif text-3xl">
                      Final Score:{" "}
                      <span className={scoreDiff > 0 ? "text-red-400" : scoreDiff < 0 ? "text-gold" : "text-foreground"}>
                        {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff}
                      </span>
                    </div>
                  </div>
                  {hasAce && (
                    <div className="text-center">
                      <div className="font-serif text-3xl text-gold">★</div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-yellow-400">Ace!</div>
                    </div>
                  )}
                </div>

                {/* Hole-by-hole table */}
                <div className="px-6 py-4">
                  <table className="w-full text-sm font-mono">
                    <thead>
                      <tr className="text-muted-foreground text-[10px] uppercase tracking-[0.25em]">
                        <th className="text-left pb-2">Hole</th>
                        <th className="text-left pb-2">Name</th>
                        <th className="text-center pb-2">Par</th>
                        <th className="text-center pb-2">Score</th>
                        <th className="text-right pb-2">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scores.map((sc, i) => {
                        const { text, cls } = scoreLabel(sc, HOLES[i].par);
                        return (
                          <tr key={i} className="border-t border-border/40">
                            <td className="py-2 text-primary">{String(i + 1).padStart(2, "0")}</td>
                            <td className="py-2 text-muted-foreground text-[11px]">{HOLES[i].name}</td>
                            <td className="py-2 text-center text-muted-foreground">{HOLES[i].par}</td>
                            <td className="py-2 text-center font-serif text-base">{sc}</td>
                            <td className={`py-2 text-right text-[10px] uppercase tracking-[0.18em] ${cls}`}>{text}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-border">
                        <td colSpan={2} className="pt-3 font-semibold text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Total</td>
                        <td className="pt-3 text-center text-muted-foreground">{HOLES.reduce((a, h) => a + h.par, 0)}</td>
                        <td className="pt-3 text-center font-serif text-xl text-gold">{grandTotal}</td>
                        <td className={`pt-3 text-right text-[10px] uppercase tracking-[0.18em] ${scoreDiff > 0 ? "text-red-400" : "text-emerald-400"}`}>
                          {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Hole-in-one reward */}
                {hasAce && (
                  <div className="mx-6 mb-4 p-4 border border-yellow-500/30 bg-yellow-500/5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-yellow-400 mb-1">
                      ★ Hole-In-One Reward Unlocked
                    </div>
                    <p className="font-display text-sm text-foreground leading-relaxed mb-3">
                      You aced{" "}
                      {holeInOnes.map((i) => HOLES[i].name).join(" & ")}
                      ! Mention your hole-in-one when you contact us and we'll take{" "}
                      <strong className="text-yellow-400">$250 off</strong> your first or next project.
                    </p>
                    <Link
                      to="/contact"
                      className="cta-lux inline-block px-5 py-3 bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
                    >
                      Claim My $250 Discount →
                    </Link>
                  </div>
                )}

                {/* Actions */}
                <div className="px-6 pb-6 flex gap-3">
                  <button
                    onClick={restart}
                    className="flex-1 px-4 py-3 border border-border font-mono text-[11px] uppercase tracking-[0.22em] hover:border-primary hover:text-primary transition-colors"
                  >
                    Play Again
                  </button>
                  {!hasAce && (
                    <Link
                      to="/contact"
                      className="cta-lux flex-1 px-4 py-3 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors text-center"
                    >
                      Start a Project →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom strip */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Click &amp; drag away from the ball to aim — release to putt
          </span>
          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>
              Hole{" "}
              <span className="text-foreground">{holeIdx + 1}/{HOLES.length}</span>
            </span>
            <span>
              Strokes{" "}
              <span className="text-foreground">{uiStrokes}</span>
            </span>
            {scores.length > 0 && (
              <span>
                Round{" "}
                <span className={`${grandTotal + uiStrokes - (totalPar + par) > 0 ? "text-red-400" : "text-emerald-400"}`}>
                  {grandTotal + uiStrokes}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
