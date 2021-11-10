import React, { useState, useEffect } from "react";

const NftList = () => {
	const [nftItems, setNftItems] = useState([]);
	const [loading, setLoading] = useState();

	const fetchNftInfo = async () => {
		setLoading(true);
		function handleFetchRes(data, name, link, img) {
			data = data
				.split("\n")
				.map((str) => str.replace(/ /g, "").toLowerCase());

			const totalAssets = data.filter((str) =>
				str.includes("mintednfts:")
			)
				? data.filter((str) => str.includes("mintednfts:")).toString()
				: "";

			const circulatingNfts = data
				.filter((str) => str.includes("circulatingnfts:"))
				.toString();

			const listings = data
				.filter((str) => str.includes("marketplacelistings:"))
				.toString();

			const sales = data
				.filter((str) => str.includes("soldviamarketplace:"))
				.toString();

			const salesInIcp = data
				.filter((str) => str.includes("soldviamarketplaceinicp:"))
				.toString();

			const avgPrice = data
				.filter((str) => str.includes("averagepriceicpviamarketplace:"))
				.toString();

			const res = {
				name,
				link,
				img,
				totalAssets: totalAssets
					.replace("mintednfts:", "")
					.replace("_", ","),

				circulatingNfts: circulatingNfts
					.replace("circulatingnfts:", "")
					.replace("_", ","),

				listings: listings
					.replace("marketplacelistings:", "")
					.replace("_", ","),

				sales: sales
					.replace("soldviamarketplace:", "")
					.replace("_", ","),

				salesInIcp: salesInIcp
					.replace("soldviamarketplaceinicp:", "")
					.replace("_", ",")
					.replace("icp", ""),

				avgPrice: avgPrice
					.replace("averagepriceicpviamarketplace:", "")
					.replace("_", ",")
					.replace("icp", ""),
			};

			return res;
		}

		// Cronics
		const cronics = fetch(
			"https://e3izy-jiaaa-aaaah-qacbq-cai.raw.ic0.app/"
		)
			.then((res) => res.text())
			.then((data) =>
				handleFetchRes(
					data,
					"Cronics",
					"https://entrepot.app/marketplace/cronics",
					"https://e3izy-jiaaa-aaaah-qacbq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=vfsjk-nakor-uwiaa-aaaaa-b4aaq-maqca-aadet-q"
				)
			);

		// ICPuppies
		const icPuppies = fetch(
			"https://njgly-uaaaa-aaaah-qb6pa-cai.raw.ic0.app/"
		)
			.then((res) => res.text())
			.then((data) =>
				handleFetchRes(
					data,
					"ICPuppies",
					"https://entrepot.app/marketplace/icpuppies",
					"https://njgly-uaaaa-aaaah-qb6pa-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=slkgo-rakor-uwiaa-aaaaa-b4apt-yaqca-aacir-q"
				)
			);

		// ICmojis
		const icMojis = fetch(
			"https://gevsk-tqaaa-aaaah-qaoca-cai.raw.ic0.app/"
		)
			.then((res) => res.text())
			.then((data) =>
				handleFetchRes(
					data,
					"ICmojis",
					"https://entrepot.app/marketplace/icmojis",
					"https://gevsk-tqaaa-aaaah-qaoca-cai.raw.ic0.app/?tokenid=ydcn6-kikor-uwiaa-aaaaa-b4adq-qaqca-aaaj6-q"
				)
			);

		// Starverse
		const starverse = fetch(
			"https://nbg4r-saaaa-aaaah-qap7a-cai.raw.ic0.app/"
		)
			.then((res) => res.text())
			.then((data) =>
				handleFetchRes(
					data,
					"Starverse",
					"https://entrepot.app/marketplace/starverse",
					"https://nbg4r-saaaa-aaaah-qap7a-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=gbxs5-sykor-uwiaa-aaaaa-b4ad7-yaqca-aabj4-a"
				)
			);

		// Internet Astronauts
		const internetAstronauts = fetch(
			"https://sr4qi-vaaaa-aaaah-qcaaq-cai.raw.ic0.app/"
		)
			.then((res) => res.text())
			.then((data) =>
				handleFetchRes(
					data,
					"Internet Astronauts",
					"https://entrepot.app/marketplace/interastrosc",
					"https://sr4qi-vaaaa-aaaah-qcaaq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=3yzwq-iykor-uwiaa-aaaaa-b4aqa-eaqca-aaad5-q"
				)
			);

		// ICTuTs
		const icTuts = fetch("https://ahl3d-xqaaa-aaaaj-qacca-cai.raw.ic0.app/")
			.then((res) => res.text())
			.then((data) =>
				handleFetchRes(
					data,
					"ICTuTs",
					"https://entrepot.app/wallet/ictuts",
					"https://ahl3d-xqaaa-aaaaj-qacca-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=urleq-fikor-uwiaa-aaaaa-cmaaq-qaqca-aaext-a"
				)
			);

		// ICelebrity
		const icelebrity = fetch(
			"https://kss7i-hqaaa-aaaah-qbvmq-cai.raw.ic0.app/"
		)
			.then((res) => res.text())
			.then((data) =>
				handleFetchRes(
					data,
					"ICelebrity",
					"https://entrepot.app/marketplace/icelebrity",
					"https://kss7i-hqaaa-aaaah-qbvmq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=5qg5b-nykor-uwiaa-aaaaa-b4anl-eaqca-aaabb-q"
				)
			);

		// Faceted Meninas
		const facetedMeninas = fetch(
			"https://k4qsa-4aaaa-aaaah-qbvnq-cai.raw.ic0.app/"
		)
			.then((res) => res.text())
			.then((data) =>
				handleFetchRes(
					data,
					"Faceted Meninas",
					"https://entrepot.app/marketplace/faceted-meninas",
					"https://k4qsa-4aaaa-aaaah-qbvnq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=slywj-kykor-uwiaa-aaaaa-b4anl-maqca-aaabc-q"
				)
			);

		// Wing
		const wing = fetch("https://73xld-saaaa-aaaah-qbjya-cai.raw.ic0.app/")
			.then((res) => res.text())
			.then((data) =>
				handleFetchRes(
					data,
					"Wing",
					"https://entrepot.app/marketplace/wing",
					"https://73xld-saaaa-aaaah-qbjya-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=2eyec-cqkor-uwiaa-aaaaa-b4ako-aaqca-aaabl-a"
				)
			);

		// ICPuzzle
		const icPuzzle = fetch(
			"https://owuqd-dyaaa-aaaah-qapxq-cai.raw.ic0.app/"
		)
			.then((res) => res.text())
			.then((data) =>
				handleFetchRes(
					data,
					"ICPuzzle",
					"https://entrepot.app/marketplace/icpuzzle",
					"https://owuqd-dyaaa-aaaah-qapxq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=j4wxy-sakor-uwiaa-aaaaa-b4ad5-4aqca-aaaak-a"
				)
			);

		// ICPBunny
		const icpBunny = fetch(
			"https://q6hjz-kyaaa-aaaah-qcama-cai.raw.ic0.app/"
		)
			.then((res) => res.text())
			.then((data) =>
				handleFetchRes(
					data,
					"ICPBunny",
					"https://entrepot.app/marketplace/icpbunny",
					"https://f2yud-3iaaa-aaaaf-qaehq-cai.raw.ic0.app/Token/1249"
				)
			);

		// ICPunks
		const icPunks = fetch(
			"https://bxdf4-baaaa-aaaah-qaruq-cai.raw.ic0.app/"
		)
			.then((res) => res.text())
			.then((data) =>
				handleFetchRes(
					data,
					"ICPunks",
					"https://entrepot.app/marketplace/icpunks",
					"https://qcg3w-tyaaa-aaaah-qakea-cai.raw.ic0.app/Token/29"
				)
			);

		// ICDrip
		const icDrip = fetch("https://3db6u-aiaaa-aaaah-qbjbq-cai.raw.ic0.app/")
			.then((res) => res.text())
			.then((data) =>
				handleFetchRes(
					data,
					"ICDrip",
					"https://entrepot.app/marketplace/icdrip",
					"https://d3ttm-qaaaa-aaaai-qam4a-cai.raw.ic0.app/?tokenId=5316"
				)
			);

		await Promise.all([
			icPunks,
			cronics,
			icPuppies,
			icDrip,
			icMojis,
			starverse,
			internetAstronauts,
			icTuts,
			icpBunny,
			icPuzzle,
			wing,
			facetedMeninas,
			icelebrity,
		]).then((nftData) => {
			nftData.sort((a, b) =>
				Math.floor(a.salesInIcp) > Math.floor(b.salesInIcp) ? -1 : 1
			);
			setNftItems(nftData);
		});
		setLoading(false);
	};

	useEffect(() => {
		fetchNftInfo();
	}, []);

	return (
		<section className="nft-list">
			<h2>🔥 NFT Collections</h2>

			<table className="nft-table">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Sales in ICP</th>
						<th>Total Sales</th>
						<th>Listings</th>
						<th>Total Assets</th>
						<th>Avg. Price</th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<tr>
							<td>Loading...</td>
							<td>⌛</td>
						</tr>
					) : (
						nftItems.map((nftItem, index) => (
							<tr key={nftItem.name}>
								<td data-label="#">{index + 1}</td>
								<td data-label="Name">
									<a
										href={nftItem.link}
										target="_blank"
										rel="norefferer noopener"
									>
										<img
											src={nftItem.img}
											alt={nftItem.name}
										/>{" "}
										{nftItem.name}
									</a>
								</td>
								<td data-label="Sales in ICP">
									{nftItem.salesInIcp
										? `${nftItem.salesInIcp} ICP`
										: "-"}
								</td>
								<td data-label="Total Sales">
									{nftItem.sales ? nftItem.sales : "-"}
								</td>
								<td data-label="Listings">
									{nftItem.listings ? nftItem.listings : "-"}
								</td>
								<td data-label="Total Assets">
									{nftItem.circulatingNfts
										? nftItem.circulatingNfts
										: nftItem.totalAssets
										? nftItem.totalAssets
										: "-"}
								</td>
								<td data-label="Avg. Price">
									{nftItem.avgPrice
										? `${nftItem.avgPrice} ICP`
										: "-"}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</section>
	);
};

export default NftList;

// fetch()
// 	.then((res) => {
// 		if (res.ok) {
// 			res.text();
// 		} else {
// 			console.log("error");
// 		}
// 	})
// 	.catch((error) => console.log("Error"));
