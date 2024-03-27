export const START_GAME = "START_GAME";
export const PLAYER_JOINED = "PLAYER_JOINED";

export const exampleFunction = (example) => {
  return (dispatch) => {
    dispatch({
      type: "EXAMPLE",
      payload: example,
    });
  };
};
export const startGame = (roomId) => {
  return (dispatch) => {
    dispatch({
      type: START_GAME,
      payload: { roomId: roomId },
    });
  };
};
