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

  const setPuzzleCaptchaContextValue = (
    key: string,
    value: string | number
  ) => {
    setPuzzleCaptchaContext((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <PuzzleCaptchaContext.Provider
      value={{
        data: puzzleCaptchaContext,
        setPuzzleCaptchaContext: setPuzzleCaptchaContextValue,
      }}
    >
      {children}
    </PuzzleCaptchaContext.Provider>
  );
};

export default PuzzleCaptchaContextProvider;
