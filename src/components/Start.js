function Start(props) {
  const { playClick } = props;
  return (
    <div className="start-screen">
      <div>
        <h2>NSFW Warning </h2>
        <p>There's tiddies! 🤭</p>
      </div>

      <button className="btn"  onClick={() => playClick()}>Play</button>
    </div>
  );
}

export default Start;