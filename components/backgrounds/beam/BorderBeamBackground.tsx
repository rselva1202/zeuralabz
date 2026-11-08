import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface BorderBeamBackgroundProps extends Partial<CanvasEngineProps> {}

export const BorderBeamBackground: React.FC<BorderBeamBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="beam"
      speed={1}
      glow={1.4}
      particleCount={800}
      colors={["#06b6d4","#6366f1","#ec4899"]}
      {...props}
    />
  );
};

export const Beam = BorderBeamBackground;
export default BorderBeamBackground;
