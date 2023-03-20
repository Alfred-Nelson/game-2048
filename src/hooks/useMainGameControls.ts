import {
  useReducer,
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { TouchCoordType } from "..";
import { createNewBoardState } from "../utils/helperFunctions";
import { gameReducer } from "../utils/stateFunctions";

const useMainGameControls = (
  pointer: number,
  setPointer: Dispatch<SetStateAction<number>>,
  preview: boolean
) => {
  const initialConfig = useMemo(() => createNewBoardState(2), []);
  const [move, setMovement] = useState("")
  const [touchStart, setTouchStart] = useState<TouchCoordType | null>();
  const [movementHistory, dispatch] = useReducer(gameReducer, [
    { state: initialConfig, score: 0 },
  ]);

  const handleMovement = (value: string, pointer: number) => {
    if (value === "ArrowDown") {
      dispatch({ type: "move-down", payload: { pointer } });
    } else if (value === "ArrowUp") {
      dispatch({ type: "move-up", payload: { pointer } });
    } else if (value === "ArrowLeft") {
      dispatch({ type: "move-left", payload: { pointer } });
    } else if (value === "ArrowRight") {
      dispatch({ type: "move-right", payload: { pointer } });
    }
    setMovement("")
  };

  //   const handleTouch = (e: TouchEvent) => {
  //     if(e.touches.length !== 1) return
  //     if(!touchStart) return
  //     const { screenX, screenY } = e.touches[0]
  //     const diffX = screenX - touchStart.x
  //     const diffY = screenY - touchStart.y

  //     if(diffX > diffY)
  //   }

  /**
   * Had to change eventlistner handling move due to stale nature of closure
   */
  useEffect(() => {
    if(preview) return
    window.addEventListener("keydown", (e) =>
        setMovement(e.key)
    );
    return () =>
      window.removeEventListener("keydown", () => {});
  }, [preview]);

  /**
   * changing the 
   */
  useEffect(() => {
    if(move) {
        handleMovement(move, pointer)
        setPointer(0)
    }
  }, [move])

  console.log(movementHistory, pointer)

  /**
   * remove the doubling tiles
   */
  useEffect(() => {
    console.log("now this happens")
    const currentBoardConfig = movementHistory[pointer].state;
    const hasDoublingTiles = currentBoardConfig.some((tile) => tile.isDoubling);
    if (hasDoublingTiles) {
      const changeAllDoublingTiles = () =>
        currentBoardConfig.forEach((tile) => {
          if (!tile.isDoubling) return;
          tile.value = 2 * tile.value;
          tile.isDoubling = false;
        });
      const id = setInterval(() => {
        changeAllDoublingTiles();
        dispatch({ type: "refresh", payload: { pointer } });
      }, 200);
      return () => clearInterval(id);
    }
  }, [movementHistory]);

  //   useEffect(() => {
  //     window.addEventListener("touchstart", (e) =>  {
  //         if( e.touches.length !== 1 ) return
  //         setTouchStart({ x: e.touches[0].screenX, y: e.touches[0].screenX })
  //     })
  //     window.addEventListener("touchend", handleTouch )
  //   }, [])

  return { ...movementHistory[pointer], totalMovements: movementHistory.length };
};

export default useMainGameControls;
