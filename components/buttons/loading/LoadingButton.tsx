import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface LoadingButtonProps extends Partial<BaseButtonProps> {}

export const LoadingButton: React.FC<LoadingButtonProps> = (props) => {
  return (
    <BaseButton
      variant="loading"
      text="Async Action"
      {...props}
    />
  );
};

export const Loading = LoadingButton;
export default LoadingButton;
