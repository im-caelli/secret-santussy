import { BOARD_SIZE, EMPTY_TILE, GRID_SIZE, getMatrixPosition, getVisualPosition } from "../functions";
import { Motion, spring } from "react-motion";

function Tile(props) {
  const { tile, index, tileClick, width, height, hint} = props;

  const { row, col } = getMatrixPosition(index);
  const visualPosition = getVisualPosition(row, col, width, height);

  const tileStyle = {
    width: `calc(100% / ${GRID_SIZE})`,
    height: `calc(100% / ${GRID_SIZE})`,
    translateX: visualPosition.x,
    translateY: visualPosition.y,
    opacity: tile === EMPTY_TILE ? 0 : 1,
    backgroundImage: `url(${'./img/eve-puzzle.jpg'})`,
    backgroundSize: `${BOARD_SIZE}px`,
    backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${(100 / (GRID_SIZE - 1)) * (Math.floor(tile / GRID_SIZE))}%`,
    mixBlendMode: tile === index ? 'normal' : 'multiply',
  }

  const motionStyle = {
    translateX: spring(visualPosition.x),
    translateY: spring(visualPosition.y)
  }

  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li className="tile" style={{ ...tileStyle, transform: `translate3d(${translateX}px, ${translateY}px, 0)`}} onClick={() => tileClick(index)}>
          { hint ? `${tile + 1}` : '' }
        </li>
      )}
    </Motion>
  );
}

export default Tile;