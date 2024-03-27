import { useEffect, useState } from "react";
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { socket } from "./utils/socketClient";
import AppNavigator from "./navigation/AppNavigator";

function App() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <ChakraProvider>
      <AppNavigator />
    </ChakraProvider>
  );
}

export default App;
