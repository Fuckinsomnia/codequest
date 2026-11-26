import { useEffect, useRef } from 'react';

const clamp = value => Math.min(1, Math.max(0, value));

export default function RealisticAscii({
  src,
  alt,
  rows = 48,
  className = '',
  contrast = 1.38,
  brightness = 0,
  photoOpacity = 0.04,
  dotOpacity = 0.94,
  focusY = 0.5,
  background = '#070512',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let observer;
    let frame;
    const image = new Image();

    const draw = () => {
      if (cancelled) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const context = canvas.getContext('2d');
      if (!context) return;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.fillStyle = background;
      context.fillRect(0, 0, rect.width, rect.height);

      const actualRows = Math.max(18, Math.round(rows));
      const fontSize = rect.height / actualRows;
      const cellWidth = fontSize * 0.78;
      const columns = Math.max(32, Math.ceil(rect.width / cellWidth));
      const sample = document.createElement('canvas');
      sample.width = columns;
      sample.height = actualRows;
      const sampleContext = sample.getContext('2d', { willReadFrequently: true });
      if (!sampleContext) return;
      const targetAspect = rect.width / rect.height;
      const imageAspect = image.naturalWidth / image.naturalHeight;
      const sourceWidth = imageAspect > targetAspect ? image.naturalHeight * targetAspect : image.naturalWidth;
      const sourceHeight = imageAspect > targetAspect ? image.naturalHeight : image.naturalWidth / targetAspect;
      const sourceX = (image.naturalWidth - sourceWidth) / 2;
      const sourceY = Math.min(image.naturalHeight - sourceHeight, Math.max(0, (image.naturalHeight - sourceHeight) * focusY));

      if (photoOpacity > 0) {
        context.globalAlpha = photoOpacity;
        context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, rect.width, rect.height);
        context.globalAlpha = 1;
      }

      const glow = context.createRadialGradient(rect.width * 0.5, rect.height * 0.42, 0, rect.width * 0.5, rect.height * 0.42, rect.width * 0.65);
      glow.addColorStop(0, '#31104c55');
      glow.addColorStop(0.55, '#0e173155');
      glow.addColorStop(1, '#07051200');
      context.fillStyle = glow;
      context.fillRect(0, 0, rect.width, rect.height);

      sampleContext.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, columns, actualRows);
      const pixels = sampleContext.getImageData(0, 0, columns, actualRows).data;
      context.globalAlpha = dotOpacity;

      for (let y = 0; y < actualRows; y++) {
        for (let x = 0; x < columns; x++) {
          const offset = (y * columns + x) * 4;
          const red = pixels[offset];
          const green = pixels[offset + 1];
          const blue = pixels[offset + 2];
          const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
          const level = clamp((Math.pow(luminance, 0.92) - 0.5) * contrast + 0.5 + brightness);
          const size = Math.max(0.55, fontSize * (0.1 + Math.pow(level, 0.72) * 0.82));
          const centerX = x * cellWidth + cellWidth / 2;
          const centerY = y * fontSize + fontSize / 2;

          if (level > 0.74) context.fillStyle = '#ddfbff';
          else if (level > 0.46) context.fillStyle = '#ff4da6';
          else if (level > 0.22) context.fillStyle = (x + y) % 3 === 0 ? '#22d3ee' : '#ff4da6';
          else context.fillStyle = '#6d28d9';

          context.globalAlpha = dotOpacity * (level < 0.08 ? 0.32 : 0.92);
          context.fillRect(centerX - size / 2, centerY - size / 2, size, size);
        }
      }

      context.globalAlpha = 1;
    };

    const scheduleDraw = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };

    image.onload = () => {
      if (cancelled) return;
      draw();
      observer = new ResizeObserver(scheduleDraw);
      observer.observe(canvas);
    };
    image.onerror = () => {
      if (cancelled) return;
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = background;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    };
    image.src = src;

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      image.onload = null;
      image.onerror = null;
    };
  }, [src, rows, className, contrast, brightness, photoOpacity, dotOpacity, focusY, background]);

  return <canvas ref={canvasRef} className={`realistic-ascii ${className}`} role="img" aria-label={alt}/>;
}
