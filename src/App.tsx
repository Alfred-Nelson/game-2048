import { useState } from "react";
import Board from "./components/Board";
import Tile from "./components/Tile";
import useMainGameControls from "./hooks/useMainGameControls";

function App() {
  const [pointer, setPointer] = useState(0);
  const { state: gameState, score } = useMainGameControls(pointer);

  return (
    <div className="h-screen flex flex-col text-white font-semibold text-lg pt-[20vh] items-center bg-[#755F8B]">
      <Board>
        {gameState.map((tile) => (
          <Tile key={tile.id} {...tile} />
        ))}
      </Board>
    </div>
  );
}

export default App;
