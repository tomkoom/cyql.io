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
import {
	faCalendar,
	faCalendarAlt,
} from "../../../node_modules/@fortawesome/free-solid-svg-icons/index";

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
					<div className="upcoming-nft-sales-intro">
						<div className="center">
							<h2>Upcoming NFT Sales &#38; Airdrops 🪂</h2>
							<p className="body-text2 span-color">
								{/* Information on this page should not be considered as financial advice. */}
								Please note: We do not guarantee information
								provided on this page is 100% accurate. Please
								do your own research.
							</p>
							<br />
							<a
								className="submit-btn"
								href="https://forms.gle/rFsaFEj3N8mgF9tz6"
								target="_blank"
								rel="noreferrer noopener"
							>
								Submit your project to the list
							</a>
						</div>
					</div>

					{data[0].data.map((nft) => (
						// Change key
						<div className="upcoming-nft__card" key={nft.Name}>
							<div className="upcoming-nft__card__main">
								<div className="upcoming-nft__card__main__heading">
									<h3 className="upcoming-nft__card__main__heading__title">
										{nft["Name"]}
									</h3>
									<div></div>
									<div className="upcoming-nft__card__main__heading__date">
										<FontAwesomeIcon
											icon={faCalendarAlt}
											color="#cbd5e0"
											style={{ marginTop: "4px" }}
										/>
										<p className="body-text">
											{`${nft["Date"]} ${nft["Time"]} ${nft["Time Zone"]}`}
										</p>
									</div>
								</div>

								<p className="body-text span-color">
									{nft["Description"] &&
									nft["Description"].length > 140
										? `${nft["Description"].substring(
												0,
												140
										  )}...`
										: nft["Description"]}
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
								{nft["Img2"] ? (
									<img
										className="upcoming-nft__card__img__item"
										src={nft["Img1"]}
										alt={`${nft["Name"]} img #1`}
									/>
								) : null}

								{nft["Img2"] ? (
									<img
										className="upcoming-nft__card__img__item"
										src={nft["Img2"]}
										alt={`${nft["Name"]} img #2`}
									/>
								) : null}

								{nft["Img3"] ? (
									<img
										className="upcoming-nft__card__img__item"
										src={nft["Img3"]}
										alt={`${nft["Name"]} img #3`}
									/>
								) : null}

								{nft["Img4"] ? (
									<img
										className="upcoming-nft__card__img__item"
										src={nft["Img4"]}
										alt={`${nft["Name"]} img #4`}
									/>
								) : null}
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default UpcomingNfts;
