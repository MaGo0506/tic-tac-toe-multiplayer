import React, { useEffect } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";
import './App.css';

const socket = io("http://localhost:3001");

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

function App() {
  useEffect(() => {
    socket.emit("client-ready");
  }, [])

  return (
    <AppContainer>
      <h1>Welcome to Tic-Tac-Toe</h1>
    </AppContainer>
  );
}

export default App;
