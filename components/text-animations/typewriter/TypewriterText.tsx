import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface TypewriterTextProps extends Partial<TextEngineProps> {}

export const TypewriterText: React.FC<TypewriterTextProps> = (props) => {
  return (
    <TextEngine
      type="typewriter"
      text="Next-Gen UI Systems"
      speed={1}
      fontSize="2rem"
      fontWeight="900"
      
      {...props}
    />
  );
};

export const Typewriter = TypewriterText;
export default TypewriterText;
