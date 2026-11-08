import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface NebulaBackgroundProps extends Partial<CanvasEngineProps> {}

export const NebulaBackground: React.FC<NebulaBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="nebula"
      speed={0.6}
      glow={1.3}
      particleCount={800}
      colors={["#c084fc","#f472b6","#38bdf8","#818cf8","#fef08a"]}
      {...props}
    />
  );
};

export const Nebula = NebulaBackground;
export default NebulaBackground;
