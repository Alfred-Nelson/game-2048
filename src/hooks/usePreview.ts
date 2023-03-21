import React, { useEffect, Dispatch, SetStateAction } from "react";

type PreviewHookPropsType = {
  preview: boolean;
  setPreview: Dispatch<SetStateAction<boolean>>;
  pointer: number;
  setPointer: Dispatch<SetStateAction<number>>;
};

/**
 * this hook handles the replay feature.
 * @param param preview and pointer state and setter
 */
const usePreview = ({
  preview,
  setPreview,
  pointer,
  setPointer,
}: PreviewHookPropsType) => {
  /**
   * The effect changes the pointer in every 1 sec there by managing the replay feature
   * 2 sec is a long time.
   */
  useEffect(() => {
    if (preview) {
      const id = setInterval(() => setPointer((prev) => prev - 1), 1000);
      return () => clearInterval(id);
    }
  }, [preview]);

  /**
   * remove the preview state when replay is done.
   */
  useEffect(() => {
    if (!pointer && preview) {
      setPreview(false);
    }
  }, [pointer]);
};

export default usePreview;
