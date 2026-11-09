import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface ArrowButtonProps extends Partial<BaseButtonProps> {}

export const ArrowButton: React.FC<ArrowButtonProps> = (props) => {
  return (
    <BaseButton
      variant="arrow"
      text="Launch Matrix"
      {...props}
    />
  );
};

export const Arrow = ArrowButton;
export default ArrowButton;
