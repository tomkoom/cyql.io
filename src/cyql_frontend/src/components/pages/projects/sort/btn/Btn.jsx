import React from "react";
import css from "./Btn.module.css";

// icons
import { iAngleDown, iSort } from "@/components/icons/Icons";

// state
import { useAppSelector } from "@/hooks/useRedux";
import { selectSort } from "@/state/projects/sort";

const Btn = () => {
  const sort = useAppSelector(selectSort);

  return (
    <button className={css.btn}>
      <span className={css.icon}>{iSort}</span>
      <p>order by:</p>
      <p className={css.category}>
        {sort === "newest-first"
          ? "newest first"
          : sort === "oldest-first"
          ? "oldest first"
          : sort === "most-upvoted"
          ? "most upvoted"
          : sort === "least-upvoted"
          ? "least upvoted"
          : null}
      </p>
      <span className={css.icon}>{iAngleDown}</span>
    </button>
  );
};

export default Btn;
