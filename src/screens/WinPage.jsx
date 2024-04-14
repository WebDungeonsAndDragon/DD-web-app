import {
  Text,
  VStack,
  Box,
  HStack,
  AbsoluteCenter,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function WinPage() {
  // functional component
  return (
    <Box w="100vw" h="100vh" bg="black" align="center">
      <VStack bg="lightgoldenrodyellow" padding="100px" align="center">
        <Box w="80%" h="80%" color="black" textAlign="center">
          <h1
            style={{
              color: "yellow",
              fontSize: "4em",
              textShadowColor: "black", // supposed to outline text in black
              textShadowRadius: "20px",
            }}
          >
            You Won
          </h1>
          <text>Hip Hip Hooray.</text>

          <HStack>
            <Box bg="maroon" padding="10px" fontSize="2em" color="yellow">
              <Link to="/home">Home</Link>
            </Box>

            <Box bg="maroon" padding="10px" fontSize="2em" color="yellow">
              <Link to="/lobby">Lobby</Link>
            </Box>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}

export default WinPage;
