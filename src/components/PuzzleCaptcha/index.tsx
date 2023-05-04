import React, { useEffect, useRef, useState, useCallback } from "react";

import { PuzzleCaptchaProps, CellRefsType } from "./types";
import { Wrapper, CellWrapper, Cell, Piece } from "./styled";

function PuzzleCaptcha({
  image,
  cols,
  rows,
  width,
  onVerify,
  inputName,
  token,
  className,
}: PuzzleCaptchaProps) {
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [randomNo] = useState({
    col: Math.floor(Math.random() * cols),
    row: Math.floor(Math.random() * rows),
  });

  const imgRef = useRef<HTMLImageElement>(null);
  const cellsRef: CellRefsType = [];

  for (let r = 0; r < rows; r++) {
    cellsRef[r] = [];
    for (let c = 0; c < cols; c++) {
      cellsRef[r][c] = useRef<HTMLButtonElement>(null);
    }
  }

  useEffect(() => {
    setIsReady(false);
    setIsError(false);
    setIsSolved(false);
    imgRef.current && imgRef.current.setAttribute("src", image);
  }, [image, cols, rows, width]);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (imgElement) {
      setBoxSize({
        width: imgElement.width,
        height: imgElement.height,
      });
      const resizeObserver = new ResizeObserver((elements) => {
        elements.map((element) => {
          setBoxSize({
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
  }, []);

  const handleClick = useCallback(
    (col: number, row: number) => {
      if (col === randomNo.col && row === randomNo.row) {
        setIsSolved(true);
        onVerify && onVerify();
      }
    },
    [randomNo.col, randomNo.row, onVerify]
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
    []
  );

  const handleError = () => {
    setIsError(true);
  };

  const handleLoad = () => {
    setIsReady(true);
  };

  if (cols <= 0 || rows <= 0 || cols > 10 || rows > 10) {
    return <p>cols and rows should be 1-10</p>;
  }

  if (width && width < 100) {
    return <p>width should be larger than 100</p>;
  }

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

  return (
    <Wrapper
      width={width}
      className={`${className ?? ""} ${isSolved ? "is-solved" : ""}`}
    >
      {isReady && !isError && (
        <Piece style={{ height: cellSize.height }}>
          {React.cloneElement(Cells[0], { disabled: true })}
        </Piece>
      )}
      <CellWrapper className="cellWrapper">
        <img
          //   src={image}
          className={`placeholder ${isError ? "is-error" : ""}`}
          ref={imgRef}
          onError={handleError}
          onLoad={handleLoad}
        />
        {isError && <p>Wrong Image</p>}
        {isReady && Cells}
      </CellWrapper>

      <input
        type="hidden"
        name={inputName || "captcha"}
        value={isSolved ? token || "verified" : ""}
      />
    </Wrapper>
  );
}

export default PuzzleCaptcha;
