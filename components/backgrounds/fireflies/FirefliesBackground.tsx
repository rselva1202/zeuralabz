import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface FirefliesBackgroundProps extends Partial<CanvasEngineProps> {}

export const FirefliesBackground: React.FC<FirefliesBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="fireflies"
      speed={0.8}
      glow={1.4}
      particleCount={130}
      colors={["#fef08a","#84cc16","#22c55e","#38bdf8","#facc15"]}
      {...props}
    />
  );
};

export const Fireflies = FirefliesBackground;
export default FirefliesBackground;
