import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface BounceLettersTextProps extends Partial<TextEngineProps> {}

export const BounceLettersText: React.FC<BounceLettersTextProps> = (props) => {
  return (
    <TextEngine
      type="bounce"
      text="BOUNCING ENERGY"
      speed={1}
      fontSize="2.25rem"
      fontWeight="900"
      
      {...props}
    />
  );
};

export const BounceLetters = BounceLettersText;
export default BounceLettersText;
