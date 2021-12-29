// formatters
const formatter = new Intl.NumberFormat("en-US");
const formatterUsd = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

let nftItem = {};
const nftItemsArrProcessed = [];

export function processNftData(nftItemMarketData, nftItemData, icpPrice, nftItemsArrLength) {
	nftItem = {};

	nftItemMarketData = nftItemMarketData
		.split("\n")
		.map((str) => str.replace(/ /g, "").toLowerCase());

	// Total Assets (num)
	const totalAssets = nftItemMarketData.filter((str) =>
		str.includes("mintednfts:")
	).length
		? parseInt(
			nftItemMarketData
				.filter((str) => str.includes("mintednfts:"))[0]
				.match(/\d/g)
				.join("")
		)
		: parseInt(nftItemData.assets.replace(",", ""));
	// Total Assets (str)
	const totalAssetsFormatted = formatter.format(totalAssets);

	const circulatingNfts = nftItemMarketData
		.filter((str) => str.includes("circulatingnfts:"))
		.toString()
		.replace("circulatingnfts:", "")
		.replace("_", ",");

	const listings = nftItemMarketData
		.filter((str) => str.includes("marketplacelistings:"))
		.toString()
		.replace("marketplacelistings:", "")
		.replace("_", ",");

	const sales = nftItemMarketData
		.filter((str) => str.includes("soldviamarketplace:"))
		.toString()
		.replace("soldviamarketplace:", "")
		.replace("_", ",");

	// Sales in ICP (num)
	const salesInIcp = +nftItemMarketData
		.filter((str) => str.includes("soldviamarketplaceinicp:"))
		.toString()
		.replace("soldviamarketplaceinicp:", "")
		.replace("_", "")
		.replace("icp", "");
	// Sales in ICP (str)
	const salesInIcpFormatted = formatter.format(salesInIcp);

	// Volume in USD (num)
	const volumeInUsd = +(icpPrice * salesInIcp).toFixed(2);
	// Volume in USD (str)
	const volumeInUsdFormatted = formatterUsd.format(volumeInUsd);

	// Average price (num)
	const avgPrice = +nftItemMarketData
		.filter((str) => str.includes("averagepriceicpviamarketplace:"))
		.toString()
		.replace("averagepriceicpviamarketplace:", "")
		.replace("_", ",")
		.replace("icp", "");

	// Market cap in ICP (num)
	const marketCap = +(totalAssets * avgPrice).toFixed(2);
	// Market cap in ICP (str)
	const marketCapFormatted = formatter.format(marketCap);

	// Market cap in USD (num)
	const marketCapUsd = marketCap * icpPrice;
	// Market cap in USD (str)
	const marketCapUsdFormatted = formatterUsd.format(marketCapUsd);

	const profitToAvg =
		nftItemData.maxSalePrice && nftItemData.maxSalePrice != "Airdrop"
			? +(
				((avgPrice - nftItemData.maxSalePrice) / nftItemData.maxSalePrice) *
				100
			).toFixed(2)
			: null;


	nftItem.totalAssets = totalAssets;
	nftItem.totalAssetsFormatted = totalAssetsFormatted;
	nftItem.circulatingNfts = circulatingNfts;
	nftItem.listings = listings;
	nftItem.sales = sales;
	nftItem.salesInIcp = salesInIcp;
	nftItem.salesInIcpFormatted = salesInIcpFormatted;
	nftItem.volumeInUsd = volumeInUsd;
	nftItem.volumeInUsd = volumeInUsdFormatted;
	nftItem.avgPrice = avgPrice;
	nftItem.marketCap = marketCap;
	nftItem.marketCapFormatted = marketCapFormatted;
	nftItem.marketCapUsd = marketCapUsd;
	nftItem.marketCapUsdFormatted = marketCapUsdFormatted;
	nftItem.profitToAvg = profitToAvg;

	nftItem = { ...nftItem, ...nftItemData }

	nftItemsArrProcessed.push(nftItem);

	if (nftItemsArrLength - 1 == nftItemsArrProcessed.length) {
		nftItemsArrProcessed.sort((a, b) => b.salesInIcp - a.salesInIcp);
		return nftItemsArrProcessed;
	}
}



