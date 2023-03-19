export type TileStateType = {
  x: RowOrColumnValueType;
  y: RowOrColumnValueType;
  value: number;
  id: number;
};

export type BoardStateType = TileStateType[];

export type MovementConfigType = { state: BoardStateType, score: number }

export type GameActionType =
  | "move-left"
  | "move-right"
  | "move-up"
  | "move-down"
  | "reset";

export type CoordinateType = {
  x: RowOrColumnValueType;
  y: RowOrColumnValueType;
};

export type RowOrColumnValueType = 0 | 1 | 2 | 3;


export type ActionConfigType = {
    sort: (a: TileStateType, b: TileStateType) => numbers,
    orderAxis: "x" | "y",
    hasOffset: boolean
}

export type TouchCoordType = {
    x: number;
    y: number
}