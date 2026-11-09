import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface ShinyTextProps extends Partial<TextEngineProps> {}

export const ShinyText: React.FC<ShinyTextProps> = (props) => {
  return (
    <TextEngine
      type="shiny"
      text="METALLIC SHEEN"
      speed={1}
      fontSize="2.5rem"
      fontWeight="900"
      
      {...props}
    />
  );
};

export const Shiny = ShinyText;
export default ShinyText;
