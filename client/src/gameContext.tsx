import React from "react";

export interface GameContextProps {
  isInRoom: boolean;
  setInRoom: (inRoom: boolean) => void;
};

const defaultState: GameContextProps = {
  isInRoom: false,
  setInRoom: () => { }
};

export default React.createContext(defaultState);