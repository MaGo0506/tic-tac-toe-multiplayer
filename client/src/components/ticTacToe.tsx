import React, { useState } from "react";
import styled from "styled-components";

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Zen Tokyo Zoo", cursive;
  position: relative;
`;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
`;

interface ICellProps {
  borderTop?: boolean;
  borderRight?: boolean;
  borderLeft?: boolean;
  borderBottom?: boolean;
}

const Cell = styled.div<ICellProps>`
  width: 13em;
  height: 9em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-top: ${({ borderTop }) => borderTop && "3px solid #8e44ad"};
  border-left: ${({ borderLeft }) => borderLeft && "3px solid #8e44ad"};
  border-bottom: ${({ borderBottom }) => borderBottom && "3px solid #8e44ad"};
  border-right: ${({ borderRight }) => borderRight && "3px solid #8e44ad"};
  transition: all 270ms ease-in-out;

  &:hover {
    background-color: #8d44ad28;
  }
`;

const PlayStopper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  cursor: default;
`;

const X = styled.span`
  font-size: 100px;
  color: #000;
  &::after {
    content: "X";
  }
`;

const O = styled.span`
  font-size: 100px;
  color: #8e44ad;
  &::after {
    content: "O";
  }
`;

export type PlayMatrix = Array<Array<string | null>>;

const TicTacToe = () => {
  const [matrix, setMatrix] = useState<PlayMatrix>([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);

  return (
    <GameContainer>
      {matrix.map((row, rowId) => {
        return (
          <RowContainer key={rowId}>
            {row.map((column, columnId) => (
              <Cell
                key={columnId}
                borderRight={columnId < 2}
                borderLeft={columnId > 0}
                borderBottom={rowId < 2}
                borderTop={rowId > 0}
              >
                {column && column !== "null" ? column === "x" ? <X /> : <O /> : null}
              </Cell>
            ))}
          </RowContainer>
        )
      })}
    </GameContainer>
  )
}

export default TicTacToe;