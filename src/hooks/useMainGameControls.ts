import { useReducer, useEffect, useMemo, useState } from "react";
import { TouchCoordType } from "..";
import { createNewBoardState } from "../utils/helperFunctions";
import { gameReducer } from "../utils/stateFunctions";

const useMainGameControls = (pointer: number) => {
  const initialConfig = useMemo(() => createNewBoardState(2), []);
  const [touchStart, setTouchStart] = useState< TouchCoordType | null >()
  const [movementHistory, dispatch] = useReducer(gameReducer, [
    { state: initialConfig, score: 0 },
  ]);

  const handleArrowKeyPress = (value: string) => {
    if(value === "ArrowDown" ) {
        dispatch({ type: "move-down", payload: { pointer }})
    } else if(value === "ArrowUp") {
        dispatch({ type: "move-up", payload: { pointer }})
    } else if(value === "ArrowLeft") {
        dispatch({ type: "move-left", payload: { pointer } })
    } else if(value === "ArrowRight") {
        dispatch({ type: "move-right", payload: { pointer }})
    }
  }

//   const handleTouch = (e: TouchEvent) => {
//     if(e.touches.length !== 1) return
//     if(!touchStart) return
//     const { screenX, screenY } = e.touches[0]
//     const diffX = screenX - touchStart.x
//     const diffY = screenY - touchStart.y

//     if(diffX > diffY) 
//   }

  useEffect(() => {
    window.addEventListener("keydown", (e) =>  handleArrowKeyPress(e.key) )
    return(() => window.removeEventListener("keydown", (e) => handleArrowKeyPress(e.key)))
  }, [])

//   useEffect(() => {
//     window.addEventListener("touchstart", (e) =>  {
//         if( e.touches.length !== 1 ) return
//         setTouchStart({ x: e.touches[0].screenX, y: e.touches[0].screenX })
//     })
//     window.addEventListener("touchend", handleTouch )
//   }, [])

  return { ...movementHistory[pointer] };
};

export default useMainGameControls;
