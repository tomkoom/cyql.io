import React from "react";
import css from "./Exchanges.module.css";

// icons
import { iAngleRight } from "@/components/icons/Icons";

// utils
import { substring70 } from "@/utils/substring";

const exchanges = [
  {
    id: "binance",
    label: "Binance",
    link: "https://accounts.binance.com/ru/register?ref=94453471",
    logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/exchanges/binance/binance-logo.svg",
    description: "Buy, trade, and hold 350+ cryptocurrencies on Binance.",
  },
  {
    id: "mexc",
    label: "MEXC",
    link: "https://www.mexc.com/en-US/register?inviteCode=mexc-16tN8",
    logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/exchanges/mexc/mexc-logo.svg",
    description: "MEXC is a secure and reliable Crypto asset exchange.",
  },
  {
    id: "coinbase",
    label: "Coinbase",
    link: "https://pro.coinbase.com/trade/ICP-USD",
    logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/exchanges/coinbase/coinbase-logo.svg",
    description:
      "Coinbase is a secure online platform for buying, selling, transferring, and storing cryptocurrency.",
  },
  {
    id: "gate-io",
    label: "Gate.io",
    link: "https://www.gate.io/ru/trade/icp_usdt",
    logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/exchanges/gate-io/gate-io-logo.svg",
    description: "Trade over 1,400 cryptocurrencies safely, quickly, and easily.",
  },
  {
    id: "kucoin",
    label: "KuCoin",
    link: "https://www.kucoin.com/trade/ICP-USDT",
    logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/exchanges/kucoin/kucoin-logo.svg",
    description:
      "KuCoin is a secure cryptocurrency exchange that makes it easier to buy, sell, and store cryptocurrencies like BTC, ETH, KCS, SHIB, DOGE, Gari etc.",
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
            {exchange.logo && (
              <img className={css.logo} src={exchange.logo} alt={`${exchange.label}-logo`} />
            )}
            <div>
              <h4 className={css.title}>{exchange.label}</h4>
              <p className={css.description}>{substring70(exchange.description)}</p>
            </div>
            <div>
              <span className={css.icon}>{iAngleRight}</span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Exchanges;
