import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface GradientButtonProps extends Partial<BaseButtonProps> {}

export const GradientButton: React.FC<GradientButtonProps> = (props) => {
  return (
    <BaseButton
      variant="gradient"
      text="Iridescent Flow"
      {...props}
    />
  );
};

export const Gradient = GradientButton;
export default GradientButton;
