import { useEffect, useState } from "react";
import "./App.css";

import { Button, ChakraProvider, HStack, VStack } from "@chakra-ui/react";
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
  const [isPlayerTurn, setIsPlayerTurn] = useState();
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [roomId, setRoomId] = useState("12");

  // function that is run when the webpage loads
  useEffect(() => {
    socket.connect();
    createSuccessListeners();
    socket.on(
      "startGameSuccess",
      ({ introduction, prompt, currentPlayerTurn, roundNumber, options }) => {
        setPrompt(`${introduction} \n ${prompt}`);
        setIsPlayerTurn(currentPlayerTurn === socket.id);
        setOptions(options);
        console.log(roundNumber);
      }
    );

    socket.on("next-turn-success", ({ currentPlayerTurn, prompt }) => {
      setIsPlayerTurn(currentPlayerTurn === socket.id);
      setPrompt(prompt[0]);
      setOptions([prompt[1], prompt[2], prompt[3], prompt[4]]);
    });

    window.addEventListener("unload", () => {
      socket.emit("removePlayer", { roomId: roomId });
    });

    socket.on(
      "end-round-success",
      ({ currentPlayerTurn, introduction, prompt, options }) => {
        setPrompt(` ${prompt}`);
        setIsPlayerTurn(currentPlayerTurn === socket.id);
        setOptions(options);
      }
    );

    socket.on("end-game-success", ({ endGame, story }) => {
      setPrompt(`You ${endGame}! \n ${story}`);
      setIsPlayerTurn(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // const store = configureStore(reducers);

  return (
    <ChakraProvider>
      <div>This is where we will create dungeons & dragons on the web</div>
      <Button colorScheme="blue" onClick={() => onJoinRoom(roomId, "Laksh")}>
        Join Room
      </Button>
      <Button
        colorScheme="blue"
        onClick={() =>
          onStartGame(10, roomId, ["Fighter", "Mage", "Cleric", "Thief"])
        }
      >
        Start Game
      </Button>
      {/* <Button
        colorScheme="blue"
        onClick={() => onNextTurn("Used his sword to fight the dragon", roomId)}
      >
        Next Turn
      </Button> */}
      <Button colorScheme="blue" onClick={() => onLeaveGame(socket.id, roomId)}>
        Leave Game
      </Button>
      <Button
        colorScheme="blue"
        onClick={() => onEndGame("All players died", roomId)}
      >
        End Game
      </Button>
      {prompt !== "" && (
        <div>
          <p>{prompt}</p>
        </div>
      )}

      {isPlayerTurn && (
        <VStack>
          {options.map((option) => (
            <Button
              key={option}
              colorScheme="blue"
              onClick={() => onNextTurn(option, roomId)}
            >
              {option.split("|")[0]}
            </Button>
          ))}
        </VStack>
      )}
    </ChakraProvider>
  );
}

export default App;
