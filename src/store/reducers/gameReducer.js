const initial_state = {
  currentPlayer: 0,
  roomId: "",
  playersInGame: [],
  story: [],
  isLoading: false,
  options: [],
  finalPrompt: "",
  hasWon: false,
};

const gameReducer = (state = initial_state, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default gameReducer;
