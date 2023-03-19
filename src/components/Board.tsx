import React from "react";
import { LayoutGroup } from "framer-motion"

type BoardPropType = {
  children: React.ReactNode
}

const Board = ({ children }: BoardPropType) => {
  return (
    <LayoutGroup>
    <div className="grid grid-cols-4 grid-rows-4 relative bg-white rounded-md shadow-[0_0_0_8px_white] gap-2">
      {Array.from({ length: 16 }).map((_, id) => (
        <div key={id} className="bg-slate-600 w-[20vmin] h-[20vmin] md:w-[12vmin] md:h-[12vmin] rounded-md"></div>
      ))}
      { children }
    </div>
    </LayoutGroup>
  );
};

export default Board;
