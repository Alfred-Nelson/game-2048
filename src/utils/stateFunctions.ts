import { ActionConfigType, GameActionType, MovementConfigType } from "..";
import { actionConfig } from "./constants";
import { createNewBoardState, makeMove } from "./helperFunctions";

/**
 * 
 * @param movementHistory all movement ever done.
 * @param action has movement type and pointer
 * @returns new movement history
 */
const gameReducer = (
  movementHistory: MovementConfigType[],
  action: { type: GameActionType; payload: { pointer: number } }
) => {
  const {
    type,
    payload: { pointer },
  } = action;
  let newConfig;
  switch (type) {
    case "move-down":
      newConfig = makeMove(
        actionConfig.down as ActionConfigType,
        movementHistory[pointer]
      );
      return [newConfig, ...movementHistory.slice(pointer)];
    case "move-up":
      newConfig = makeMove(
        actionConfig.up as ActionConfigType,
        movementHistory[pointer]
      );
      return [newConfig, ...movementHistory.slice(pointer)];
    case "move-left":
      newConfig = makeMove(
        actionConfig.left as ActionConfigType,
        movementHistory[pointer]
      );
      return [newConfig, ...movementHistory.slice(pointer)];
    case "move-right":
      newConfig = makeMove(
        actionConfig.right as ActionConfigType,
        movementHistory[pointer]
      );
      return [newConfig, ...movementHistory.slice(pointer)];
    case "reset":
      return [{state: [ ...createNewBoardState(2) ], score: 0}]
    default:
      return [...movementHistory];
  }
};

export { gameReducer };
