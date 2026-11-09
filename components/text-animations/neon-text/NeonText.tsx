import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface NeonTextProps extends Partial<TextEngineProps> {}

export const NeonText: React.FC<NeonTextProps> = (props) => {
  return (
    <TextEngine
      type="neon"
      text="ELECTRIC GLOW"
      speed={1}
      fontSize="2.5rem"
      fontWeight="900"
      
      {...props}
    />
  );
};

export default NeonText;
