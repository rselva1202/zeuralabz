import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface OutlineFillButtonProps extends Partial<BaseButtonProps> {}

export const OutlineFillButton: React.FC<OutlineFillButtonProps> = (props) => {
  return (
    <BaseButton
      variant="outline-fill"
      text="Prism Sweep"
      {...props}
    />
  );
};

export const OutlineFill = OutlineFillButton;
export default OutlineFillButton;
