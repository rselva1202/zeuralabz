import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface NeonButtonProps extends Partial<BaseButtonProps> {}

export const NeonButton: React.FC<NeonButtonProps> = (props) => {
  return (
    <BaseButton
      variant="neon"
      text="Cyber Neon Pulse"
      {...props}
    />
  );
};

export const Neon = NeonButton;
export default NeonButton;
