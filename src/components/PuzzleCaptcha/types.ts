import {RefObject} from 'react';

export interface PuzzleCaptchaProps {
    image: string;
    cols: number;
    rows: number;
    width?: number;
    onVerify?: () => void;
    inputName?: string;
    token?: string;
    className?: string;
  }
  
  export interface WrapperProps {
    width?: number;
  }

export type CellRefsType = Array<Array<RefObject<HTMLButtonElement>>>;
