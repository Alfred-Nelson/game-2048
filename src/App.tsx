import { useCallback, useState } from "react";
import useBoardDimensions, {
  BoardPositionType,
} from "./hooks/useBoardDimensions";
import { motion } from "framer-motion";

function App() {
  const { getTilePosition } = useBoardDimensions();
  const [x, setX] = useState<BoardPositionType>(0);
  const [y, setY] = useState<BoardPositionType>(0);

  return (
    <div className="h-screen flex flex-col text-white font-semibold text-lg justify-center items-center bg-[#755F8B]">
      <div className="flex mb-10 gap-x-5">
        <label>
          <span>X:</span>
          <input
            className="min-w-[10vw] ml-2 text-black pl-2"
            type="number"
            max={3}
            min={0}
            value={x}
            onChange={(e) =>
              setX(parseInt(e.target.value) as BoardPositionType)
            }
          />
        </label>
        <label>
          <span>Y:</span>
          <input
            className="min-w-[10vw] ml-2 text-black pl-2"
            type="number"
            max={3}
            min={0}
            value={y}
            onChange={(e) =>
              setY(parseInt(e.target.value) as BoardPositionType)
            }
          />
        </label>
      </div>
      <div className="grid grid-cols-4 grid-rows-4 relative bg-white rounded-md shadow-[0_0_0_8px_white] gap-2">
        {Array.from({ length: 16 }).map(() => (
          <div className="bg-slate-600 w-[12vmin] h-[12vmin] rounded-md"></div>
        ))}
        <motion.div
          initial={{ scale: 0, top: 0, left: 0}}
          animate={{ scale: 1,  top: getTilePosition(x), left: getTilePosition(y) }}
          transition={{ duration: 0.2 }}
          className="absolute bg-red-500 rounded-md w-[12vmin] h-[12vmin]"
        ></motion.div>
      </div>
    </div>
  );
}

export default App;
