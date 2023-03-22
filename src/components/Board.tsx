import React, { useEffect } from "react";
import { LayoutGroup } from "framer-motion";
import { motion } from "framer-motion"
import { GameStatusType } from "..";

type BoardPropType = {
  children: React.ReactNode;
  score: number;
  gameStatus: GameStatusType;
  pointer: number;
};

const Board = ({ children, score = 0, gameStatus, pointer }: BoardPropType) => {
  useEffect(() => {
    if (score > (Number(localStorage.getItem("high-score")) || 0)) {
      localStorage.setItem("high-score", String(score));
    }
  }, [score]);

  return (
    <section>
      <LayoutGroup>
        <div className="mb-[2vh]">
          <h1 className="text-6xl text-white font-bold mb-[5vh] text-center">
            2048
          </h1>
          <div className="w-full flex flex-wrap gap-x-[1vw] gap-y-[1vh] items-center">
            <div className="flex gap-x-[1vw]">
            <p>High Score: </p>
            <p className="px-2 rounded-md text-tgrey bg-board mr-[4vw]">
              {localStorage.getItem("high-score") || 0}
            </p>
            </div>
            <div className="flex gap-x-[1vw]">
            <p>Score: </p>
            <p className="px-2 rounded-md text-tgrey bg-board">{score}</p>
            </div>
          </div>
        </div>
        <div className="relative flex">
          <div className="grid grid-cols-4 grid-rows-4 relative bg-board rounded-md shadow-[0_0_0_8px_#AC9D8F] gap-2">
            {Array.from({ length: 16 }).map((_, id) => (
              <div
                key={id}
                className="bg-space w-[16vmin] h-[16vmin] md:w-[12vmin] md:h-[12vmin] rounded-md"
              ></div>
            ))}
            {children}
          </div>
          {!gameStatus.includes("PROG") && pointer === 0 && (<motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1}}
          className="absolute text-3xl text-tgrey font-semibold flex justify-center items-center bg-[#FFDEB9]/90 h-full rounded-md w-full shadow-[0_0_0_8px_rgb(255,222,185,0.9)]">
              {gameStatus === "OVER" ? "Game Over 🥲" : "You Won 🎉"}
          </motion.div>)}
        </div>
      </LayoutGroup>
    </section>
  );
};

export default Board;
