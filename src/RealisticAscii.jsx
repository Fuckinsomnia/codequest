import { useEffect, useRef } from 'react';

const ramp = ' .:-=+*#%@';
const clamp = value => Math.min(255, Math.max(0, value));

export default function RealisticAscii({
  src,
  alt,
  rows = 36,
  className = '',
  contrast = 1.18,
  brightness = 0,
  saturation = 1.12,
  photoOpacity = 0.5,
  asciiOpacity = 0.52,
  focusY = 0.5,
  background = '#020617',
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

      const actualRows = Math.max(12, Math.round(rows));
      const fontSize = rect.height / actualRows;
      const cellWidth = fontSize * 0.62;
      const columns = Math.max(24, Math.ceil(rect.width / cellWidth));
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
      context.globalAlpha = photoOpacity;
      context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, rect.width, rect.height);
      context.globalAlpha = 1;
      context.fillStyle = 'rgba(2,6,23,.3)';
      context.fillRect(0, 0, rect.width, rect.height);
      sampleContext.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, columns, actualRows);
      const pixels = sampleContext.getImageData(0, 0, columns, actualRows).data;

      context.font = `600 ${fontSize}px "Courier New", monospace`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.globalCompositeOperation = 'overlay';
      context.globalAlpha = asciiOpacity;
      for (let y = 0; y < actualRows; y++) {
        for (let x = 0; x < columns; x++) {
          const pixelOffset = (y * columns + x) * 4;
          const red = pixels[pixelOffset];
          const green = pixels[pixelOffset + 1];
          const blue = pixels[pixelOffset + 2];
          const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
          const level = Math.min(1, Math.max(0, (Math.pow(luminance, 1.15) - 0.5) * contrast + 0.5 + brightness));
          const character = ramp[Math.round(level * (ramp.length - 1))];
          if (character === ' ') continue;
          const gray = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
          const sampledRed = clamp(gray + (red - gray) * saturation);
          const sampledGreen = clamp(gray + (green - gray) * saturation);
          const sampledBlue = clamp(gray + (blue - gray) * saturation);
          const ink = luminance > 0.52 ? 0.18 : 1.42;
          const inkOffset = ink < 1 ? 0 : 28;
          context.fillStyle = `rgb(${Math.round(clamp(sampledRed * ink + inkOffset))},${Math.round(clamp(sampledGreen * ink + inkOffset))},${Math.round(clamp(sampledBlue * ink + inkOffset))})`;
          context.fillText(character, x * cellWidth + cellWidth / 2, y * fontSize + fontSize / 2);
        }
      }
      context.globalAlpha = 1;
      context.globalCompositeOperation = 'source-over';
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
  }, [src, rows, className, contrast, brightness, saturation, photoOpacity, asciiOpacity, focusY, background]);

  return <canvas ref={canvasRef} className={`realistic-ascii ${className}`} role="img" aria-label={alt}/>;
}
