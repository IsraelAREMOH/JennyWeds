import { useEffect, useRef } from "react";

export default function ConfettiCanvas({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const colors = ["#FFC0CB", "#FFD700", "#A0522D", "#F5F5DC"];
    const confettis = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 4 + 2,
      d: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0,
    }));

    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const update = () => {
      confettis.forEach((c) => {
        c.tiltAngle += c.tiltAngleIncremental;
        c.y += (Math.cos(c.d) + 1 + c.r / 2) / 2;
        c.x += Math.sin(0.5);
        c.tilt = Math.sin(c.tiltAngle) * 15;

        if (c.y > window.innerHeight) {
          c.x = Math.random() * window.innerWidth;
          c.y = -10;
        }
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettis.forEach((c) => {
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
        ctx.stroke();
      });
      update();
      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[999] pointer-events-none"
    />
  );
}
