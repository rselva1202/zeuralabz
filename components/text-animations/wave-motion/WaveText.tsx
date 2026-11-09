import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface WaveTextProps extends Partial<TextEngineProps> {}

export const WaveText: React.FC<WaveTextProps> = (props) => {
  return (
    <TextEngine
      type="wave"
      text="OCEANIC RHYTHM"
      speed={1}
      fontSize="2.25rem"
      fontWeight="900"
      
      {...props}
    />
  );
};

export default WaveText;
