import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface RevealTextProps extends Partial<TextEngineProps> {}

export const RevealText: React.FC<RevealTextProps> = (props) => {
  return (
    <TextEngine
      type="reveal"
      text="UNVEILED BEAUTY"
      speed={1}
      fontSize="2.5rem"
      fontWeight="900"
      
      {...props}
    />
  );
};

export default RevealText;
