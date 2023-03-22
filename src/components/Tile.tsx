import React, { useMemo } from "react";
import { motion } from "framer-motion";
import useBoardDimensions from "../hooks/useBoardDimensions";
import { TileStateType } from "..";
import { getColorStyle } from "../utils/constants";

const Tile = ({ x, y, value, id, isDoubling = false }: TileStateType) => {
  const { getTilePosition } = useBoardDimensions();
  const color = useMemo(() => getColorStyle(value), [value, id])

  return (
    <motion.div
      initial={{ scale: 0, top: getTilePosition(y), left: getTilePosition(x) }}
      animate={{
        scale: 1,
        top: getTilePosition(y),
        left: getTilePosition(x),
      }}
      layoutId={`tile_${id}`}
      transition={{ duration: 0.2 }}
      className={`absolute ${color} ${value < 8 ? "text-tgrey" : "text-white"} rounded-md w-[16vmin] h-[16vmin] lg:w-[12vmin] lg:h-[12vmin] md:w-[14vmin] md:h-[14vmin] sm:w-[14vmin] sm:h-[14vmin] font-semibold text-lg sm:text-xl md:text-3xl flex justify-center items-center`}
    >
      {value}
    </motion.div>
  );
};

export default Tile;
