import { useCallback, useContext, useRef } from "react";
import { PuzzleCaptchaContext } from "../const";
import { CellRefsType } from "../types";
import { Cell, Piece } from "../styled";
import React from "react";

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

  const cellSize = useCallback(() => {
    return { width: boxSize.width / cols, height: boxSize.height / rows };
  }, [boxSize, cols, rows])();

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

export default Cells;
