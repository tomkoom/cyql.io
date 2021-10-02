import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGlobe } from "@fortawesome/free-solid-svg-icons";

import {
	faTwitter,
	faTelegram,
	faDiscord,
	faMedium,
	faGithub,
	faSlack,
} from "@fortawesome/free-brands-svg-icons";

// GOOGLE API
import useGoogleSheets from "use-google-sheets";

// Google Sheets API key
const googleSheetsApiKey = "AIzaSyAYlQkmy6vZa13H5dRahcSaq08P35woTZk";
const googleSheetId = "1gMBz0XnAu4FgiGGotrsi09EjOeIUyX7uO8fHi_k8E3c";

const UpcomingNfts = () => {
	// Google Sheets API

	const { data, loading, error, refetch } = useGoogleSheets({
		apiKey: googleSheetsApiKey,
		sheetId: googleSheetId,
		sheetsNames: ["Upcoming-NFTs"],
	});

	return (
		<>
			{loading ? (
				<div className="center">Loading... ⌛</div>
			) : error ? (
				<div className="center">Error!</div>
			) : (
				<div className="upcoming-nft">
					<Link className="back-btn-link" to="/">
						<div className="back-btn-link__div">
							<FontAwesomeIcon icon={faArrowLeft} />
						</div>
					</Link>
					{/* <button className="refetch-btn" onClick={refetch}>Refetch</button> */}
					<div>
						<p className="body-text center span-color">
							{/* Information on this page should not be considered as financial advice. */}
							Please note: We do not guarantee information
							provided on this page is 100% accurate.
							<br />
							Do your own research.
						</p>
					</div>
					{data[0].data.map((nft) => (
						// Change key
						<div className="upcoming-nft__card" key={nft.Name}>
							<div className="upcoming-nft__card__main">
								<h3 className="upcoming-nft__card__main__title">
									{nft["Name"]}
								</h3>

								<p className="body-text">
									{`${nft["Date"]} ${nft["Time"]} ${nft["Time Zone"]}`}
								</p>
								{console.log(nft["Price"])}
								<p className="body-text span-color">
									{nft["Description"] &&
									nft["Description"].length > 100
										? `${nft["Description"].substring(
												0,
												100
										  )}...`
										: nft["Description"]}
									{console.log(typeof nft["Description"])}
									{/* {console.log(nft["Description"])} */}
								</p>

								<ul className="upcoming-nft__card__main__social-links-list">
									<li
										className="upcoming-nft__card__main__social-links-list__item"
										style={
											nft["Website"]
												? null
												: { display: "none" }
										}
									>
										<a
											href={nft["Website"]}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon
												icon={faGlobe}
												color="#718096"
											/>
										</a>
									</li>

									<li
										className="upcoming-nft__card__main__social-links-list__item"
										style={
											nft["Twitter"]
												? null
												: { display: "none" }
										}
									>
										<a
											href={nft["Twitter"]}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon
												icon={faTwitter}
												color="#718096"
											/>
										</a>
									</li>

									<li
										className="upcoming-nft__card__main__social-links-list__item"
										style={
											nft["Discord"]
												? null
												: { display: "none" }
										}
									>
										<a
											href={nft["Discord"]}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon
												icon={faDiscord}
												color="#718096"
											/>
										</a>
									</li>

									<li
										className="upcoming-nft__card__main__social-links-list__item"
										style={
											nft["Telegram"]
												? null
												: { display: "none" }
										}
									>
										<a
											href={nft["Telegram"]}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon
												icon={faTelegram}
												color="#718096"
											/>
										</a>
									</li>
									<li
										className="upcoming-nft__card__main__social-links-list__item"
										style={
											nft["Dscvr"]
												? null
												: { display: "none" }
										}
									>
										<a
											className="span-color"
											href={nft["Dscvr"]}
											target="_blank"
											rel="noopener noreferrer"
										>
											Dscvr
										</a>
									</li>
									<li
										className="upcoming-nft__card__main__social-links-list__item"
										style={
											nft["Distrikt"]
												? null
												: { display: "none" }
										}
									>
										<a
											className="span-color"
											href={nft["Distrikt"]}
											target="_blank"
											rel="noopener noreferrer"
										>
											Distrikt
										</a>
									</li>
								</ul>
							</div>
							<div className="upcoming-nft__card__img">
								<img
									className="upcoming-nft__card__img__item"
									src={nft["Img1"]}
									alt={nft["Name"]}
								/>
								<img
									className="upcoming-nft__card__img__item"
									src={nft["Img2"]}
									alt={nft["Name"]}
								/>
								<img
									className="upcoming-nft__card__img__item"
									src={nft["Img3"]}
									alt={nft["Name"]}
								/>
								<img
									className="upcoming-nft__card__img__item"
									src={nft["Img4"]}
									alt={nft["Name"]}
								/>

							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default UpcomingNfts;
