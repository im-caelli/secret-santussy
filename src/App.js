import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faGift, faRotateRight, faPlay} from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';
import Board from './components/Board';

function App() {

  // Snow
  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var skew = 1;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  (function frame() {
    var timeLeft = animationEnd - Date.now();
    var ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: (Math.random() * skew) - 0.2
      },
      colors: ['FFFFFF', '9998B5'],
      shapes: ['circle'],
      gravity: randomInRange(0.2, 0.4),
      scalar: randomInRange(0.2, 0.5),
      drift: randomInRange(-0.4, 0.4)
    });
    requestAnimationFrame(frame);

  }());

  // States
  let [gameStart, setGameStart] = useState(false);
  let [gameWin, setGameWin] = useState(false);

  // console.log('game start?:' + gameStart);
  // console.log('game win?:' + gameWin);


  const shuffleClick = useRef(null);
  const replayClick = useRef(null);
  const hintClick = useRef(null);

  return (
    <div className="slide">
     <header className="slide-header">
      <ul>
        <li><a href="https://github.com/im-caelli/secret-santussy"><FontAwesomeIcon icon={faGithub} /> About</a></li>
        <li><a href="https://twitter.com/im_caelli"><FontAwesomeIcon icon={faTwitter} /> Caelli</a></li>
      </ul>
     </header>
     <main>
        <div className="slide-desc">
          <h1 className="title">
            <span className="headline">A Happy <span>KDA</span></span>
            <span className="heading">Holiday</span>
            <span className="tagline">From Caelli <FontAwesomeIcon icon={faHeart} /></span>
          </h1>

          <div className="message">
            <p>Hi besti, I drew you booba for Christmas! But Evelynn's tiddies don't come for free and she said you better work.</p>
            <p>Click a tile adjecent to an empty tile to slide it around.</p>
          </div>
    
          <div className="download">
            { gameStart && gameWin ? (
              <a href="./img/download.png" target="_blank" rel="noopener noreferrer" className="btn save animate__animated animate__bounceIn"><FontAwesomeIcon icon={faGift} /> Save Image</a>
            ) : gameStart ? ( <button className="hint" onClick={() => hintClick.current()}>Good Luck! 😉</button>
            ) : (
              <span className="hint">Good Luck! 😉</span>
            )}
          </div>
        </div>
        <div className="slide-stage">
          <Board 
            setGameStart={setGameStart}
            setGameWin={setGameWin}
            shuffleClick={shuffleClick}
            replayClick={replayClick} 
            hintClick={hintClick} 
          />
            { gameStart && gameWin ? (
              <div className="game-play">
                <span className="play-again animate__animated animate__fadeIn"><button onClick={() => replayClick.current()}><FontAwesomeIcon icon={faPlay} /> Play Again</button></span>
              </div>
            ) : gameStart ? (
              <div className="game-play">
                <span className="reset animate__animated animate__fadeIn">
                    <button onClick={() => shuffleClick.current()}><FontAwesomeIcon icon={faRotateRight} /> Reset</button>
                  </span>
              </div>
            ) : (<div className="game-play"></div>) }
        </div>
     </main>
    </div>
  );
}

export default App;
