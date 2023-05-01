import { useEffect, useRef } from 'react';
import classes from './Canvas.module.scss';

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current != null) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context != null) {
        context.fillStyle = '#ff00ff';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      }
    }
  }, []);

  return (
    <>
      <div className={classes.text}>
        I am a canvas.
      </div>
      <canvas ref={canvasRef} width="500" height="300" />
    </>
  );
}
