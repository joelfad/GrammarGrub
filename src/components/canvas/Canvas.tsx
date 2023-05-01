import { useEffect, useRef } from 'react';
import classes from './Canvas.module.scss';

/**
 * linear easing function
 * https://spicyyoghurt.com/tools/easing-functions
 *
 * t: time (dynamic)
 * b: beginning value, c: change in value, d: duration (all static values)
 */
function easeLinear(t: number, b: number, c: number, d:number): number {
  return c * (t / d) + b;
}

const startX = 0;
const startY = 0;
const maxX = 600;
const maxY = 300;

let timePassed = 0;
let rectX = startX;
let rectY = startY;

/**
 * Update positions
 */
function update(secondsPassed: number) {
  timePassed += secondsPassed;
  rectX = easeLinear(timePassed, 0, maxX, 4);
  rectY = easeLinear(timePassed, 0, maxY, 4);

  // reset
  if (timePassed > 5) {
    timePassed = 0;
    rectX = startX;
    rectY = startY;
  }
}

/**
 * Redraw canvas
 */
function draw(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, secondsPassed: number) {
  // clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw rectangle
  const randomColor = Math.random() > 0.5 ? '#ff8080' : '#0099b0';
  context.fillStyle = randomColor;
  context.fillRect(rectX, rectY, 300, 200);

  // calculate and draw framerate
  const fps = Math.round(1 / secondsPassed);
  context.fillStyle = 'white';
  context.fillRect(0, 0, 200, 100);
  context.font = '25px Arial';
  context.fillStyle = 'black';
  context.fillText(`FPS: ${fps}`, 10, 30);
  context.fillText(`X: ${Math.round(rectX)} Y: ${Math.round(rectY)}`, 10, 60);
}

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationFrameId = 0;
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas !== null) {
      const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
      if (context !== null) {
        let prevTimeStamp = 0;
        const gameLoop = (timeStamp: DOMHighResTimeStamp) => {
          let secondsPassed = (timeStamp - prevTimeStamp) / 1000;
          secondsPassed = Math.min(secondsPassed, 0.1); // limit time skip
          prevTimeStamp = timeStamp;
          update(secondsPassed);
          draw(context, canvas, secondsPassed);
          animationFrameId = window.requestAnimationFrame(gameLoop);
        };
        window.requestAnimationFrame(gameLoop);
      }
    }
    return window.cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas ref={canvasRef} width="750" height="400" className={classes.canvas} />
  );
}
