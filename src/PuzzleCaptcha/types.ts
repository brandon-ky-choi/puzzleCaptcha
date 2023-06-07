import {ReactNode, RefObject} from 'react';

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

export interface PuzzleCaptchaContextDataType extends PuzzleCaptchaProps {
  boxSize: { width: number; height: number };
  isReady: boolean;
  isError: boolean;
  isSolved: boolean;
  randomNo: { col: number; row: number };
}

export interface PuzzleCaptchaContextType {
  data: PuzzleCaptchaContextDataType;
  setPuzzleCaptchaContext: (key: string, value: any) => void;
}

export interface PuzzleCaptchaContextProviderType {
  data: PuzzleCaptchaContextDataType;
  children: ReactNode;
}