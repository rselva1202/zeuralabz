import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface SocialButtonProps extends Partial<BaseButtonProps> {}

export const SocialButton: React.FC<SocialButtonProps> = (props) => {
  return (
    <BaseButton
      variant="social"
      text="GitHub Star"
      {...props}
    />
  );
};

export const Social = SocialButton;
export default SocialButton;
