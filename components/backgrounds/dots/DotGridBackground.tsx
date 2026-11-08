import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface DotGridBackgroundProps extends Partial<CanvasEngineProps> {}

export const DotGridBackground: React.FC<DotGridBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="dots"
      speed={0.9}
      glow={1.2}
      particleCount={600}
      colors={["#38bdf8","#818cf8","#6366f1"]}
      {...props}
    />
  );
};

export const Dots = DotGridBackground;
export default DotGridBackground;
