import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface PillButtonProps extends Partial<BaseButtonProps> {}

export const PillButton: React.FC<PillButtonProps> = (props) => {
  return (
    <BaseButton
      variant="pill"
      text="Sleek Capsule"
      {...props}
    />
  );
};

export const Pill = PillButton;
export default PillButton;
