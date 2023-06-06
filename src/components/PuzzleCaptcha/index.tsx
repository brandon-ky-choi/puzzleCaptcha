import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Cell, CellWrapper, Piece, Placeholder, Wrapper } from "./styled";
import { CellRefsType, PuzzleCaptchaProps } from "./types";

interface PuzzleCaptchaContextDataType extends PuzzleCaptchaProps {
  boxSize: { width: number; height: number };
  isReady: boolean;
  isError: boolean;
  isSolved: boolean;
  randomNo: { col: number; row: number };
}

const DefaultPuzzleCaptchaContext = {
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

interface PuzzleCaptchaContextType {
  data: PuzzleCaptchaContextDataType;
  setPuzzleCaptchaContext: (key: string, value: any) => void;
}

export const PuzzleCaptchaContext = createContext<PuzzleCaptchaContextType>(
  DefaultPuzzleCaptchaContext
);

interface PuzzleCaptchaContextProviderType {
  data: PuzzleCaptchaContextDataType;
  children: ReactNode;
}

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
    []
  );

  if (cols <= 0 || rows <= 0 || cols > 10 || rows > 10) {
    return (
      <p>
        <b>cols</b> and <b>rows</b> should be 1-10
      </p>
    );
  }

  if (width && width < 100) {
    return (
      <p>
        <b>width</b> should be larger than 100
      </p>
    );
  }

  const initValue = {
    image: image,
    cols: cols,
    rows: rows,
    width: width || 100,
    onVerify: onVerify,
    inputName: inputName || "captcha",
    token: token || "verified",
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

function ImagePlaceholder() {
  const {
    data: { image, isError, isReady },
    setPuzzleCaptchaContext,
  } = useContext(PuzzleCaptchaContext);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    imgRef.current && imgRef.current.setAttribute("src", image);
  }, [image]);

  useEffect(() => {
    if (isReady) {
      const imgElement = imgRef.current;
      if (imgElement) {
        setPuzzleCaptchaContext("boxSize", {
          width: imgElement.width,
          height: imgElement.height,
        });
        const resizeObserver = new ResizeObserver((elements) => {
          elements.map((element) => {
            setPuzzleCaptchaContext("boxSize", {
              width: element.contentRect.width,
              height: element.contentRect.height,
            });
          });
        });
        resizeObserver.observe(imgElement);
        return () => {
          resizeObserver.disconnect();
        };
      }
    }
  }, [isReady]);

  const handleError = () => {
    setPuzzleCaptchaContext("isError", true);
  };

  const handleLoad = () => {
    setPuzzleCaptchaContext("isReady", true);
  };

  if (isError) {
    return <p>Wrong image!</p>;
  }

  return (
    <Placeholder
      className={`placeholder ${isError ? "is-error" : ""}`}
      ref={imgRef}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}

function Input() {
  const {
    data: { inputName, isSolved, token },
  } = useContext(PuzzleCaptchaContext);
  return (
    <input
      type="hidden"
      name={inputName || "captcha"}
      value={isSolved ? token || "verified" : ""}
    />
  );
}

function Cells() {
  const {
    data: { image, isSolved, rows, cols, randomNo, onVerify, boxSize, isReady },
    setPuzzleCaptchaContext,
  } = useContext(PuzzleCaptchaContext);

  const cellsRef: CellRefsType = useCallback(() => {
    const returnRef: CellRefsType = [];
    for (let r = 0; r < rows; r++) {
      returnRef[r] = [];
      for (let c = 0; c < cols; c++) {
        returnRef[r][c] = useRef<HTMLButtonElement>(null);
      }
    }
    return returnRef;
  }, [rows, cols])();

  const handleClick = useCallback(
    (col: number, row: number) => {
      if (col === randomNo.col && row === randomNo.row) {
        setPuzzleCaptchaContext("isSolved", true);
        onVerify && onVerify();
      }
    },
    [randomNo, onVerify]
  );

  const handleKeyDown = useCallback(
    (col: number, row: number, e: React.KeyboardEvent<HTMLButtonElement>) => {
      let colNext = col;
      let rowNext = row;
      switch (e.key) {
        case "ArrowLeft":
          colNext = col !== 0 ? col - 1 : cols - 1;
          break;
        case "ArrowRight":
          colNext = col !== cols - 1 ? col + 1 : 0;
          break;
        case "ArrowUp":
          rowNext = row !== 0 ? row - 1 : rows - 1;
          break;
        case "ArrowDown":
          rowNext = row !== rows - 1 ? row + 1 : 0;
          break;
        default:
          break;
      }
      cellsRef[rowNext][colNext].current?.focus();
    },
    [cols, rows]
  );

  const cellSize = {
    width: 0,
    height: 0,
  };

  cellSize.width = boxSize.width / cols;
  cellSize.height = boxSize.height / rows;

  const Cells: React.ReactElement[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      Cells.push(
        <Cell
          style={{
            width: `${cellSize.width}px`,
            height: `${cellSize.height}px`,
            left: `${cellSize.width * c}px`,
            top: `${cellSize.height * r}px`,
          }}
          onClick={() => handleClick(c, r)}
          key={`Cell-${r}-${c}`}
          type="button"
          disabled={isSolved}
          onKeyDown={(e) => handleKeyDown(c, r, e)}
          ref={cellsRef[r][c]}
        >
          <img
            src={image}
            style={{
              width: `${boxSize.width}px`,
              height: `${boxSize.height}px`,
              left: `${cellSize.width * randomNo.col * -1}px`,
              top: `${cellSize.height * randomNo.row * -1}px`,
            }}
          />
        </Cell>
      );
    }
  }
  Cells.push(
    <Piece style={{ height: cellSize.height }} key="Cell-Answer">
      {React.cloneElement(Cells[0], {
        disabled: true,
      })}
    </Piece>
  );

  if (!isReady) {
    return <></>;
  }

  return <>{Cells}</>;
}

function PuzzleCaptcha() {
  const { data, setPuzzleCaptchaContext } = useContext(PuzzleCaptchaContext);

  const { image, cols, rows, width, className, isReady, isError, isSolved } =
    data;

  useEffect(() => {
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

export default React.memo(PuzzleCaptchaInit);
