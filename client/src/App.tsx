import React, { useEffect, useState } from "react";
import styled from "styled-components";
import './App.css';
import SocketServiceClass from "./services/socketService";
import JoinRoom from "./components/joinRoom";
import GameContext, { GameContextProps } from "./gameContext";
import TicTacToe from "./components/ticTacToe";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

const WelcomeText = styled.h1`
  margin: 0;
  color: #8e44ad;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [isInRoom, setInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<"x" | "o">('x');

  const connectSocket = async () => {
    const socket = await SocketServiceClass.connect("http://localhost:3001").catch(err => {
      console.log("Error", err);
    })
    return socket;
  }

  useEffect(() => {
    connectSocket();
  }, [])

  const gameContextValue: GameContextProps = {
    isInRoom,
    setInRoom,
    playerSymbol,
    setPlayerSymbol
  }

  return (
    <GameContext.Provider value={gameContextValue}>
      <AppContainer>
        <WelcomeText>Welcome to Tic-Tac-Toe</WelcomeText>
        <MainContainer>
          {!isInRoom && <JoinRoom />}
          {isInRoom && <TicTacToe />}
        </MainContainer>
      </AppContainer>
    </GameContext.Provider>
  );
}

export default App;
