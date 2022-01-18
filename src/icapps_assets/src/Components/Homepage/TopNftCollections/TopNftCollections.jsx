import React from "react";
import css from "./TopNftCollections.module.css";

const TopNftCollections = ({ nftItems, loader }) => {
  return (
    <div>
      {nftItems && nftItems.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table className={css.topNftTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Volume</th>
                <th>Est.&nbsp;Market&nbsp;Cap</th>
                <th>Avg.&nbsp;Price</th>
                <th>Sales</th>
                <th>Listings</th>
                <th>Minted&nbsp;NFTs</th>
              </tr>
            </thead>
            <tbody>
              {nftItems.slice(0, 10).map((n, i) => (
                <tr key={n.name}>
                  <td>{i + 1}</td>
                  <td>
                    <a
                      className={css.topNftTable__link}
                      href={n.market}
                      target="_blank"
                      rel="norefferer noopener"
                    >
                      <img src={n.img} alt={n.name} />
                      {n.name}
                    </a>
                  </td>

                  <td>{n.salesInIcpFormatted}&nbsp;ICP</td>

                  <td>
                    <div className={css.cell}>
                      {n.marketCapInIcpFormatted}&nbsp;ICP
                      <span className={css.cellSpan}>
                        {n.marketCapInUsdFormatted}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className={css.cell}>
                      {n.avgPrice}&nbsp;ICP
                      <span
                        className={
                          Math.sign(n.profitToAvg) >= 0
                            ? `${css.cellSpan} ${css.green}`
                            : `${css.cellSpan} ${css.red}`
                        }
                      >
                        {n.profitToAvg
                          ? `${n.profitToAvg}% (to max sale price)`
                          : null}
                      </span>
                    </div>
                  </td>

                  <td>{n.sales}</td>
                  <td>{n.listings}</td>
                  <td>{n.totalAssetsFormatted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        loader
      )}
    </div>
  );
};

export default TopNftCollections;
