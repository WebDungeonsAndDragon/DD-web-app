import { socket } from "./socketClient";

// Let this page be the place you write all your functions, we might alter this file so that you can learn about redux
// feel free to add arguments to functions or edit them in any way

// the functions that have "on" are the ones that will emit messages
// socket should emit join-room
const onJoinRoom = () => {
  socket.emit("joinRoom", { roomId: "12", playerName: "Laksh" });
};

// socket should emit join-room
const onStartGame = () => {};

// socket should emit join-room
const onNextTurn = (currentPlayerAction, roomId) => {
  socket.emit("next-turn", ({currentPlayerAction: currentPlayerAction, roomId: roomId}));
};

// socket should emit join-room
const onLeaveGame = () => {};

// socket should emit join-room
const onEndGame = (endGameReason, roomId) => {
  socket.emit("end-game", ({endGameReason: endGameReason, roomId: roomId}));
};

// this function is just to let the app know that these are the set of messages it should be listening for
// i.e, these are all the socket.on functions
const createSuccessListeners = () => {
  // socket should listen for join-room-success (depends on what you wrote)
  socket.on();

  // socket should listen for start-game-success (depends on what you wrote)
  socket.on();

  // socket should listen for next-turn-success (depends on what you wrote)
  socket.on("next-turn-success", ({currentPlayerTurn, prompt}) => {
    console.log(currentPlayerTurn);
    console.log(prompt);
  });

  // socket should listen for leave-game-success (depends on what you wrote)
  socket.on();

  // socket should listen for leave-game-success (depends on what you wrote)
  socket.on("end-round", (newRoundNumber) => {
    console.log(newRoundNumber);
  });

  // socket should listen for end-game-success (depends on what you wrote)
  socket.on("end-game-success", (prompt) => {
    console.log(prompt);
  });
};

export {
  onJoinRoom,
  onStartGame,
  onNextTurn,
  onLeaveGame,
  onEndGame,
  createSuccessListeners,
};
