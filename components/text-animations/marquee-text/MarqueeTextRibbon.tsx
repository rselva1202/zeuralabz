import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface MarqueeTextRibbonProps extends Partial<TextEngineProps> {}

export const MarqueeTextRibbon: React.FC<MarqueeTextRibbonProps> = (props) => {
  return (
    <TextEngine
      type="marquee"
      text="ZEURALABZ • DESIGN MATRIX"
      speed={1}
      fontSize="2rem"
      fontWeight="900"
      
      {...props}
    />
  );
};

export const MarqueeText = MarqueeTextRibbon;
export default MarqueeTextRibbon;
