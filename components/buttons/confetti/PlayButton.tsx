import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface PlayButtonProps extends Partial<BaseButtonProps> {}

export const PlayButton: React.FC<PlayButtonProps> = (props) => {
  return (
    <BaseButton
      variant="play"
      text="Play Video"
      {...props}
    />
  );
};

export const Play = PlayButton;
export default PlayButton;
