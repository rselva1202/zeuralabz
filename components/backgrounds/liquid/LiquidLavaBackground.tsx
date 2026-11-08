import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface LiquidLavaBackgroundProps extends Partial<CanvasEngineProps> {}

export const LiquidLavaBackground: React.FC<LiquidLavaBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="liquid"
      speed={0.8}
      glow={1.3}
      particleCount={800}
      colors={["#ec4899","#f43f5e","#8b5cf6","#6366f1","#fb923c"]}
      {...props}
    />
  );
};

export const Liquid = LiquidLavaBackground;
export default LiquidLavaBackground;
