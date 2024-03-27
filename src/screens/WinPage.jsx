function WinPage() {
  // functional component
  return (
    <div>
      <h1>You Won</h1>
      <text>Hip Hip Hooray</text>

      <button onClick={LandingPage}>Home</button>
      <button onClick={MainPage}>Lobby</button>
    </div>
  );
}

export default WinPage;
