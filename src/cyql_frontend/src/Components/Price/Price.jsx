import React, { useEffect } from "react";
import css from "./Price.module.css";

// icons
import { iArrowUp, iArrowDown } from "@icons/Icons";

// components
import PriceChange from "./PriceChange/PriceChange";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectIcpPrice, selectIcp24hPriceChange } from "@state/api/icpPrice";
import { fetchIcpPrice } from "@state/api/icpPrice";

const Price = () => {
  const dispatch = useDispatch();
  const p = useSelector(selectIcpPrice);
  const change = useSelector(selectIcp24hPriceChange);

  const second = 1000;
  const time = 60 * second;

  useEffect(() => {
    dispatch(fetchIcpPrice());
    const interval = setInterval(() => {
      dispatch(fetchIcpPrice());
    }, time);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={css.price}>
      <p className={css.icp}>ICP {"$" + p}</p>

      {change > 0 ? (
        <PriceChange change={change} icon={iArrowUp} color="var(--colorGreen)" />
      ) : change < 0 ? (
        <PriceChange change={change} icon={iArrowDown} color="var(--colorRed)" />
      ) : (
        <PriceChange change={change} icon="" color="var(--colorNeutral)" />
      )}
    </div>
  );
};

export default Price;
