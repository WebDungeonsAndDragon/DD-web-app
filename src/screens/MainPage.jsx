import React, { useEffect, useState } from "react";
import { Box, HStack, VStack, StackDivider, Button } from "@chakra-ui/react";

import backgroundImage from "../MainPageComponents/images/nature-paper-texture.png";
import styles from "../MainPageComponents/PlayACTIVE.module.css";
import { socket } from "../utils/socketClient";
import { createSuccessListeners, onNextTurn } from "../utils/functions";

const MainPage = () => {
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [roomId, setRoomId] = useState("12");

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

  return (
    <Box
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      width="100vw"
      height="100vh"
      position="fixed"
      top="0"
      left="0"
    >
      <VStack spacing={20}>
        <div className={styles.top}>
          <div className={styles.yourTurn}>
            <span className={styles.yourTurnTxtContainer}>
              <b>Your</b>
              <span className={styles.span}>{` `}</span>
              <span>Turn</span>
            </span>
          </div>
        </div>

        <HStack>
          <div className={styles.loremIpsumDolorContainer}>
            <p className={styles.blankLine}>{prompt}</p>
            <p className={styles.blankLine}>&nbsp;</p>
          </div>
          {isPlayerTurn && (
            <div className={styles.choices}>
              <div className={styles.choice1}>
                <img
                  className={styles.naturePaperTexture1}
                  alt=""
                  src="/src/MainPageComponents/images/nature-paper-texture.png"
                />
                <Button bg="transparent" className={styles.loremIpsumDolor}>
                  {options[0]}
                </Button>
              </div>
              <div className={styles.choice2}>
                <img
                  className={styles.naturePaperTexture1}
                  alt=""
                  src="/src/MainPageComponents/images/nature-paper-texture.png"
                />
                <Button bg="transparent" className={styles.loremIpsumDolor}>
                  {options[1]}
                </Button>
              </div>
              <div className={styles.choice3}>
                <img
                  className={styles.naturePaperTexture1}
                  alt=""
                  src="/src/MainPageComponents/images/nature-paper-texture.png"
                />
                <Button bg="transparent" className={styles.loremIpsumDolor}>
                  {options[2]}
                </Button>
              </div>
              <div className={styles.choice4}>
                <img
                  className={styles.naturePaperTexture1}
                  alt=""
                  src="/src/MainPageComponents/images/nature-paper-texture.png"
                />
                <Button bg="transparent" className={styles.loremIpsumDolor}>
                  {options[3]}
                </Button>
              </div>
            </div>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default MainPage;
