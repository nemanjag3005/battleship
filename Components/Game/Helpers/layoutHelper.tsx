export const BOARD_ROWS = 10;
export const BOARD_COLUMNS = 10;
export const BOARD = BOARD_COLUMNS * BOARD_ROWS;

export const SQUARE_STATE = {
  empty: "empty",
  ship: "ship",
  hit: "hit",
  miss: "miss",
  ship_sunk: "ship-sunk",
  forbidden: "forbidden",
  awaiting: "awaiting",
};

export const stateToClass = {
  [SQUARE_STATE.empty]: "empty",
  [SQUARE_STATE.ship]: "ship",
  [SQUARE_STATE.hit]: "hit",
  [SQUARE_STATE.miss]: "miss",
  [SQUARE_STATE.ship_sunk]: "ship-sunk",
  [SQUARE_STATE.forbidden]: "forbidden",
  [SQUARE_STATE.awaiting]: "awaiting",
};
// Returns an empty board
export const generateEmptyLayout = () => {
  return new Array(BOARD_ROWS * BOARD_COLUMNS).fill(SQUARE_STATE.empty);
};

// Returns the index of a clicked square from coordinates and vice versa

export const coordsToIndex = (coordinates: any) => {
  const { x, y } = coordinates;
  return y * BOARD_ROWS + x;
};

export const indexToCoords = (index: number) => {
  return {
    x: index % BOARD_ROWS,
    y: Math.floor(index / BOARD_ROWS),
  };
};

//Returns indices an entity would take up

export const entityIndices = (entity: any) => {
  let position = coordsToIndex(entity.position);

  let indices = [];

  for (let i = 0; i < entity.length; i++) {
    indices.push(position);
    position =
      entity.orientation === "vertical" ? position + BOARD_ROWS : position + 1;
  }

  return indices;
};

// checks if the ship doesn't overflow
export const isWithinBounds = (entity: any) => {
  return (
    (entity.orientation === "vertical" &&
      entity.position.y + entity.length <= BOARD_ROWS) ||
    (entity.orientation === "horizontal" &&
      entity.position.x + entity.length <= BOARD_COLUMNS)
  );
};

// Places an entity on layout
export const placeEntityinLayout = (oldLayout, entity, type) => {
  let newLayout = oldLayout.slice();

  if (type === "ship") {
    entityIndices(entity).forEach((idx) => {
      newLayout[idx] = SQUARE_STATE.ship;
    });
  }

  if (type === "forbidden") {
    entityIndices(entity).forEach((idx) => {
      newLayout[idx] = SQUARE_STATE.forbidden;
    });
  }

  if (type === "hit") {
    newLayout[coordsToIndex(entity.position)] = SQUARE_STATE.hit;
  }

  if (type === "miss") {
    newLayout[coordsToIndex(entity.position)] = SQUARE_STATE.miss;
  }

  if (type === "ship-sunk") {
    entityIndices(entity).forEach((idx) => {
      newLayout[idx] = SQUARE_STATE.ship_sunk;
    });
  }

  return newLayout;
};
