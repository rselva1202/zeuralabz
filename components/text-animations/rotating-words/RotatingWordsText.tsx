import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface RotatingWordsTextProps extends Partial<TextEngineProps> {}

export const RotatingWordsText: React.FC<RotatingWordsTextProps> = (props) => {
  return (
    <TextEngine
      type="rotating"
      text="FUTURISTIC"
      speed={1}
      fontSize="2.5rem"
      fontWeight="900"
      words={["FUTURISTIC","POWERFUL","LIGHTNING","ADAPTIVE"]}
      {...props}
    />
  );
};

export const RotatingWords = RotatingWordsText;
export default RotatingWordsText;
