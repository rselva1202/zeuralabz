import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface BlurTextProps extends Partial<TextEngineProps> {}

export const BlurText: React.FC<BlurTextProps> = (props) => {
  return (
    <TextEngine
      type="blur"
      text="Crystalline Focus"
      speed={1}
      fontSize="2.5rem"
      fontWeight="900"
      
      {...props}
    />
  );
};

export default BlurText;
