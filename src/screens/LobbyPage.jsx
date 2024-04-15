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
          <Text fontSize="xl" justifyContent="center">Join Code: QWE123</Text>
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
                onClick={() => setSelectedRole(role.name)}
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
        <Button colorScheme="red" size="lg" onClick={() => {/* Start game logic here */}}>
          Start
        </Button>
      </Flex>
    </Box>
  );
};


// const LobbyPage = () => {
//   const [roomId, setRoomId] = useState("12");
//   const [roles, setRoles] = useState(["Fighter", "Mage", "Cleric", "Theif"]);
//   const [players, setPlayers] = useState([]);
//   const [selectedRole, setSelectedRole] = useState(null);

//   /* 
//   role object
//   consist of: 
//   role title
//   role icon
//   isSelected
//   **/

//   useEffect(() => {
//     socket.connect();
//     createSuccessListeners();
//     socket.on(
//       "joinRoomSuccess",
//       ({players}) => {
//         setPlayers(players);
//     });

//     socket.on(
//       "select-role-success",
//       ({players}) => {
//         setPlayers(players);
//     });

//     // basic layout
//     // add buttons/text
//     // add images and icons

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className={styles.roomHostView}>
//       <img className={styles.image8Icon} alt="" src="src/LobbyPageComponents/images/FurtherBackground.png" />
//       <img
//         className={styles.settingsBackgroundIcon}
//         alt=""
//         src="src/LobbyPageComponents/images/Background.png"
//       />
//       <div className={styles.lobby}>Lobby</div>
//       <div className={styles.rounds}>Rounds</div>
//       <div className={styles.players}>Players</div>
//       <div className={styles.pickARole}>Pick a Role:</div>
//       <header className={styles.roomCode} id="Room Code">
//         <b className={styles.joinCodeQwe123}>Join Code: qwe123</b>
//       </header>
//       <img className={styles.roomHostViewChild} alt="" />
//       //ROLE SELECTION
//       <Button
//         className={styles.fighter}
//         id="Fighter"
//         variant="ghost"
//         w="150px"
//         colorScheme="teal"
//       >
//         Fighter
//       </Button>
//       <Button
//         className={styles.mage}
//         variant="ghost"
//         w="150px"
//         colorScheme="teal"
//       >
//         Mage
//       </Button>
//       <Button
//         className={styles.cleric}
//         variant="ghost"
//         w="150px"
//         colorScheme="teal"
//       >
//         Cleric
//       </Button>
//       <Button
//         className={styles.thief}
//         variant="ghost"
//         w="150px"
//         colorScheme="teal"
//       >
//         Thief
//       </Button>
//       <div className={styles.roundSelection}>
//         <div className={styles.wrapper}>
//           <div className={styles.div}>1</div>
//         </div>
//         <div className={styles.container}>
//           <div className={styles.div1}>2</div>
//         </div>
//         <div className={styles.frame}>
//           <div className={styles.div2}>3</div>
//         </div>
//         <div className={styles.frameDiv}>
//           <div className={styles.div3}>4</div>
//         </div>
//         <div className={styles.wrapper1}>
//           <div className={styles.div4}>5</div>
//         </div>
//       </div>
//       //PLAYER CARDS
//       <div className={styles.playerNames}>
//         {players.map((player, index) => (
//           <div key={index} className={styles.playerContainer}>
//             <div className={styles.playerRectangle} />
//             <div className={styles.playerName}>{player.name}</div>
//           </div>
//         ))};
//       </div>
//       //ROUND SELECTION
//       <Stack className={styles.roundSelection1} w="195px">
//         <Select variant="outline" placeholder="# of rounds">
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//         </Select>
//       </Stack>
//       <div className={styles.textBanner}>
//         <div className={styles.text}>Home</div>
//       </div>

//       <Button
//         className={styles.textBanner1}
//         variant="solid"
//         w="150px"
//         colorScheme="red"
//       >
//         Start
//       </Button>
      
//     </div>
//   );
// };


export default LobbyPage;