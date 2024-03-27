import { Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  // functional component
  return (
    <VStack textAlign="justify">
      <Text size="md">
        This page will be deleted later and is only here so that you can access
        your own page and view it
      </Text>
      <Text>Click on your page from the list below:</Text>
      <Text>
        Note: Check your browsers console to see if there are any errors
        occuring!
      </Text>

      <ol>
        <li>
          <Link to="/landing">Landing Page</Link>
        </li>
        <li>
          <Link to="/lobby">Lobby Page</Link>
        </li>
        <li>
          <Link to="/main">Main Page</Link>
        </li>
        <li>
          <Link to="/rules">Rules Page</Link>
        </li>
        <li>
          <Link to="/lose">Lose Page</Link>
        </li>
        <li>
          <Link to="/win">Win Page</Link>
        </li>
      </ol>
    </VStack>
  );
};

export default Home;
