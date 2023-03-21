import { useState, useEffect } from "react";
import Board from "./components/Board";
import Controls from "./components/controls";
import Tile from "./components/Tile";
import useMainGameControls from "./hooks/useMainGameControls";
import usePreview from "./hooks/usePreview";

function App() {
  const [pointer, setPointer] = useState(0);
  const [preview, setPreview] = useState(false);
  const {
    state: gameState,
    score,
    totalMovements,
  } = useMainGameControls(pointer, setPointer, preview);
  usePreview({ preview, setPointer, setPreview, pointer });

  return (
    <div className="h-[100svh] flex flex-col md:flex-row md:justify-evenly text-white font-semibold text-lg pt-[10vh] md:pt-0 items-center bg-[#755F8B]">
      <Board score={score}>
        {gameState?.map((tile) => (
          <Tile key={tile.id} {...tile} />
        ))}
      </Board>
      <Controls
        pointer={pointer}
        preview={preview}
        setPointer={setPointer}
        setPreview={setPreview}
        totalMovements={totalMovements}
      />
    </div>
  );
}

export default App;
