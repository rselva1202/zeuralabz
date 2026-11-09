import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface FadeUpTextProps extends Partial<TextEngineProps> {}

export const FadeUpText: React.FC<FadeUpTextProps> = (props) => {
  return (
    <TextEngine
      type="fade-up"
      text="CINEMATIC SCALE"
      speed={1}
      fontSize="2.5rem"
      fontWeight="900"
      
      {...props}
    />
  );
};

export const FadeUp = FadeUpText;
export default FadeUpText;
