import React from "react";

export interface GameContextProps {
  isInRoom: boolean;
  setInRoom: (inRoom: boolean) => void;
  playerSymbol: "x" | "o";
  setPlayerSymbol: (symbol: "x" | "o") => void;
  isPlayerTurn: boolean;
  setPlayerTurn: (turn: boolean) => void;
  isGameStarted: boolean;
  setGameStarted: (started: boolean) => void;
};

const defaultState: GameContextProps = {
  isInRoom: false,
  setInRoom: () => { },
  playerSymbol: "x",
  setPlayerSymbol: () => { },
  isPlayerTurn: false,
  setPlayerTurn: () => { },
  isGameStarted: false,
  setGameStarted: () => { }
};

export default React.createContext(defaultState);