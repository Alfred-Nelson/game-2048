import React, { Dispatch, SetStateAction } from "react";
import { GameStatusType } from "..";

type ControlType = {
  totalMovements: number;
  pointer: number;
  preview: boolean;
  setPointer: Dispatch<SetStateAction<number>>;
  setPreview: Dispatch<SetStateAction<boolean>>;
  doReset: () => void;
  gameStatus: GameStatusType;
  setGameStatus: Dispatch<SetStateAction<GameStatusType>>;
};

const Controls = ({
  totalMovements,
  setPointer,
  pointer,
  preview,
  setPreview,
  doReset,
  gameStatus,
  setGameStatus,
}: ControlType) => {
  const buttonStyle = "text-tgrey bg-space px-3 text-xl lg:text-2xl md:text-4xl font-semibold rounded-md";
  return (
    <section className="w-full md:w-[30vw] flex justify-center items-center px-5">
      <div className="mt-[10vh] max-w-screen flex justify-center flex-wrap md:grid md:grid-cols-2 gap-y-[3vh] gap-x-[3vw]">
        <button
          onClick={() =>
            setPointer((prev) => Math.min(prev + 1, totalMovements - 1))
          }
          className={`${buttonStyle} md:order-1 ${pointer >= totalMovements - 1 && "opacity-40"} `}
        >
          undo
        </button>
        <button
          onClick={() => {
            if (totalMovements === 1) return;
            if (preview) {
              setPreview(false);
              return;
            }
            if (!pointer) {
              setPointer(totalMovements);
            }
            setPreview(true);
          }}
          className={`${buttonStyle} md:order-3 ${totalMovements === 1 && "opacity-40"} `}
        >
          {preview ? "pause" : pointer ? "play" : "replay"}
        </button>
        {!preview && pointer ? (
          <button onClick={() => setPointer(0)} className={`${buttonStyle} md:order-4`}>
            return
          </button>
        ) : null}
        <button
          onClick={() => setPointer((prev) => Math.max(prev - 1, 0))}
          className={`${buttonStyle} md:order-2 ${!pointer && "opacity-40"} `}
        >
          redo
        </button>
        <button onClick={() => {
          if(preview) return
            doReset()
        }} className={`${buttonStyle} md:order-5 ${preview && "opacity-40"}`}>
          reset
        </button>
        {gameStatus === "WIN" && (
          <button onClick={() => setGameStatus("WIN_PROG")} className={`${buttonStyle} md:order-last ${preview && "opacity-40"}`}>
            continue
          </button>
        )}
      </div>
    </section>
  );
};

export default Controls;
