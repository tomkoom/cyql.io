import React, { useState, useEffect } from "react";
import "./NftList.css";
import { fetchNftInfo } from "./FetchNftInfo";

const NftList = () => {
	const [nftItems, setNftItems] = useState([]);
	const [loading, setLoading] = useState();

	useEffect(() => {
		fetchNftInfo(setNftItems, setLoading);
	}, []);

	return (
		<section className="nft-list">
			<h2>NFT Collections</h2>
			<p className="body-text2">
				A list of NFT projects on the Internet Computer.
			</p>

			{loading ? (
				<tr>
					<td>Loading...</td>
					<td>⌛</td>
				</tr>
			) : (
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
							<th>Sale Price</th>
						</tr>
					</thead>
					<tbody>
						{nftItems.map((nftItem, index) => (
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
								<td data-label="Sale Price">
									{nftItem.salePrice
										? nftItem.salePrice
										: "-"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</section>
	);
};

export default NftList;
