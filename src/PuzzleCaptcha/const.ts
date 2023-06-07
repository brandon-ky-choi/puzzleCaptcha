import { createContext } from "react";
import { PuzzleCaptchaContextType } from "./types";

export const DefaultPuzzleCaptchaContext = {
    data: {
      image: "",
      cols: 1,
      rows: 1,
      boxSize: { width: 0, height: 0 },
      isReady: false,
      isError: false,
      isSolved: false,
      randomNo: { col: 0, row: 0 },
    },
    setPuzzleCaptchaContext: (_key: string, _value: any) => {},
  };

  export const PuzzleCaptchaContext = createContext<PuzzleCaptchaContextType>(
    DefaultPuzzleCaptchaContext
  );

export const DefaultInputName = 'captcha';
export const DefaultToken = 'verified';
export const DefaultMinWidth = 100;
export const MaxColsRows = 10;