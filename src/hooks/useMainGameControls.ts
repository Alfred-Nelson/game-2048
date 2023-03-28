import {
  useReducer,
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  RefObject,
} from "react";
import { GameStatusType, TouchCoordType } from "..";
import { checkGameOver, createNewBoardState } from "../utils/helperFunctions";
import { gameReducer } from "../utils/stateFunctions";

/**
 * /**
 * tasks done by the hook:
 * 1. handles movement based on event listener
 * 2. handles score
 * 3. handles doubling nature
 * 4. handles to pointer to act on undo and redo
 * 5. if replay is set removes the movement handler.
 *
 * @param pointer pointer to the gameState in action.
 * @param setPointer change pointer function
 * @param preview state to show whether in replay
 * @returns gameState w.r.t pointer, and overall movement count.
 */
const useMainGameControls = (
  pointer: number,
  setPointer: Dispatch<SetStateAction<number>>,
  preview: boolean,
  setGameStatus: Dispatch<SetStateAction<GameStatusType>>,
  gameStatus: GameStatusType,
  boardRef: RefObject<HTMLDivElement>
) => {
  const initialGameState = useMemo(() => createNewBoardState(2), []);
  const [reset, setReset] = useState(false);
  const [move, setMovement] = useState("");
  const [touchStart, setTouchStart] = useState<TouchCoordType | null>();
  const [movementHistory, dispatch] = useReducer(gameReducer, [
    { state: initialGameState, score: 0 },
  ]);

  /**
   * @param move the movement made - handled from event listener
   * @param pointer the pointer to the movementHistory that show the current game state
   */
  const handleMovement = (move: string, pointer: number) => {
    if (move === "ArrowDown") {
      dispatch({ type: "move-down", payload: { pointer } });
    } else if (move === "ArrowUp") {
      dispatch({ type: "move-up", payload: { pointer } });
    } else if (move === "ArrowLeft") {
      dispatch({ type: "move-left", payload: { pointer } });
    } else if (move === "ArrowRight") {
      dispatch({ type: "move-right", payload: { pointer } });
    }
    setMovement("");
  };

  /**
   * A function to be returned to do reset feature
   */
  const doReset = () => {
    setReset(true);
    setPointer(0);
    setGameStatus("PROGRESS");
  };
  
  const eventHandler = useCallback(
    (e: KeyboardEvent) => setMovement(e.key),
    []
  );

  useEffect(() => {
    if (reset) {
      dispatch({ type: "reset", payload: { pointer } });
    }
  }, [reset]);

  /**
   * This effect handles the keydown event. previously it was directly handled
   * without the move state. but stale nature of closure was not changeing the
   * value of pointer which was essential to have control over when handling
   * the undo and redo property. This effect would only set the event listeners
   * if the preview is not set, ie. while in preview you cannot do a movement.
   */
  useEffect(() => {
    if (preview) return;
    if (!gameStatus.includes("PROG")) return;
    window.addEventListener("keydown", eventHandler);
    return () => window.removeEventListener("keydown", eventHandler);
  }, [preview, gameStatus]);

  /**
   * the effect calls the movment handler function to call the necessary dispatch
   * action of the reducer based on the movement noted from the event listener.
   */
  useEffect(() => {
    if (move) {
      handleMovement(move, pointer);
      setPointer(0);
    }
  }, [move]);

  /**
   * the following effect is to doubling nature of tiles
   * if a tile about to be doubled, the isDoubling property of the tile is set.
   * then after the state change is done, a wait of 200 seconds is done and
   * then the value is doubled and isdoubling is unset.
   * this is to handle the motion animation of tile at movement
   * and then change the value only after the movement animation.
   * here 200 represent the animation time for the movement.
   */
  useEffect(() => {
    if (reset) {
      setReset(false);
      return;
    }
    const currentBoardConfig = movementHistory[pointer].state;
    const hasDoublingTiles = currentBoardConfig.some((tile) => tile.isDoubling);
    const changeAllDoublingTiles = () =>
      currentBoardConfig.forEach((tile) => {
        if (!tile.isDoubling) return;
        tile.value = 2 * tile.value;
        tile.isDoubling = false;
        if (tile.value === 2048 && !gameStatus.includes("WIN")) {
          setGameStatus("WIN");
        }
      });

    if (hasDoublingTiles) {
      const id = setInterval(() => {
        changeAllDoublingTiles();
        dispatch({ type: "refresh", payload: { pointer } });
      }, 200);

      return () => {
        changeAllDoublingTiles();
        clearInterval(id);
      };
    } else {
      if (currentBoardConfig.length === 16) {
        const isGameOver = checkGameOver(currentBoardConfig);
        if (isGameOver) {
          setGameStatus("OVER");
        }
      }
    }
  }, [movementHistory]);

  return {
    ...movementHistory[pointer],
    totalMovements: movementHistory.length,
    doReset,
    setMovement
  };
};

export default useMainGameControls;
