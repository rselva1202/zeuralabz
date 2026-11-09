import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface ScrambleTextProps extends Partial<TextEngineProps> {}

export const ScrambleText: React.FC<ScrambleTextProps> = (props) => {
  return (
    <TextEngine
      type="scramble"
      text="SYSTEM_OVERRIDE_01"
      speed={1}
      fontSize="1.85rem"
      fontWeight="900"
      
      {...props}
    />
  );
};

export const Scramble = ScrambleText;
export default ScrambleText;
