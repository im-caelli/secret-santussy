import { useState } from "react";
import { BOARD_SIZE, TILE_COUNT, EMPTY_TILE, isSolved, isSolvable, getMatrixPosition} from "../functions";
import Start from "./Start";
import Tile from "./Tile";


function Board(props) {
  let boardStyle = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  }

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

  // // Shuffle Click
  // let shuffleClick = () => {
  //   shuffleTiles();
  // }


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
  }

  return (
    <div className="board-wrap">
      {isStarted ? (
        <ul className="board animate__animated animate__fadeIn" style={{...boardStyle}}>
        {tiles.map((tile, index) => (
          <Tile 
            key={tile}
            tile={tile}
            index={index}
            tileClick={tileClick}
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