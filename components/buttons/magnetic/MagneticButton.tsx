import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface MagneticButtonProps extends Partial<BaseButtonProps> {}

export const MagneticButton: React.FC<MagneticButtonProps> = (props) => {
  return (
    <BaseButton
      variant="magnetic"
      text="Cursor Gravity"
      {...props}
    />
  );
};

export const Magnetic = MagneticButton;
export default MagneticButton;
