export type TileStateType = {
  x: RowOrColumnValueType;
  y: RowOrColumnValueType;
  value: number;
  id: number;
  isDoubling?: boolean;
};

export type BoardStateType = TileStateType[];

export type MovementConfigType = { state: BoardStateType, score: number }

export type GameActionType =
  | "move-left"
  | "move-right"
  | "move-up"
  | "move-down"
  | "reset"
  | "refresh";

export type CoordinateType = {
  x: RowOrColumnValueType;
  y: RowOrColumnValueType;
};

export type RowOrColumnValueType = 0 | 1 | 2 | 3;


export type ActionConfigType = {
    sort: (a: TileStateType, b: TileStateType) => numbers,
    orderAxis: "x" | "y",
    hasEndOffset: boolean
}

export type TouchCoordType = {
    x: number;
    y: number
}

export type GameStatusType = "PROGRESS" | "OVER" | "WIN" | "WIN_PROG"