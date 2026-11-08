import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface WavesBackgroundProps extends Partial<CanvasEngineProps> {}

export const WavesBackground: React.FC<WavesBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="waves"
      speed={0.9}
      glow={1.3}
      particleCount={800}
      colors={["#06b6d4","#3b82f6","#8b5cf6","#ec4899"]}
      {...props}
    />
  );
};

export const Waves = WavesBackground;
export default WavesBackground;
