import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface GradientTextProps extends Partial<TextEngineProps> {}

export const GradientText: React.FC<GradientTextProps> = (props) => {
  return (
    <TextEngine
      type="gradient"
      text="Fluid Chromatic Energy"
      speed={1}
      fontSize="2.5rem"
      fontWeight="900"
      
      {...props}
    />
  );
};

export default GradientText;
