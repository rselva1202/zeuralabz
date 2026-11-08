import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface AuroraBackgroundProps extends Partial<CanvasEngineProps> {}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = (props) => {
  return (
    <CanvasEngine
      type="aurora"
      speed={0.8}
      glow={1.3}
      particleCount={800}
      colors={["#06b6d4","#3b82f6","#6366f1","#a855f7","#ec4899","#10b981"]}
      {...props}
    />
  );
};

export const Aurora = AuroraBackground;
export default AuroraBackground;
