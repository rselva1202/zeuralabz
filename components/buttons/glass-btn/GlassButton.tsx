import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface GlassButtonProps extends Partial<BaseButtonProps> {}

export const GlassButton: React.FC<GlassButtonProps> = (props) => {
  return (
    <BaseButton
      variant="glass-btn"
      text="Liquid Glass"
      {...props}
    />
  );
};

export const Glass = GlassButton;
export default GlassButton;
