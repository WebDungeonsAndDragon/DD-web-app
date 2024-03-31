import { useEffect, useState } from "react";
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { socket } from "./utils/socketClient";
import AppNavigator from "./navigation/AppNavigator";

function App() {
    // const reducers = combineReducers();
    const [isPlayerTurn, setIsPlayerTurn] = useState();
    const [prompt, setPrompt] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [roomId, setRoomId] = useState("12");

    // function that is run when the webpage loads
    useEffect(() => {
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);

    // const store = configureStore(reducers);

    return (
        <ChakraProvider>
            <AppNavigator />
        </ChakraProvider>
    );
}

export default App;
