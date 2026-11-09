import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface ThreeDButtonProps extends Partial<BaseButtonProps> {}

export const ThreeDButton: React.FC<ThreeDButtonProps> = (props) => {
  return (
    <BaseButton
      variant="3d"
      text="3D Tactile Push"
      {...props}
    />
  );
};

export const ThreeD = ThreeDButton;
export default ThreeDButton;
