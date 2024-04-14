import React, { useEffect, useState } from "react";
import { Box, HStack, VStack, SimpleGrid, Button } from "@chakra-ui/react";

import backgroundImage from "../MainPageComponents/images/nature-paper-texture.png";
import styles from "../MainPageComponents/PlayACTIVE.module.css";
import { socket } from "../utils/socketClient";
import { createSuccessListeners, onNextTurn } from "../utils/functions";

const MainPage = () => {
  const [playerTurn, setCurrentPlayerTurn] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState(["Hello", "", "", ""]);
  const [roomId, setRoomId] = useState("12");

  useEffect(() => {
    socket.connect();
    createSuccessListeners();
    socket.on(
      "startGameSuccess",
      ({ introduction, prompt, currentPlayerTurn, roundNumber, options }) => {
        setPrompt(`${introduction} \n ${prompt}`);
        setCurrentPlayerTurn(currentPlayerTurn);
        setOptions(options);
        console.log(roundNumber);
      }
    );

    socket.on("next-turn-success", ({ currentPlayerTurn, prompt }) => {
      setCurrentPlayerTurn(currentPlayerTurn);
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
        setCurrentPlayerTurn(currentPlayerTurn);
        setOptions(options);
      }
    );

    socket.on("end-game-success", ({ endGame, story }) => {
      setPrompt(`You ${endGame}! \n ${story}`);
      setCurrentPlayerTurn(null);
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
              <span className={styles.title} style={{ fontWeight: 550 }}>
                {playerTurn === socket.id ? "Your" : playerTurn?.name + "'s"}
              </span>
              <span className={styles.span}>{` `}</span>
              <span className={styles.title}>Turn</span>
            </span>
          </div>
        </div>

        <HStack>
          <div className={styles.loremIpsumDolorContainer}>
            <p className={styles.blankLine}>{prompt}</p>
            <p className={styles.blankLine}>&nbsp;</p>
          </div>
          <div className={styles.choices}>
            {true ? (
              <SimpleGrid>
                {options.map((option, index) => {
                  return (
                    <div className={styles["choice" + (index + 1)]}>
                      <img
                        className={styles.naturePaperTexture1}
                        alt=""
                        src="/src/MainPageComponents/images/nature-paper-texture.png"
                      />
                      <Button
                        bg="transparent"
                        className={styles.loremIpsumDolor}
                        width="100%"
                        height="100%"
                        onClick={() => onNextTurn(option, roomId)}
                      >
                        {option}
                      </Button>
                    </div>
                  );
                })}
              </SimpleGrid>
            ) : (
              <p style={{ margin: "auto" }}>Waiting for someone's turn...</p>
            )}
          </div>
        </HStack>
      </VStack>
    </Box>
  );
};

export default MainPage;
