import React from "react";
import { motion } from "framer-motion";
import useBoardDimensions from "../hooks/useBoardDimensions";
import { RowOrColumnValueType, TileStateType } from "..";

const Tile = ({ x, y, value, id }: TileStateType) => {
  const { getTilePosition } = useBoardDimensions();
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
      className="absolute bg-red-500 rounded-md w-[20vmin] h-[20vmin] md:w-[12vmin] md:h-[12vmin] flex justify-center items-center"
    >
      {value}
    </motion.div>
  );
};

export default Tile;
