import React from "react";
import css from "./Exchanges.module.css";

const exchanges = [
  {
    label: "Binance",
    link: "https://twitter.com/DfinityApps",
    logo: "",
  },
  { label: "MEXC", link: "https://www.mexc.com/ru-RU/exchange/ICP_USDT", logo: "" },
];

// get volume
// https://coinmarketcap.com/currencies/internet-computer/markets/
// coigecko api

const Exchanges = () => {
  return (
    <ul className={css.exchanges}>
      {exchanges.map(({ label, link, logo }) => (
        <li className={css.linksI} key={label}>
          <a href={link} rel="noreferrer noopener" target="_blank">
            {icon}
            {label} &gt;
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Exchanges;
