import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface StarfieldBackgroundProps extends Partial<CanvasEngineProps> {}

export const StarfieldBackground: React.FC<StarfieldBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="starfield"
      speed={0.7}
      glow={1.2}
      particleCount={750}
      colors={["#ffffff","#fef08a","#a5f3fc","#e0e7ff","#c7d2fe"]}
      {...props}
    />
  );
};

export const Starfield = StarfieldBackground;
export default StarfieldBackground;
