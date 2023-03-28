import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  TouchEventHandler,
  useEffect,
  useState,
} from "react";
import { LayoutGroup } from "framer-motion";
import { motion } from "framer-motion";
import {
  ActionConfigType,
  GameActionType,
  GameStatusType,
  TouchCoordType,
} from "..";

type BoardPropType = {
  children: React.ReactNode;
  score: number;
  gameStatus: GameStatusType;
  pointer: number;
  preview: boolean;
  setMovement: Dispatch<SetStateAction<string>>;
};

const Board = ({
  children,
  score = 0,
  gameStatus,
  pointer,
  setMovement,
  preview,
}: BoardPropType) => {
  const [touchStart, setTouchStart] = useState<TouchCoordType | null>();

  const handleTouchEnd = (e: any) => {
    console.log("hello");
    // if (e.touches.length !== 1) return;
    if (!touchStart) return;
    const { screenX, screenY } = e.changedTouches[0];
    const diffX = screenX - touchStart.x;
    const diffY = screenY - touchStart.y;

    console.log(
      diffX,
      diffY,
      Math.abs(diffX * 2) > Math.abs(diffY),
      Math.abs(diffY * 2) > Math.abs(diffX)
    );
    if (Math.abs(diffX * 2) > Math.abs(diffY)) {
      if (diffX > 0) {
        setMovement("ArrowRight");
      } else {
        setMovement("ArrowLeft");
      }
    } else if (Math.abs(diffY * 2) > Math.abs(diffX)) {
      if (diffY > 0) {
        setMovement("ArrowDown");
      } else {
        setMovement("ArrowUp");
      }
    }
  };

  const handleTouchStart = (e: any) => {
    if (e.touches.length !== 1) return;
    console.log("hello");
    setTouchStart({ x: e.touches[0].screenX, y: e.touches[0].screenY });
  };

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
          <div className="w-full flex flex-wrap gap-y-[1vh] items-center">
            <div className="w-[50%] flex gap-x-[1vw]">
              <p>High Score: </p>
              <p className="px-2 rounded-md text-tgrey bg-board mr-[4vw]">
                {localStorage.getItem("high-score") || 0}
              </p>
            </div>
            <div className="w-[50%] flex gap-x-[1vw]">
              <p>Score: </p>
              <p className="px-2 rounded-md text-tgrey bg-board">{score}</p>
            </div>
          </div>
        </div>
        <div className="relative flex">
          <div
            onTouchStart={(e) => {
              if (preview || !gameStatus.includes("PROG")) return;
              handleTouchStart(e);
            }}
            onTouchEnd={(e) => {
              if (preview || !gameStatus.includes("PROG")) return;
              handleTouchEnd(e);
            }}
            className="grid grid-cols-4 grid-rows-4 relative bg-board rounded-md shadow-[0_0_0_8px_#AC9D8F] gap-2"
          >
            {Array.from({ length: 16 }).map((_, id) => (
              <div
                key={id}
                className="bg-space w-[16vmin] h-[16vmin] lg:w-[12vmin] sm:w-[14vmin] sm:h-[14vmin] lg:h-[12vmin] md:w-[14vmin] md:h-[14vmin] rounded-md"
              ></div>
            ))}
            {children}
          </div>
          {!gameStatus.includes("PROG") && pointer === 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute text-3xl text-tgrey font-semibold flex justify-center items-center bg-[#FFDEB9]/90 h-full rounded-md w-full shadow-[0_0_0_8px_rgb(255,222,185,0.9)]"
            >
              {gameStatus === "OVER" ? "Game Over 🥲" : "You Won 🎉"}
            </motion.div>
          )}
        </div>
      </LayoutGroup>
    </section>
  );
};

export default Board;
