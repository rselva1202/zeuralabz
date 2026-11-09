import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface DownloadButtonProps extends Partial<BaseButtonProps> {}

export const DownloadButton: React.FC<DownloadButtonProps> = (props) => {
  return (
    <BaseButton
      variant="download"
      text="Download Asset"
      {...props}
    />
  );
};

export const Download = DownloadButton;
export default DownloadButton;
