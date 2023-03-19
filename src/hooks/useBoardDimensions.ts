import { useCallback, useState, useEffect } from "react";
import { RowOrColumnValueType } from "..";

/**
 * With respect to the board dimensions, return particular tile css position (top or left).
 * Handles screen resize to adjust the tile size accordingly
 */
const useBoardDimensions = () => {
  const [resize, setResize] = useState(0);

  /**
   * Based on resize dependancy,
   * calculates the percent size of the cell
   * with window.innerWidth and window.innerHeight property. Takes in row position or column position
   * then calculates the position_in_px with cellSize and the gap between them.
   * @param { RowOrColumnValueType } value x or y value of the tile
   * @return { number } position of tile in px
   */
  const getTilePosition = useCallback(
    (value: RowOrColumnValueType) => {
      const vminVal = Math.min(window.innerWidth, window.innerHeight);
      const spaceSize = vminVal >= 768 ? 12 : 20
      const cellSize = (spaceSize / 100) * vminVal;
      const gap = 8;
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
     * A function to get the css top/left property value based on the row or column position the tile is in board
     */
    getTilePosition,
  };
};

export default useBoardDimensions;
