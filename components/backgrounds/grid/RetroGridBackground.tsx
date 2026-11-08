import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface RetroGridBackgroundProps extends Partial<CanvasEngineProps> {}

export const RetroGridBackground: React.FC<RetroGridBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="grid"
      speed={0.9}
      glow={1.3}
      particleCount={800}
      colors={["#06b6d4","#6366f1","#a855f7"]}
      {...props}
    />
  );
};

export const Grid = RetroGridBackground;
export default RetroGridBackground;
