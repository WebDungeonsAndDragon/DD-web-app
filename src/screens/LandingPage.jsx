import { useState } from "react";
import { Image, Input, Button, Text, VStack, HStack } from "@chakra-ui/react";
import bg from "../img/DDbg.png";
import enterButtonImage from "../img/TextBanner.png";
import joinGameButtonImage from "../img/hostbutton.png";
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
      navigate("/lobby", { state: { roomId: roomId, playerName: userName } });
      onJoinRoom(roomId, userName);
    } else {
      alert("Please enter a join code.");
    }
  };
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
            {screen === 1 ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </VStack>
        </HStack>
      </VStack>
    </div>
  );
}

export default LandingPage;
