import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface HexagonBackgroundProps extends Partial<CanvasEngineProps> {}

export const HexagonBackground: React.FC<HexagonBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="hexagon"
      speed={0.8}
      glow={1.3}
      particleCount={800}
      colors={["#06b6d4","#38bdf8","#818cf8","#a855f7"]}
      {...props}
    />
  );
};

export const Hexagon = HexagonBackground;
export default HexagonBackground;
