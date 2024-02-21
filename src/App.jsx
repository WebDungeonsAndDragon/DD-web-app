import { useEffect, useState } from "react";
import "./App.css";

import { Button, ChakraProvider } from "@chakra-ui/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { socket } from "./utils/socketClient";
import {
  createSuccessListeners,
  onEndGame,
  onJoinRoom,
  onLeaveGame,
  onNextTurn,
  onStartGame,
} from "./utils/functions";

function App() {
  // const reducers = combineReducers();

  // function that is run when the webpage loads
  useEffect(() => {
    socket.connect();
    createSuccessListeners();

    return () => {
      socket.disconnect();
    };
  }, []);

  // const store = configureStore(reducers);

  return (
    <ChakraProvider>
      <div>This is where we will create dungeons & dragons on the web</div>
      <Button colorScheme="blue" onClick={onJoinRoom}>
        Join Room
      </Button>
      <Button colorScheme="blue" onClick={onStartGame}>
        Start Game
      </Button>
      <Button colorScheme="blue" onClick={onNextTurn}>
        Next Turn
      </Button>
      <Button colorScheme="blue" onClick={onLeaveGame}>
        Leave Game
      </Button>
      <Button colorScheme="blue" onClick={onEndGame}>
        End Game
      </Button>
    </ChakraProvider>
  );
}

export default App;
