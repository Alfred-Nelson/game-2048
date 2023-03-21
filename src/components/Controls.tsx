import React, { Dispatch, SetStateAction } from "react";

type ControlType = {
  totalMovements: number;
  pointer: number;
  preview: boolean;
  setPointer: Dispatch<SetStateAction<number>>;
  setPreview: Dispatch<SetStateAction<boolean>>;
};

const Controls = ({
  totalMovements,
  setPointer,
  pointer,
  preview,
  setPreview,
}: ControlType) => {
  return (
    <section className="w-full md:w-[30vw] flex justify-center items-center">
      <div className="mt-[10vh] max-w-screen flex flex-wrap md:grid md:grid-cols-2 gap-y-[3vh] gap-x-[3vw]">
        <button
          onClick={() =>
            setPointer((prev) => Math.min(prev + 1, totalMovements - 1))
          }
          className={`text-tgrey bg-space px-3 text-2xl md:text-4xl font-semibold rounded-md ${
            pointer < totalMovements - 1 && "opacity-40"
          } `}
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
          className={`text-tgrey bg-space md:order-last px-3 text-2xl md:text-4xl font-semibold rounded-md ${
            totalMovements === 1 && "opacity-40"
          } `}
        >
          {preview ? "pause" : pointer ? "play" : "replay"}
        </button>
        <button
          onClick={() => setPointer((prev) => Math.max(prev - 1, 0))}
          className={`text-tgrey bg-space px-3 text-2xl md:text-4xl font-semibold rounded-md ${
            !pointer && "opacity-40"
          } `}
        >
          redo
        </button>
      </div>
    </section>
  );
};

export default Controls;
