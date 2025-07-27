import React, { useCallback, useContext, useRef } from "react";
import { PuzzleCaptchaContext } from "../const";
import { CellRefsType } from "../types";
import { Cell, Piece } from "../styled";

function Cells() {
  const {
    data: { image, isSolved, rows, cols, randomNo, onVerify, boxSize, isReady },
    setPuzzleCaptchaContext,
  } = useContext(PuzzleCaptchaContext);

  const { width: boxWidth, height: boxHeight } = boxSize;

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
    [randomNo, onVerify],
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
    [cols, rows],
  );

  const cellSize = useCallback(() => {
    return { width: boxWidth / cols, height: boxHeight / rows };
  }, [boxWidth, boxHeight, cols, rows])();

  const { width: cellWidth, height: cellHeight } = cellSize;
  const { col, row } = randomNo;

  const Cells: React.ReactElement[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      Cells.push(
        <Cell
          style={{
            width: `${cellWidth}px`,
            height: `${cellHeight}px`,
            left: `${cellWidth * c}px`,
            top: `${cellHeight * r}px`,
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
              width: `${boxWidth}px`,
              height: `${boxHeight}px`,
              left: `${cellWidth * col * -1}px`,
              top: `${cellHeight * row * -1}px`,
            }}
          />
        </Cell>,
      );
    }
  }

  const CellAnswer = React.cloneElement(
    (() => {
      const { ...props } = (Cells[0] as React.ReactElement).props;
      return <Cell {...props} disabled={true} ref={null} />;
    })(),
  );

  Cells.push(
    <Piece style={{ height: cellHeight }} key="Cell-Answer">
      {CellAnswer}
    </Piece>,
  );

  if (!isReady) {
    return <></>;
  }

  return <>{Cells}</>;
}

export default Cells;
