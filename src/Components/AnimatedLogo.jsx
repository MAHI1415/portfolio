import React, { useRef, useEffect } from 'react';

const AnimatedLogo = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, hovering: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const SIZE = 56;
    canvas.width = SIZE;
    canvas.height = SIZE;

    let t = 0;

    const handleMouseEnter = () => { mouseRef.current.hovering = true; };
    const handleMouseLeave = () => { mouseRef.current.hovering = false; };
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      t += 0.03;

      const isHovered = mouseRef.current.hovering;
      const speed = isHovered ? 0.06 : 0.02;
      
      const cx = SIZE / 2;
      const cy = SIZE / 2;
      const R = 22;

      // === OUTER SPINNING NEON RING ===
      const ringGrad = ctx.createLinearGradient(0, 0, SIZE, SIZE);
      ringGrad.addColorStop(0, `hsl(${(t * 80) % 360}, 100%, 65%)`);
      ringGrad.addColorStop(0.5, `hsl(${(t * 80 + 120) % 360}, 100%, 65%)`);
      ringGrad.addColorStop(1, `hsl(${(t * 80 + 240) % 360}, 100%, 65%)`);

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = ringGrad;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = `hsl(${(t * 80) % 360}, 100%, 65%)`;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // === INNER SPINNING DASHED RING ===
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 1.5);
      ctx.translate(-cx, -cy);
      ctx.beginPath();
      ctx.setLineDash([4, 5]);
      ctx.arc(cx, cy, R - 6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(168, 85, 247, ${0.4 + 0.3 * Math.sin(t * 2)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // === ORBITING DOTS (3 dots spinning around) ===
      for (let i = 0; i < 3; i++) {
        const angle = t * 2 + (i * Math.PI * 2) / 3;
        const ox = cx + Math.cos(angle) * (R - 3);
        const oy = cy + Math.sin(angle) * (R - 3);
        const dotColor = i === 0 ? '#38bdf8' : i === 1 ? '#a855f7' : '#ec4899';

        ctx.beginPath();
        ctx.arc(ox, oy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.shadowColor = dotColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // === CENTER BACKGROUND ===
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R - 8);
      bgGrad.addColorStop(0, 'rgba(30, 10, 60, 0.95)');
      bgGrad.addColorStop(1, 'rgba(9, 9, 11, 0.90)');
      ctx.beginPath();
      ctx.arc(cx, cy, R - 8, 0, Math.PI * 2);
      ctx.fillStyle = bgGrad;
      ctx.fill();

      // === "MG" TEXT - 3D LAYERED GLOW ===
      const pulse = isHovered ? 1.15 : (1 + 0.05 * Math.sin(t * 3));
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(pulse, pulse);
      ctx.translate(-cx, -cy);
      ctx.font = `bold 16px "Inter", "Arial", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Shadow layers for 3D depth
      const textColors = [
        { color: '#1e1b4b', offsetY: 3, blur: 0 },
        { color: '#3730a3', offsetY: 2, blur: 0 },
        { color: '#a855f7', offsetY: 1, blur: 4 },
      ];
      textColors.forEach(({ color, offsetY, blur }) => {
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = blur;
        ctx.fillText('MG', cx, cy + offsetY);
      });

      // Main bright text
      const textGrad = ctx.createLinearGradient(cx - 12, cy - 8, cx + 12, cy + 8);
      textGrad.addColorStop(0, '#e0f2fe'); // bright white-blue
      textGrad.addColorStop(0.5, '#c4b5fd'); // light purple
      textGrad.addColorStop(1, '#f0abfc'); // pink
      ctx.fillStyle = textGrad;
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = isHovered ? 15 : 8;
      ctx.fillText('MG', cx, cy);
      ctx.shadowBlur = 0;
      ctx.restore();

      // === CORNER SPARKLES (appear on hover) ===
      if (isHovered) {
        const sparkles = [
          { x: cx - 18, y: cy - 18 },
          { x: cx + 18, y: cy - 18 },
          { x: cx - 18, y: cy + 18 },
          { x: cx + 18, y: cy + 18 },
        ];
        sparkles.forEach((s, i) => {
          const alpha = (Math.sin(t * 5 + i * 1.5) + 1) / 2;
          ctx.beginPath();
          ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: 56, height: 56, cursor: 'pointer' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          display: 'block',
        }}
      />
    </div>
  );
};

export default AnimatedLogo;