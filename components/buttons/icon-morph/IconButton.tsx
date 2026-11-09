import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface IconButtonProps extends Partial<BaseButtonProps> {}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <BaseButton
      variant="icon"
      text="Creative Spark"
      {...props}
    />
  );
};

export const Icon = IconButton;
export default IconButton;
