import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface CounterRollTextProps extends Partial<TextEngineProps> {}

export const CounterRollText: React.FC<CounterRollTextProps> = (props) => {
  return (
    <TextEngine
      type="counter"
      text="9,840"
      speed={1}
      fontSize="2.75rem"
      fontWeight="900"
      targetNumber={9840}
      {...props}
    />
  );
};

export const CounterRoll = CounterRollText;
export default CounterRollText;
