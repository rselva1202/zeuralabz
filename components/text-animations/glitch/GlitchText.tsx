import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface GlitchTextProps extends Partial<TextEngineProps> {}

export const GlitchText: React.FC<GlitchTextProps> = (props) => {
  return (
    <TextEngine
      type="glitch"
      text="CYBER_ANOMALY"
      speed={1}
      fontSize="2.5rem"
      fontWeight="900"
      
      {...props}
    />
  );
};

export const Glitch = GlitchText;
export default GlitchText;
