import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface MeshGradientBackgroundProps extends Partial<CanvasEngineProps> {}

export const MeshGradientBackground: React.FC<MeshGradientBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="gradient"
      speed={0.7}
      glow={1.3}
      particleCount={800}
      colors={["#312e81","#4c1d95","#0c4a6e","#701a75","#1e1b4b"]}
      {...props}
    />
  );
};

export const Gradient = MeshGradientBackground;
export default MeshGradientBackground;
