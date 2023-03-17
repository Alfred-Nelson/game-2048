import { useCallback, useState, useEffect } from "react";

export type BoardPositionType = 0 | 1 | 2 | 3;

/**
 * With respect to the board dimensions, return particular tile css position (top or left).
 * Handles screen resize to adjust the tile size accordingly
 */
const useBoardDimensions = () => {
  const [resize, setResize] = useState(0);

  /**
   * Based on resize dependancy,
   * calculates the percent size of the cell
   * with window.innerWidth and window.innerHeight property.
   * then calculates the position with cellSize and the gap between them.
   * @param { BoardPositionType } value x or y value of the tile
   * @return { number } position of tile in px
   */
  const getTilePosition = useCallback(
    (value: BoardPositionType) => {
      const vminVal = Math.min(window.innerWidth, window.innerHeight);
      const cellSize = (12 / 100) * vminVal;
      const gap = 8;
      console.log(value * cellSize + value * gap);
      return value * cellSize + value * gap;
    },
    [resize]
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setResize(entries[0].target.clientWidth);
    });
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, []);

  return {
    /**
     * A function to get the css top/left property value based on the cell the tile is in board
     * @param { BoardPositionType } - x or y value of the tile
     */
    getTilePosition,
  };
};

export default useBoardDimensions;
