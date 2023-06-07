import { useState } from "react";
import {
  PuzzleCaptchaContextDataType,
  PuzzleCaptchaContextProviderType,
} from "../types";
import { PuzzleCaptchaContext } from "../const";

const PuzzleCaptchaContextProvider = ({
  data,
  children,
}: PuzzleCaptchaContextProviderType) => {
  const [puzzleCaptchaContext, setPuzzleCaptchaContext] =
    useState<PuzzleCaptchaContextDataType>(data);

  const handlesetPuzzleCaptchaContext = (key: string, value: any) => {
    setPuzzleCaptchaContext({ ...puzzleCaptchaContext, [key]: value });
  };

  return (
    <PuzzleCaptchaContext.Provider
      value={{
        data: puzzleCaptchaContext,
        setPuzzleCaptchaContext: handlesetPuzzleCaptchaContext,
      }}
    >
      {children}
    </PuzzleCaptchaContext.Provider>
  );
};

export default PuzzleCaptchaContextProvider;
