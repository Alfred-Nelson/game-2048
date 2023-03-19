import {
  BoardStateType,
  TileStateType,
  CoordinateType,
  RowOrColumnValueType,
  ActionConfigType,
  MovementConfigType,
} from "..";

/**
 *
 * @param max
 * @param min
 * @returns a value between min and max
 */
export const randomValBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
/**
 *
 * @param availableSpaces available space currently list as coordinate obj
 * @param newTileCoord coordinate of new tile
 * @returns available spaces after new tile occupy the space
 */
const occupySpace = (
  availableSpaces: CoordinateType[],
  newTileCoord: CoordinateType
) => {
  return availableSpaces.filter(
    (eachSpace) =>
      !(eachSpace.x === newTileCoord.x && eachSpace.y === newTileCoord.y)
  );
};

/**
 *
 * calculates 4X4 coordinate 1D list
 * filteres it based on the board state if it is provided
 * @param boardState board state
 * @returns an object with available space list and function to remove a coordinte from that occupied space
 */
export const getAvailableSpaces = (boardState?: BoardStateType) => {
  const boardSize: CoordinateType[] = [];
  Array.from({ length: 4 }).forEach((_, rowId) =>
    Array.from({ length: 4 }).forEach((_, colId) => {
      boardSize.push({
        x: rowId as RowOrColumnValueType,
        y: colId as RowOrColumnValueType,
      });
    })
  );
  let availableSpaces: CoordinateType[] = [];

  if (boardState) {
    availableSpaces = boardSize.filter(
      (eachSpace) =>
        !boardState.some(
          (tilePosition) =>
            tilePosition.x === eachSpace.x && tilePosition.y === eachSpace.y
        )
    );
  } else {
    availableSpaces = boardSize;
  }

  return availableSpaces;
};

/**
 *
 * @param id a value to represent the tile
 * @param availableSpaces (**optional**) - a list with coordinates of available spaces.
 * if available spaces is not given it takes a random value between 0 - 4
 * @returns a tile object
 */
export const tileFactory = (
  id: number,
  availableSpaces?: CoordinateType[]
): TileStateType | null => {
  let coordinate;
  let randVal;

  if (availableSpaces) {
    if (!availableSpaces.length) return null;
    randVal = randomValBetween(0, availableSpaces.length);
    coordinate = availableSpaces[randVal];
  } else {
    coordinate = {
      x: randomValBetween(0, 4) as RowOrColumnValueType,
      y: randomValBetween(0, 4) as RowOrColumnValueType,
    };
  }

  if (!coordinate && availableSpaces?.length) {
    coordinate = availableSpaces[0];
  }

  return {
    x: coordinate.x,
    y: coordinate.y,
    value: randomValBetween(0, 10) > 8 ? 4 : 2,
    id,
  };
};

/**
 *
 * Creates a board configuration with initial tiles setup
 * @param initialTileCount number of tiles initially
 * @returns a initially settable board configuration.
 */
export const createNewBoardState = (
  initialTileCount: number
): BoardStateType => {
  const state = [];
  let availableSpaces = getAvailableSpaces();

  for (let i = 0; i < initialTileCount; i++) {
    const newTile = tileFactory(i, availableSpaces);
    if (!newTile) return state;
    state.push(newTile);
    availableSpaces = occupySpace(availableSpaces, {
      x: newTile.x,
      y: newTile.y,
    });
  }
  return state;
};

/**
 *
 * take the current state of game; iterate it through each row; for each row sort it to end or start according to necessity; add each item to new state; end iteration; return new game state;
 * @param actionConfigObj has sort function and order axis key helping to select movement change
 * @param currentBoardConfig current state of the game with score
 * @returns new state of the game with new score
 */
export const makeMove = (
  actionConfigObj: ActionConfigType,
  currentBoardConfig: MovementConfigType
) => {
  const newBoardState: BoardStateType = [];
  let highest = -1;
  let score = currentBoardConfig.score;
  const currentBoardState = currentBoardConfig.state;

  for (let i = 0; i < 4; i++) {
    const tilesAtColumnI = currentBoardState.filter(
      (tile) => (actionConfigObj.orderAxis === "x" ? tile.y : tile.x) === i
    );
    tilesAtColumnI.sort(actionConfigObj.sort);
    tilesAtColumnI.forEach((tile, idx) => {
      if (tile.id > highest) highest = tile.id;
      newBoardState.push({
        ...tile,
        [actionConfigObj.orderAxis]: (actionConfigObj.hasOffset
          ? 3 - idx
          : idx) as RowOrColumnValueType,
      });
    });
    console.log(tilesAtColumnI, i);
  }

  const available = getAvailableSpaces(newBoardState);
  const newTile = tileFactory(highest + 1, available);
  if (!newTile) return { state: newBoardState, score };

  return { state: [...newBoardState, newTile], score };
};
