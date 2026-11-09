import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface ShimmerButtonProps extends Partial<BaseButtonProps> {}

export const ShimmerButton: React.FC<ShimmerButtonProps> = (props) => {
  return (
    <BaseButton
      variant="shimmer"
      text="Specular Shimmer"
      {...props}
    />
  );
};

export const Shimmer = ShimmerButton;
export default ShimmerButton;
