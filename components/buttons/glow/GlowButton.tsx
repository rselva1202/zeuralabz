import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface GlowButtonProps extends Partial<BaseButtonProps> {}

export const GlowButton: React.FC<GlowButtonProps> = (props) => {
  return (
    <BaseButton
      variant="glow"
      text="Ambient Radiant Glow"
      {...props}
    />
  );
};

export const Glow = GlowButton;
export default GlowButton;
