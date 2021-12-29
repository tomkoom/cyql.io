const formatter = new Intl.NumberFormat("en-US");
const formatterUsd = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

const nftItemsArr = [];

export function handleNftData(nftItemMarketDataText, nftListItem, nftListLength, icpPrice) {
	let nftItem = {};

	const nftItemMarketData = nftItemMarketDataText.split("\n")
		.map((str) => str.replace(/ /g, "").toLowerCase())

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
		: parseInt(nftListItem.assets.replace(",", ""));
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
	const marketCapInIcp = +(totalAssets * avgPrice).toFixed(2);
	// Market cap in ICP (str)
	const marketCapInIcpFormatted = formatter.format(marketCapInIcp);

	// Market cap in USD (num)
	const marketCapInUsd = marketCapInIcp * icpPrice;
	// Market cap in USD (str)
	const marketCapInUsdFormatted = formatterUsd.format(marketCapInUsd);

	const profitToAvg =
		nftListItem.maxSalePrice && nftListItem.maxSalePrice != "Airdrop"
			? +(
				((avgPrice - nftListItem.maxSalePrice) / nftListItem.maxSalePrice) *
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
	nftItem.volumeInUsdFormatted = volumeInUsdFormatted;
	nftItem.avgPrice = avgPrice;
	nftItem.marketCapInIcp = marketCapInIcp;
	nftItem.marketCapInIcpFormatted = marketCapInIcpFormatted;
	nftItem.marketCapInUsd = marketCapInUsd;
	nftItem.marketCapInUsdFormatted = marketCapInUsdFormatted;
	nftItem.profitToAvg = profitToAvg;

	nftItem = { ...nftItem, ...nftListItem }

	nftItemsArr.push(nftItem);

	if (nftItemsArr.length === nftListLength) {
		nftItemsArr.sort((a, b) => b.salesInIcp - a.salesInIcp);
		return nftItemsArr;
	}
}