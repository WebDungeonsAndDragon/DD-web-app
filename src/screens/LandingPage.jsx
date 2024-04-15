import { useState } from "react";
import {
  Image,
  Input,
  Button,
  Textarea,
  Flex,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import bg from "../img/DDbg.png";
import enterButtonImage from "../img/TextBanner.png";
import joinGameButtonImage from "../img/hostbutton.png";
import hostGameButtonImage from "../img/joinbutton.png";
import lineImage from "../img/line1.png";
import styles from "../landingPage.module.css";
import { onJoinRoom } from "../utils/functions";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [screen, setScreen] = useState(1); // 1 for the first screen, 2 for the second
  const navigate = useNavigate();

  const handleEnter = () => {
    document.getElementById("name").value = "";
    if (userName.trim() !== "") {
      setScreen(2); // Switch to the second screen
    } else {
      alert("Please enter your name.");
    }
  };
  const handleJoin = () => {
    if (roomId.trim() !== "") {
      onJoinRoom(roomId, userName);
      console.log(roomId + userName);
      navigate("/lobby");
    } else {
      alert("Please enter a join code.");
    }
  };

  if (screen === 1) {
    return (
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          height: "100vh",
          width: "100vw",
        }}
      >
        <VStack>
          <Text className={styles.dungeonsDragons}>Dungeons & Dragons</Text>
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="What's your name, Traveler?"
            size="lg"
            w="80%"
            maxW="500px"
            mb="4"
            backgroundColor={"white"}
            color={"#3b3b3b"}
            id="name"
          />
          <Button
            onClick={handleEnter}
            backgroundColor="transparent"
            margin="20px"
          >
            <Image src={enterButtonImage} alt="Enter" />
          </Button>
        </VStack>
        {/* <footer>
          <img loading="lazy" alt="" src="../img/old-map1.png" />
          <img loading="lazy" alt="" src="../img/Settings.png" />
        </footer> */}
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          height: "100vh",
          width: "100vw",
        }}
      >
        <VStack>
          <Text className={styles.dungeonsDragons}>Dungeons & Dragons</Text>
          <HStack>
            <VStack>
              <Input
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Join Code"
                size="lg"
                w="80%"
                maxW="500px"
                mb="4"
                backgroundColor={"white"}
                color={"#3b3b3b"}
              />
              <Button
                onClick={handleJoin}
                backgroundColor="transparent"
                margin="20px"
              >
                <Image src={joinGameButtonImage} alt="Join a Game" />
              </Button>
            </VStack>
            <Image src={lineImage} alt="Host a Game" />
            <Button
              // onClick={handleHost}
              backgroundColor="transparent"
              margin="20px"
            >
              <Image src={hostGameButtonImage} alt="Host a Game" />
            </Button>
          </HStack>
        </VStack>
      </div>
    );
  }
}

export default LandingPage;
