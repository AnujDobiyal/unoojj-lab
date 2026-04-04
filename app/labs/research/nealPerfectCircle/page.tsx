"use client";

import React, { useEffect, useRef, useState } from "react";

const NealPerfectCirclePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const points = useRef<{ x: number; y: number }[]>([]);

  const [score, setScore] = useState<number | null>(null);

  function fitCircle(points: { x: number; y: number }[]) {
    const n = points.length;

    let sumX = 0,
      sumY = 0,
      sumX2 = 0,
      sumY2 = 0,
      sumXY = 0,
      sumX3 = 0,
      sumY3 = 0,
      sumX1Y2 = 0,
      sumX2Y1 = 0;

    for (const p of points) {
      const x = p.x;
      const y = p.y;

      const x2 = x * x;
      const y2 = y * y;

      sumX += x;
      sumY += y;
      sumX2 += x2;
      sumY2 += y2;
      sumXY += x * y;
      sumX3 += x2 * x;
      sumY3 += y2 * y;
      sumX1Y2 += x * y2;
      sumX2Y1 += x2 * y;
    }

    const C = n * sumX2 - sumX * sumX;
    const D = n * sumXY - sumX * sumY;
    const E = n * sumX3 + n * sumX1Y2 - (sumX2 + sumY2) * sumX;
    const G = n * sumY2 - sumY * sumY;
    const H = n * sumX2Y1 + n * sumY3 - (sumX2 + sumY2) * sumY;

    const denominator = 2 * (C * G - D * D);

    if (Math.abs(denominator) < 1e-6) {
      return null;
    }

    const cx = (G * E - D * H) / denominator;
    const cy = (C * H - D * E) / denominator;

    const r = Math.sqrt(
      points.reduce((sum, p) => sum + (p.x - cx) ** 2 + (p.y - cy) ** 2, 0) / n,
    );

    return { cx, cy, r };
  }

  const calculateScore = () => {
    const pts = points.current;

    if (pts.length < 10) return;
    console.log(pts);

    const circle = fitCircle(pts);

    if (!circle) return;

    const { cx, cy, r } = circle;
    const angles = pts.map((p) => Math.atan2(p.y - cy, p.x - cx));
    const normalized = angles.map((a) => (a + Math.PI * 2) % (Math.PI * 2));
    normalized.sort((a, b) => a - b);
    let maxGap = 0;

    for (let i = 1; i < normalized.length; i++) {
      maxGap = Math.max(maxGap, normalized[i] - normalized[i - 1]);
    }

    // wrap gap
    maxGap = Math.max(
      maxGap,
      Math.PI * 2 - (normalized[normalized.length - 1] - normalized[0]),
    );
    const coverage = Math.PI * 2 - maxGap;

    if (coverage < Math.PI * 1.8) {
      setScore(0);
      return;
    }
    console.log(cx, cy);

    // Distances from center

    const radii = pts.map((p) => Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2));

    const deviation =
      radii.reduce((s, radius) => s + Math.abs(radius - r), 0) / radii.length;

    const normalizedDeviation = deviation / r;

    const circleScore = Math.max(0, 100 - normalizedDeviation * 200);

    console.log(circleScore);
    setScore(Number(circleScore.toFixed(2)));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#df4b26";

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawing.current || !ctxRef.current || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      points.current.push({ x, y });

      if (!lastPoint.current) {
        lastPoint.current = { x, y };
        return;
      }

      const ctx = ctxRef.current;

      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      lastPoint.current = { x, y };
    };

    const stopDrawing = () => {
      if (!isDrawing.current) return;

      isDrawing.current = false;
      lastPoint.current = null;

      calculateScore();
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDrawing);
    window.addEventListener("pointercancel", stopDrawing);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDrawing);
      window.removeEventListener("pointercancel", stopDrawing);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();

    ctxRef.current?.clearRect(0, 0, 800, 800);

    points.current = [];

    lastPoint.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    points.current.push(lastPoint.current);

    isDrawing.current = true;
    setScore(null);
  };

  return (
    <div className="h-screen relative flex flex-col items-center justify-center bg-gray-100 gap-6">
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        onPointerDown={handlePointerDown}
        className="bg-white touch-none shadow-lg"
      />

      {score !== null && (
        <div className="fixed text-3xl text-neutral-400 font-bold">Circle Accuracy: {score}%</div>
      )}
    </div>
  );
};

export default NealPerfectCirclePage;
