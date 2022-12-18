import { BOARD_SIZE, EMPTY_TILE, GRID_SIZE } from "../functions";

function Tile(props) {
  const { tile, index, tileClick} = props;

  const tileStyle = {
    width: `calc(100% / ${GRID_SIZE})`,
    height: `calc(100% / ${GRID_SIZE})`,
    opacity: tile === EMPTY_TILE ? 0 : 1,
    backgroundImage: `url(${'./img/kda.png'})`,
    backgroundSize: `${BOARD_SIZE}px`,
    backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${(100 / (GRID_SIZE - 1)) * (Math.floor(tile / GRID_SIZE))}%`,
    mixBlendMode: tile === index ? 'normal' : 'multiply',
  }

  return (

    <li className="tile" style={{ ...tileStyle}} onClick={() => tileClick(index)}>
      {`${tile + 1}`}
    </li>

  );
}

export default Tile;