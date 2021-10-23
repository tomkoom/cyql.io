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

			const totalAssets = data
				.filter((str) => str.includes("mintednfts:"))
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
					"https://sr4qi-vaaaa-aaaah-qcaaq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=774s3-2qkor-uwiaa-aaaaa-b4aqa-eaqca-aabvz-a"
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
					"https://k4qsa-4aaaa-aaaah-qbvnq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=h6loz-3ikor-uwiaa-aaaaa-b4anl-maqca-aaaax-q"
				)
			);

		await Promise.all([
			icPuppies,
			internetAstronauts,
			starverse,
			icelebrity,
			facetedMeninas,
		]).then((nftData) => {
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
						<th>Total Assets</th>
						<th>Listings</th>
						<th>Sales</th>
						<th>Sales in ICP</th>
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
						nftItems
							.sort((a, b) =>
								Math.floor(a.salesInIcp) >
								Math.floor(b.salesInIcp)
									? -1
									: 1
							)
							.map((nftItem, index) => (
								<tr key={nftItem.name}>
									<td>{index + 1}</td>
									<td>
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
									<td>{nftItem.totalAssets}</td>
									<td>{nftItem.listings}</td>
									<td>{nftItem.sales}</td>
									<td>{nftItem.salesInIcp}</td>
									<td>{nftItem.avgPrice} ICP</td>
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
