import React, { useEffect, useState } from "react";
import styles from "../LobbyPageComponents/styles.module.css";
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Select,
  Text,
  Image,
  Stack,
  SimpleGrid,
} from '@chakra-ui/react';import { socket } from "../utils/socketClient";
import { createSuccessListeners, onNextTurn } from "../utils/functions";
import { startGame } from "../store/actions/gameAction";


// import FighterIcon from 'src/LobbyPageComponents/images/Fighter.png';
// import ClericIcon from 'src/LobbyPageComponents/images/Cleric.png';
// import MageIcon from 'src/LobbyPageComponents/images/Mage.png';
// import ThiefIcon from 'src/LobbyPageComponents/images/Thief.png';



const LobbyPage = () => {
  const [roomId, setRoomId] = useState("12");
  const [players, setPlayers] = useState(['ARNY', 'LAKSH', 'GABE']);
  const [selectedRole, setSelectedRole] = useState(null);
  const [rounds, setRounds] = useState('1');

  const roles = [
    { name: 'FIGHTER', icon: 'src/LobbyPageComponents/images/Fighter.png' },
    { name: 'MAGE', icon: 'src/LobbyPageComponents/images/Mage.png' },
    { name: 'CLERIC', icon: 'src/LobbyPageComponents/images/Cleric.png' },
    { name: 'THIEF', icon: 'src/LobbyPageComponents/images/Thief.png' },
  ];

  /* 
  role object
  consist of: 
  role title
  role icon
  isSelected
  **/

  useEffect(() => {
    socket.connect();
    createSuccessListeners();
    socket.on(
      "joinRoomSuccess",
      ({players}) => {
        setPlayers(players);
    });

    socket.on(
      "select-role-success",
      ({players}) => {
        setPlayers(players);
    });

    // basic layout
    // add buttons/text
    // add images and icons

    return () => {
      socket.disconnect();
    };
  }, []);

  
  return (
    <Box
      className="lobby"
      p={8}
      maxWidth="800px"
      mx="auto"
      borderRadius="md"
      overflow="hidden"
      position="relative"
      zIndex="0"
    >
      {/* Lobby Heading and Join Code */}
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Heading as="h1" size="xl" mb={4} justifyContent="center">Lobby</Heading>
          <Text fontSize="xl" justifyContent="center">Join Code: {roomId}</Text>
        </Box>
        <Button as="a" href="/" size="sm">Home</Button>
      </Flex>

      {/* Roles and Players */}
      <Flex justifyContent="space-between" alignItems="start" mb={6}>
        {/* Roles Section */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>Pick a Role:</Heading>
          <SimpleGrid columns={2} spacing={30}>
            {roles.map((role) => (
              <Button
                key={role.name}
                onClick={() => 
                  setSelectedRole(role.name)
                }
                m={2}
                p={2}
                borderRadius="md"
                variant={selectedRole === role.name ? 'solid' : 'outline'}
                colorScheme={selectedRole === role.name ? 'red' : 'gray'}
                padding="90px"
              >
                <Box as="span" display="flex" flexDirection="column" alignItems="center">
                  <img src={role.icon} alt={role.name} />
                  <Text mt={2}>{role.name}</Text>
                </Box>
              </Button>
            ))}
          </SimpleGrid>        
        </Box>

        {/* Players Section */}
        <Box flex="1" ml={10}>
          <Heading as="h2" size="lg" mb={4}>Players</Heading>
          {players.length > 0 && (
            <List spacing={2} mb={8}>
              {players.map((player, index) => (
                <ListItem key={index} borderWidth="1px" p={2} borderRadius="md">
                  {player}
                </ListItem>
              ))}
            </List>
          )}
          {/* Rounds Dropdown */}
          <Heading as="h2" size="lg" mb={4} position="block">Rounds</Heading>
          <Select placeholder="Select round" value={rounds} onChange={(e) => setRounds(e.target.value)}>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((number) => (
              <option key={number} value={number.toString()}>
                {number}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>

      {/* Start Button */}
      <Flex justifyContent="flex-end">
        <Button colorScheme="red" href="/MainPage" size="lg" onClick={() => {
          startGame(roomId);
        }}>
          Start
        </Button>
      </Flex>
    </Box>
  );
};

export default LobbyPage;