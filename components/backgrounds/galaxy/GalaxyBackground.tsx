import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface GalaxyBackgroundProps extends Partial<CanvasEngineProps> {}

export const GalaxyBackground: React.FC<GalaxyBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="galaxy"
      speed={0.6}
      glow={1.2}
      particleCount={900}
      colors={["#ffffff","#fef08a","#38bdf8","#818cf8","#c084fc","#f472b6"]}
      {...props}
    />
  );
};

export const Galaxy = GalaxyBackground;
export default GalaxyBackground;
