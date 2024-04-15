import React, { useEffect, useState } from "react";
import {
  Text,
  HStack,
  VStack,
  SimpleGrid,
  Button,
  Card,
  CardBody,
  Divider,
  Container,
} from "@chakra-ui/react";

import backgroundImage from "../MainPageComponents/images/nature-paper-texture.png";
import styles from "../MainPageComponents/PlayACTIVE.module.css";
import { socket } from "../utils/socketClient";
import { createSuccessListeners, onNextTurn } from "../utils/functions";
import { useLocation, useNavigate } from "react-router-dom";

const MainPage = () => {
  const [playerTurn, setCurrentPlayerTurn] = useState({ id: "", name: "" });
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const location = useLocation();
  const { roomId, playerName } = location.state || "";
  const navigate = useNavigate();

  useEffect(() => {
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
      setPrompt((prevState) => {
        return prompt[0];
      });
      setOptions([prompt[1], prompt[2], prompt[3], prompt[4]]);
    });

    socket.on(
      "end-round-success",
      ({ currentPlayerTurn, introduction, prompt, options }) => {
        setPrompt((prevState) => {
          return prompt[0];
        });
        console.log(currentPlayerTurn);
        setCurrentPlayerTurn(currentPlayerTurn);
        setOptions(options);
      }
    );

    socket.on("end-game-success", ({ endGame, story }) => {
      // console.log("end game", endGame);
      if (endGame === "win") {
        navigate("/win", { state: { story } });
      } else {
        navigate("/lose", { state: { story } });
      }
      setPrompt(`You ${endGame}! \n ${story}`);
      setCurrentPlayerTurn(null);
    });
  }, []);

  return (
    <VStack
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      width="100vw"
      height="100vh"
      position="fixed"
      top="0"
      left="0"
      spacing={20}
    >
      <div className={styles.top}>
        <span className={styles.title} style={{ fontWeight: 550 }}>
          {playerTurn?.id === socket.id ? "Your" : playerTurn?.name + "'s"}
        </span>
        <span className={styles.span}>{` `}</span>
        <span className={styles.title}>Turn</span>
      </div>

      <HStack spacing={10} width="90%" fontSize="medium" height={"100%"}>
        <div className={styles.loremIpsumDolorContainer}>
          <p className={styles.blankLine}>{prompt}</p>
          <br />
        </div>
        <Divider orientation="vertical" size={""} colorScheme="blackAlpha" />

        <Container textAlign="center">
          {playerTurn?.id === socket.id ? (
            <SimpleGrid columns={2} spacing={10}>
              {options.map((option, index) => {
                return (
                  <Card
                    onClick={() => onNextTurn(option, roomId)}
                    key={index}
                    className={styles.hoverableCard}
                  >
                    <CardBody>
                      <Text fontSize="medium">{option.split("|")[0]}</Text>
                    </CardBody>
                  </Card>
                );
              })}
            </SimpleGrid>
          ) : (
            <Text style={{ margin: "auto" }}>
              Waiting for someone's turn...
            </Text>
          )}
        </Container>
      </HStack>
    </VStack>
  );
};

export default MainPage;
