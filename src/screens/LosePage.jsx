import { useEffect, useState } from "react";
import { socket } from "../utils/socketClient";
import { createSuccessListeners } from "../utils/functions";
import { Link, useLocation } from "react-router-dom";
import bg from "../LobbyPageComponents/images/FurtherBackground.png";

import { Box, Center, Button, VStack } from "@chakra-ui/react";

function LosePage() {
  const location = useLocation();
  const [prompt, setPrompt] = useState("Oh No!");
  const { story } = location.state || "";

  useEffect(() => {
    socket.connect();
    createSuccessListeners();

    socket.on("end-game-success", ({ endGame, story }) => {
      setPrompt(`You ${endGame}! \n ${story}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // functional component
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <VStack
        backgroundImage="/src/LobbyPageComponents/images/Background.png"
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundRepeat={false}
        height="97vh"
        width="70vw"
      >
        <Box
          zIndex="-1"
          w="100%"
          h="30%"
          backgroundColor="rgba(65, 5, 5, 0.5)"
          filter="blur(100px)"
          position="absolute"
          top="25%"
        ></Box>
        <Box
          zIndex="-1"
          w="50%"
          h="100%"
          backgroundColor="rgba(65, 5, 5, 0.3)"
          filter="blur(100px)"
          position="absolute"
          left="25%"
        ></Box>
        <Center marginTop={6} flexDir="column" gap="20%">
          <Center flexDirection="column" padding="5rem">
            <img
              alt=""
              src="/src/ResultPageComponents/images/cross-swords.png"
            />
            <Box fontSize="80px">YOU LOST</Box>
            <Box fontSize="23px">{story}</Box>
          </Center>
          <Center gap="400px">
            <Button
              as={Link}
              to="/"
              bgImage="/src/ResultPageComponents/images/banner.png"
              bgSize="contain"
              bgRepeat="no-repeat"
              width="270px"
              height="59px"
              bgColor="transparent"
              color="goldenrod"
              _hover={{
                backgroundColor: "rgba(65, 5, 5, 0.4)",
              }}
            >
              HOME
            </Button>
            <Button
              as={Link}
              to="/lobby"
              bgImage="/src/ResultPageComponents/images/banner.png"
              bgSize="contain"
              bgRepeat="no-repeat"
              width="270px"
              height="59px"
              bgColor="transparent"
              color="goldenrod"
              _hover={{
                backgroundColor: "rgba(65, 5, 5, 0.4)",
              }}
            >
              LOBBY
            </Button>
          </Center>
        </Center>
      </VStack>
    </div>
  );
}

export default LosePage;
