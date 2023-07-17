import React from "react";
import css from "./NftModal.module.css";

// icons
import { CrossIcon } from "@/components/icons/index";

// components
import { Links } from "./index";

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setNftModal } from "@/state/modals/nftModal";
import { selectTheme } from "@/state/ui/theme";

const NftModal = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const text =
    "cyql nft is the main asset of the project which represents its development progress and will carry a number of utilities which can be used on the platform.";
  const style =
    theme === "light"
      ? { backgroundColor: "rgba(242, 244, 248, 0.8)" }
      : { backgroundColor: "rgba(18, 22, 25, 0.8)" };

  const close = () => {
    dispatch(setNftModal(false));
  };

  return (
    <div className={css.nftModal} style={style} onClick={close}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <div className={css.header}>
          <h3 className={css.title}>cyql nft</h3>
          <CrossIcon onClick={close} />
        </div>
        <p className={css.text}>{text}</p>
        <Links />
      </div>
    </div>
  );
};

export default NftModal;
