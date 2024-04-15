import { useEffect, useRef, useState } from "react";
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { socket } from "./utils/socketClient";
import AppNavigator from "./navigation/AppNavigator";

import { theme as chakraTheme } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [playAudio, setPlayAudio] = useState(false);

  // function that is run when the webpage loads
  useEffect(() => {
    socket.connect();
    if (!playAudio) {
      window.addEventListener("mousedown", () => {
        setPlayAudio(true);
      });
    }
  }, []);

  // const store = configureStore(reducers);
  const theme = extendTheme({
    fonts: {
      heading: `'Alegreya SC', sans-serif`,
      body: `'Alegreya SC', sans-serif`,
    },
  });

  return (
    <ChakraProvider theme={theme}>
      {playAudio && (
        <AudioPlayer src="./assets/medieval-background-music.mp3" />
      )}
      <AppNavigator />
    </ChakraProvider>
  );
}

export default App;
