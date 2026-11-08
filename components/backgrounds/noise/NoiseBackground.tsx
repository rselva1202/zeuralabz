import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface NoiseBackgroundProps extends Partial<CanvasEngineProps> {}

export const NoiseBackground: React.FC<NoiseBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="noise"
      speed={1}
      glow={1.1}
      particleCount={800}
      colors={["#6366f1","#8b5cf6","#ec4899","#06b6d4"]}
      {...props}
    />
  );
};

export const Noise = NoiseBackground;
export default NoiseBackground;
