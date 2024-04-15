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
  Container,
  VStack,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../utils/socketClient";
import bg from "../LobbyPageComponents/images/FurtherBackground.png";
import {
  createSuccessListeners,
  onNextTurn,
  onSelectRole,
  onStartGame,
} from "../utils/functions";
import { startGame } from "../store/actions/gameAction";

const LobbyPage = () => {
  const location = useLocation();
  const { roomId } = location.state || "";
  const [players, setPlayers] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [rounds, setRounds] = useState("1");
  const navigate = useNavigate();

  const [roles, setRoles] = useState([
    {
      name: "FIGHTER",
      icon: "src/LobbyPageComponents/images/Fighter.png",
      isSelected: false,
    },
    {
      name: "MAGE",
      icon: "src/LobbyPageComponents/images/Mage.png",
      isSelected: false,
    },
    {
      name: "CLERIC",
      icon: "src/LobbyPageComponents/images/Cleric.png",
      isSelected: false,
    },
    {
      name: "THIEF",
      icon: "src/LobbyPageComponents/images/Thief.png",
      isSelected: false,
    },
  ]);

  /* 
  role object
  consist of: 
  role title
  role icon
  isSelected
  **/

  useEffect(() => {
    console.log(socket.id);

    socket.on("joinRoomSuccess", ({ players }) => {
      setPlayers(players);
      updateRoles(players);
    });

    socket.on("select-role-success", ({ players }) => {
      setPlayers(players);
      updateRoles(players);
    });
  }, []);

  const updateRoles = () => {
    const newRoles = roles;
    roles.forEach((role, index) => {
      players.forEach((player) => {
        console.log(player.role, role.name, player.role == role.name, index);

        newRoles[index].isSelected =
          player.role == role.name && selectedRole !== role.name;
      });
    });
    setRoles(newRoles);
  };

  const onSelectRoleHandler = (role) => {
    setSelectedRole(role);
    onSelectRole(role, roomId);
  };

  const onStartGameHandler = () => {
    navigate("/main", {
      state: { roomId: roomId, playerName: location.state.playerName },
    });
    onStartGame(rounds, roomId, roles);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        padding: "1rem",
      }}
    >
      <VStack>
        <Box className={styles.box} paddingY={1} paddingX={9}>
          <Text color="#F4C13E" fontSize={"xx-large"} justifyContent="center">
            Join Code: {roomId}
          </Text>
        </Box>

        <Box
          p={20}
          mx="auto"
          borderRadius="md"
          overflow="hidden"
          position="relative"
          zIndex="0"
          className={styles.lobby}
        >
          {/* Lobby Heading and Join Code */}

          <Heading
            as="h1"
            size="xl"
            mb={4}
            justifyContent="center"
            textAlign="center"
            className={styles.title}
          >
            Lobby
          </Heading>

          {/* Roles and Players */}
          <Flex justifyContent="space-between" alignItems="start" mb={6}>
            {/* Roles Section */}
            <Box>
              <Heading color="#750909" as="h2" size="lg" mb={4}>
                Pick a Role:
              </Heading>
              <SimpleGrid columns={2} spacing={30}>
                {roles.map((role) => (
                  <Button
                    key={role.name}
                    onClick={() => onSelectRoleHandler(role.name)}
                    m={2}
                    p={2}
                    borderRadius="md"
                    variant={selectedRole === role.name ? "solid" : "outline"}
                    isDisabled={role.isSelected}
                    _hover="none"
                    bg={selectedRole === role.name ? "#F4C13E" : "white"}
                    padding="90px"
                  >
                    <Box
                      as="span"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <img src={role.icon} alt={role.name} />
                      <Text mt={2}>{role.name}</Text>
                    </Box>
                  </Button>
                ))}
              </SimpleGrid>
            </Box>

            {/* Players Section */}
            <Box flex="1" ml={10}>
              <Heading as="h2" size="lg" color="#750909" mb={4}>
                Players
              </Heading>
              {players.length > 0 && (
                <List spacing={2} mb={8}>
                  {players.map((player, index) => (
                    <ListItem
                      key={index}
                      borderWidth="1px"
                      bg="#903131"
                      color="#F4C13E"
                      p={2}
                      borderRadius="md"
                    >
                      {player.name}
                    </ListItem>
                  ))}
                </List>
              )}
              {/* Rounds Dropdown */}
              <Heading
                as="h2"
                size="lg"
                mb={4}
                color="#750909"
                position="block"
              >
                Rounds
              </Heading>
              <Select
                placeholder="Select round"
                value={rounds}
                bg="#F4C13E"
                border="#750909"
                textColor={"#750909"}
                onChange={(e) => setRounds(e.target.value)}
              >
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
            <Button
              bg="#750909"
              colorScheme="red"
              size="lg"
              onClick={onStartGameHandler}
            >
              Start
            </Button>
          </Flex>
        </Box>
      </VStack>
    </div>
  );
};

export default LobbyPage;
