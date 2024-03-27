function LosePage() {
  // functional component
  return (
    <div>
      <h1>You Lost</h1>
      <text>Your team failed.</text>

      <button onClick={LandingPageNope}>Home</button>
      <button onClick={MainPageNope}>Lobby</button>
    </div>
  );
}
