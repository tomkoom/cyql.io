import React, { useEffect } from "react";
import css from "./Price.module.css";

// icons
import { iArrowUp, iArrowDown } from "@icons/Icons";

// components
import Change from "./Change/Change";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectIcpPrice, selectIcp24hPriceChange } from "@state/api/icpPrice";
import { fetchIcpPrice } from "@state/api/icpPrice";

const Price = () => {
  const dispatch = useDispatch();
  const price = useSelector(selectIcpPrice);
  const change = useSelector(selectIcp24hPriceChange);
  const second = 1000;

  useEffect(() => {
    dispatch(fetchIcpPrice());
    const interval = setInterval(() => {
      dispatch(fetchIcpPrice());
    }, 60 * second);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={css.price}>
      <img src="https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/ic-logo.svg" alt="icp logo" />
      <p className={css.icp}>{"$" + price}</p>

      {change > 0 ? (
        <Change change={change} icon={iArrowUp} color="var(--colorGreen)" />
      ) : change < 0 ? (
        <Change change={change} icon={iArrowDown} color="var(--colorRed)" />
      ) : (
        <Change change={change} icon="" color="var(--colorNeutral)" />
      )}
    </div>
  );
};

export default Price;
