import React from "react";
import css from "./Price.module.css";

// icons
import { iArrowUp, iArrowDown } from "../../../Icons/Icons";

// state
import { useSelector } from "react-redux";
import { selectIcpPrice, selectIcp24hPriceChange } from "../../../State/icpPrice";

const PriceChange = ({ priceChange, icon, color }) => {
  return (
    <div className={css.priceChange}>
      <span style={{ color }}>
        {icon ? <span className={css.icon}>{icon}</span> : ""}
        &nbsp;{`${Number(priceChange).toFixed(2)}%`}
      </span>
      &nbsp;
      <span className={css.priceChangeTime}>24h</span>
    </div>
  );
};

const Price = () => {
  const price = useSelector(selectIcpPrice);
  const priceChange = useSelector(selectIcp24hPriceChange);

  return (
    <div className={css.price}>
      <div className={css.content}>
        <p>ICP&nbsp;{`$${price}`}</p>
        <dir>
          {priceChange > 0 ? (
            <PriceChange priceChange={priceChange} icon={iArrowUp} color="#24a148" />
          ) : priceChange < 0 ? (
            <PriceChange priceChange={priceChange} icon={iArrowDown} color="#fa4d56" />
          ) : (
            <PriceChange priceChange={priceChange} icon="" color="#697077" />
          )}
        </dir>
      </div>
    </div>
  );
};

export default Price;
