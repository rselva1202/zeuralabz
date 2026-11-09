import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface SplitTextProps extends Partial<TextEngineProps> {}

export const SplitText: React.FC<SplitTextProps> = (props) => {
  return (
    <TextEngine
      type="split"
      text="ZEURALABZ"
      speed={1}
      fontSize="2.5rem"
      fontWeight="900"
      
      {...props}
    />
  );
};

export default SplitText;
