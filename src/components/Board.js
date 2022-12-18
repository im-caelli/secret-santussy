import confetti from "canvas-confetti";
import { useState, useEffect } from "react";
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT, EMPTY_TILE, isSolved, isSolvable, getMatrixPosition} from "../functions";
import Start from "./Start";
import Tile from "./Tile";


function Board(props) {
  let boardStyle = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  }

  const tileSize =  Math.round(BOARD_SIZE / GRID_SIZE);

  // States
  let [isStarted, setIsStarted] = useState(false);
  let [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);

  //-- Shuffle

  // Make sure that it is solvable and not already solved.

  let shuffle = (tiles) => {
    const shuffledTiles = [
      ...tiles
        .filter((t) => t !== tiles.length - 1)
        .sort(() => Math.random() - 0.5),
      tiles.length - 1,
    ];
    return isSolvable(shuffledTiles) && !isSolved(shuffledTiles)
      ? shuffledTiles
      : shuffle(shuffledTiles);
  }

  // Shuffle Tiles
  let shuffleTiles = () => {
    setTiles(shuffle(tiles));
  }


  // -- Move Tiles
  
  // Check if you can swap (should be next to empty tile)
  let canSwap = (srcIndex, destIndex) => {
    const { row: srcRow, col: srcCol } = getMatrixPosition(srcIndex);
    const { row: destRow, col: destCol } = getMatrixPosition(destIndex);
    return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
  }

  // Swap function
  let swap = (tiles, src, dest) => {
    const tilesResult = [...tiles];
    [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
    return tilesResult;
  }

  // Swap Tiles
  let swapTiles = (tileIndex) => {
    if(canSwap(tileIndex, tiles.indexOf(EMPTY_TILE))) {
      setTiles(swap(tiles, tileIndex, tiles.indexOf(EMPTY_TILE)));
    }
  }

  // Tile Click
  let tileClick = (index) => {
    swapTiles(index);
  }

  // Play Click
  let playClick = () => {
    shuffleTiles();
    setIsStarted(true);
    props.setGameStart(true);
    props.setGameWin(false);
    // setGameStart(true);
  }


  // Check if solved and set win state
  let isWon = isSolved(tiles);

  useEffect(() => {
    if (isStarted && isWon) {
      props.setGameWin(true);
      console.log('win!');
      confetti({
        origin: {
          x: 0.35,
          y: 0.70
        },
        colors: ['FFFFFF', 'ECC29A', 'B32B5A'],
        shapes: ['circle', 'star']
      });
    }
  }, [isWon]);

  //On Load
  useEffect(() => {
    shuffleTiles(); // Shuffle Cards
    props.shuffleClick.current = shuffleTiles;
    props.replayClick.current = playClick;
  }, []);

  return (
    <div className="board-wrap">
      {isStarted ? (
        <ul className={`board animate__animated animate__fadeIn ${isWon ? "solved" : ""}`} style={{...boardStyle}}>
        {tiles.map((tile, index) => (
          <Tile 
            key={tile}
            tile={tile}
            index={index}
            tileClick={tileClick}
            width={tileSize}
            height={tileSize}
            />
        ))}
      </ul>
      ) : (
        <Start 
          playClick={playClick}
        />
      )}
    </div>
  );
}

export default Board;