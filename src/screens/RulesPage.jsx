import { Text, VStack, HStack, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function RulesPage() {
  // functional component
  return (
    <Box w="100vw" h="100vh" bg="black">
      <VStack bg="lightgoldenrodyellow" padding="100px" align="center">
        <Box w="80%" h="80%" color="black" textAlign="center">
          <h1 style={{ fontSize: "4em" }}>Rules</h1>

          <ol align="left">
            <li>Rule one</li>
            <li>Rule two</li>
            <li>Rule two</li>
          </ol>
        </Box>

        <HStack>
          <Box
            bg="maroon"
            style={{ top: "50%", left: "50%" }} // attempted to center text
          >
            <div style={{ padding: "10px", fontSize: "2em", color: "yellow" }}>
              <Link to="/landing">Exit</Link>
            </div>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
}

export default RulesPage;
