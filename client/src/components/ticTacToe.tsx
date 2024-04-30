import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import gameContext from "../gameContext";
import GameServiceClass from "../services/socketService/gameService";
import SocketServiceClass from "../services/socketService";

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
export interface StartGame {
  start: boolean;
  symbol: "x" | "o";
}

const TicTacToe = () => {
  const [matrix, setMatrix] = useState<PlayMatrix>([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);

  const {
    playerSymbol,
    setPlayerSymbol,
    setPlayerTurn,
    isPlayerTurn,
    setGameStarted,
    isGameStarted
  } = useContext(gameContext);

  const checkGameState = (matrix: PlayMatrix) => {
    for (let i = 0; i < matrix.length; i++) {
      let row = [];
      for (let j = 0; j < matrix[i].length; j++) {
        row.push(matrix[i][j]);
      }

      if (row.every((value) => value && value === playerSymbol)) {
        return [true, false];
      } else if (row.every((value) => value && value !== playerSymbol)) {
        return [false, true];
      }
    }

    for (let i = 0; i < matrix.length; i++) {
      let column = [];
      for (let j = 0; j < matrix[i].length; j++) {
        column.push(matrix[j][i]);
      }

      if (column.every((value) => value && value === playerSymbol)) {
        return [true, false];
      } else if (column.every((value) => value && value !== playerSymbol)) {
        return [false, true];
      }
    }

    if (matrix[1][1]) {
      if (matrix[0][0] === matrix[1][1] && matrix[2][2] === matrix[1][1]) {
        if (matrix[1][1] === playerSymbol) return [true, false];
        else return [false, true];
      }

      if (matrix[2][0] === matrix[1][1] && matrix[0][2] === matrix[1][1]) {
        if (matrix[1][1] === playerSymbol) return [true, false];
        else return [false, true];
      }
    }

    // Check for a tie
    if (matrix.every((m) => m.every((v) => v !== null))) {
      return [true, true];
    }

    return [false, false];
  };

  const updateGameMatrix = (column: number, row: number, symbol: "x" | "o") => {
    const newMatrix = [...matrix]

    if (newMatrix[row][column] === null || newMatrix[row][column] === "null") {
      newMatrix[row][column] = symbol;
      setMatrix(newMatrix);
    }

    if (SocketServiceClass.socket) {
      GameServiceClass.updateGame(SocketServiceClass.socket, newMatrix);
      const [currentPlayerWon, otherPlayerWon] = checkGameState(newMatrix);

      if (currentPlayerWon && otherPlayerWon) {
        GameServiceClass.gameWin(SocketServiceClass.socket, "The Game is a Tie!")
        alert("The Game is a Tie!")
      } else if (currentPlayerWon && !otherPlayerWon) {
        GameServiceClass.gameWin(SocketServiceClass.socket, "You Lost!");
        alert("You Won!");
      }
      setPlayerTurn(false);
    }
  };

  const handleGameUpdate = () => {
    if (SocketServiceClass.socket) {
      GameServiceClass.onGameUpdate(SocketServiceClass.socket, (newMatrix) => {
        setMatrix(newMatrix);
        setPlayerTurn(true);
        checkGameState(newMatrix)
      });
    }
  }

  const handleGameStart = () => {
    if (SocketServiceClass.socket) {

      GameServiceClass.onGameStart(SocketServiceClass.socket, (options) => {
        console.log(SocketServiceClass.socket)
        setGameStarted(true);
        console.log('isGameStarted', isGameStarted);
        setPlayerSymbol(options.symbol);
        if (options.start) {
          setPlayerTurn(true);
        } else {
          setPlayerTurn(false);
        }
      });
    }
  }

  const handleGameWin = () => {
    if (SocketServiceClass.socket) {
      GameServiceClass.onGameWin(SocketServiceClass.socket, (message) => {
        setPlayerTurn(false);
        alert(message)
      })
    }
  }

  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleGameWin();
  }, [])

  return (
    <GameContainer>
      {!isGameStarted && (
        <h2>Waiting for the other Player to join..</h2>
      )}
      {(!isGameStarted || !isPlayerTurn) && <PlayStopper />}
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
                onClick={() =>
                  updateGameMatrix(columnId, rowId, playerSymbol)
                }
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