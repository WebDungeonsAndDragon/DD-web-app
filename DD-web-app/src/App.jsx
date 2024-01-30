import { useState } from "react";
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

function App() {
  const reducers = combineReducers();

  const store = configureStore(reducers);

  return (
    <ChakraProvider>
      <div>This is where we will create dungeons & dragons on the web</div>
    </ChakraProvider>
  );
}

export default App;
