import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface ParticlesBackgroundProps extends Partial<CanvasEngineProps> {}

export const ParticlesBackground: React.FC<ParticlesBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="particles"
      speed={0.8}
      glow={1.2}
      particleCount={140}
      colors={["#38bdf8","#818cf8","#c084fc","#ffffff"]}
      {...props}
    />
  );
};

export const Particles = ParticlesBackground;
export default ParticlesBackground;
