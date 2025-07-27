import { useCallback, useContext, useEffect } from "react";

import { CellWrapper, Wrapper } from "./styled";

import { PuzzleCaptchaProps } from "./types";

import {
  DefaultInputName,
  DefaultMinWidth,
  DefaultToken,
  MaxColsRows,
  PuzzleCaptchaContext,
} from "./const";

import PuzzleCaptchaContextProvider from "./components/PuzzleCaptchaContextProvider";
import ImagePlaceholder from "./components/ImagePlaceholder";
import Input from "./components/Input";
import Cells from "./components/Cells";

// basic value check, set default context
function PuzzleCaptchaInit({
  image,
  cols,
  rows,
  width,
  onVerify,
  inputName,
  token,
  className,
}: PuzzleCaptchaProps) {
  const getRandomNo = useCallback(
    (maxNo: number) => Math.floor(Math.random() * maxNo),
    [],
  );

  if (cols <= 0 || rows <= 0 || cols > MaxColsRows || rows > MaxColsRows) {
    return (
      <p>
        <b>cols</b> and <b>rows</b> should be <b>1~{MaxColsRows}</b>
      </p>
    );
  }

  if (width && width < DefaultMinWidth) {
    return (
      <p>
        <b>width</b> should be larger than <b>{DefaultMinWidth}px</b>
      </p>
    );
  }

  const initValue = {
    image: image,
    cols: cols,
    rows: rows,
    width: width || DefaultMinWidth,
    onVerify: onVerify,
    inputName: inputName || DefaultInputName,
    token: token || DefaultToken,
    className: className || "",
    boxSize: { width: 0, height: 0 },
    isReady: false,
    isError: false,
    isSolved: false,
    randomNo: { col: getRandomNo(cols), row: getRandomNo(rows) },
  };

  return (
    <PuzzleCaptchaContextProvider data={initValue}>
      <PuzzleCaptcha />
    </PuzzleCaptchaContextProvider>
  );
}

function PuzzleCaptcha() {
  const {
    data: { image, cols, rows, width, className, isReady, isError, isSolved },
    setPuzzleCaptchaContext,
  } = useContext(PuzzleCaptchaContext);

  useEffect(() => {
    // reset if any critical value change
    isReady && setPuzzleCaptchaContext("isReady", false);
    isError && setPuzzleCaptchaContext("isError", false);
    isSolved && setPuzzleCaptchaContext("isSolved", false);
  }, [cols, rows, width, image]);

  return (
    <Wrapper
      width={width}
      className={`${className ?? ""} ${isSolved ? "is-solved" : ""}`}
    >
      <CellWrapper className="cellWrapper">
        <ImagePlaceholder />
        <Cells />
      </CellWrapper>

      <Input />
    </Wrapper>
  );
}

export default PuzzleCaptchaInit;
