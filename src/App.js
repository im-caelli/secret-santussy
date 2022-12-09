
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

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
      colors: ['#ffffff'],
      shapes: ['circle'],
      gravity: randomInRange(0.2, 0.4),
      scalar: randomInRange(0.2, 0.5),
      drift: randomInRange(-0.4, 0.4)
    });
    requestAnimationFrame(frame);

  }());

  return (
    <div className="slide">
     <header className='slide-header'>
      <ul>
        <li><a href="https://github.com/im-caelli/secret-santussy"><FontAwesomeIcon icon={faGithub} /> About</a></li>
        <li><a href="https://twitter.com/im_caelli"><FontAwesomeIcon icon={faTwitter} /> Caelli</a></li>
      </ul>
     </header>
     <main>
        <div className='slide-desc'>
          <div className="title">
            <span className='headline'>A Happy <span>KDA</span></span>
            <span className='heading'>Holiday</span>
            <span className='tagline'>From Caelli <FontAwesomeIcon icon={faHeart} /></span>
          </div>

          <div className='message'>
            <p>Hi besti, I drew you booba for Christmas! But Evelynn's tiddies don't come for free and she said you better work.</p>
            <p>Slide the tiles around to get the full picture.</p>
          </div>

        </div>
        <div className='slide-stage'>
          <div className='board'>

          </div>
        </div>
     </main>
    </div>
  );
}

export default App;
