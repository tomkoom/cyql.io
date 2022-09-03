import React from "react";
import css from "./Exchanges.module.css";

// utils
import { substring } from "../../../Utils/substirng";

const exchanges = [
  {
    id: "mexc",
    label: "MEXC",
    link: "https://www.mexc.com/en-US/register?inviteCode=mexc-cyql",
    logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/exchanges/mexc/mexc-logo.svg",
    description: "MEXC is a secure and reliable Crypto asset exchange.",
  },
  {
    id: "binance",
    label: "Binance",
    link: "https://www.binance.com/en/trade/ICP_BUSD?_from=markets&theme=dark&type=spot",
    logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/exchanges/binance/binance-logo.svg",
    description: "Buy, trade, and hold 350+ cryptocurrencies on Binance.",
  },
];

// get volume
// https://coinmarketcap.com/currencies/internet-computer/markets/
// coigecko api

const Exchanges = () => {
  return (
    <ul className={css.exchanges}>
      {exchanges.map((exchange) => (
        <li className={css.item} key={exchange.id}>
          <a href={exchange.link} rel="noreferrer noopener" target="_blank">
            <img className={css.logo} src={exchange.logo} alt={`${exchange.label}-logo`} />
            <div>
              <h4 className={css.title}>{exchange.label}</h4>
              <p className={css.description}>{substring(exchange.description)}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Exchanges;
