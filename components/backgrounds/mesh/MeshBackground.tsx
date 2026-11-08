import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface MeshBackgroundProps extends Partial<CanvasEngineProps> {}

export const MeshBackground: React.FC<MeshBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="mesh"
      speed={0.8}
      glow={1.2}
      particleCount={130}
      colors={["#38bdf8","#818cf8","#c084fc"]}
      {...props}
    />
  );
};

export const Mesh = MeshBackground;
export default MeshBackground;
