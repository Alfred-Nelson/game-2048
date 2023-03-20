import React, { useEffect } from "react";
import { LayoutGroup } from "framer-motion"

type BoardPropType = {
  children: React.ReactNode;
  score: number;
}

const Board = ({ children, score = 0 }: BoardPropType) => {

  useEffect(() => {
    if(score > (Number(localStorage.getItem("high-score")) || 0)) {
      localStorage.setItem("high-score", String(score))
    }
  }, [score])

  return (
    <LayoutGroup>
      <div className="mb-[2vh]">
        <h1 className="text-6xl text-white font-bold mb-[5vh] text-center">2048</h1>
        <div
        className="w-full flex gap-x-[1vw] items-center"
        >
          <p>High Score: </p>
          <p className="px-2 rounded-md text-tgrey bg-board mr-[4vw]">{localStorage.getItem("high-score") || 0}</p>
          <p>Score: </p>
          <p className="px-2 rounded-md text-tgrey bg-board">{score}</p>
        </div>
      </div>
    <div className="grid grid-cols-4 grid-rows-4 relative bg-board rounded-md shadow-[0_0_0_8px_#AC9D8F] gap-2">
      {Array.from({ length: 16 }).map((_, id) => (
        <div key={id} className="bg-space w-[16vmin] h-[16vmin] md:w-[12vmin] md:h-[12vmin] rounded-md"></div>
      ))}
      { children }
    </div>
    </LayoutGroup>
  );
};

export default Board;
