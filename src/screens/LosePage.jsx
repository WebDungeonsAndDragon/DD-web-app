import { useEffect, useState } from "react";
import { socket } from "../utils/socketClient";
import { createSuccessListeners } from "../utils/functions";
import { Link } from "react-router-dom";

import { Box, Center, Button } from "@chakra-ui/react";

function LosePage() {
  const [prompt, setPrompt] = useState("Oh No!");

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
    <Box
      backgroundImage="/src/ResultPageComponents/images/result-bg.png"
      backgroundSize="cover"
      backgroundPosition="center"
      width="100vw"
      height="100vh"
      position="fixed"
      top="0"
      left="0"
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
      <Center height="100vh" flexDir="column" gap="20%">
        <Center flexDirection="column">
          <img alt="" src="/src/ResultPageComponents/images/cross-swords.png" />
          <Box fontSize="80px">YOU LOST</Box>
          <Box fontSize="30px">{prompt}</Box>
        </Center>
        <Center gap="400px">
          <Button
            as={Link}
            to="/landing"
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
    </Box>
  );
}

export default LosePage;
