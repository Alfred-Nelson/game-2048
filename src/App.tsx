import { useState, useEffect } from "react";
import { GameStatusType } from ".";
import Board from "./components/Board";
import Controls from "./components/Controls";
import Tile from "./components/Tile";
import useMainGameControls from "./hooks/useMainGameControls";
import usePreview from "./hooks/usePreview";

function App() {
  const [pointer, setPointer] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatusType>("PROGRESS")
  const [preview, setPreview] = useState(false);
  const {
    state: gameState,
    score,
    totalMovements,
    doReset
  } = useMainGameControls(pointer, setPointer, preview, setGameStatus, gameStatus);
  usePreview({ preview, setPointer, setPreview, pointer });

  return (
    <div className="h-[100svh] flex flex-col md:flex-row md:justify-evenly text-white font-semibold text-md md:text-lg pt-[10vh] md:pt-0 items-center bg-[#755F8B]">
      <Board score={score} gameStatus={gameStatus} pointer={pointer}>
        {gameState?.map((tile) => (
          <Tile key={tile.id} {...tile} />
        ))}
      </Board>
      <Controls
        doReset={doReset}
        pointer={pointer}
        preview={preview}
        setPointer={setPointer}
        setPreview={setPreview}
        totalMovements={totalMovements}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
      />
    </div>
  );
}

export default App;
