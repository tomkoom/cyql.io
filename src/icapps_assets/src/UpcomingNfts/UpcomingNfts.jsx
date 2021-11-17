import React from "react";
import "./UpcomingNfts.css";
import { Link } from "react-router-dom";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faGlobe,
	faCalendarAlt,
	faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
	faTwitter,
	faTelegram,
	faDiscord,
} from "@fortawesome/free-brands-svg-icons";

// FRAMER MOTION
import { motion } from "framer-motion";
import { FramerMotionStyles } from "../FramerMotionStyles";

// GOOGLE API
import useGoogleSheets from "use-google-sheets";
import k from "../../../../k/k";

const googleSheetsApiKey = k.GOOGLE_SHEETS_API;
const googleSheetId = k.GOOGLE_SHEET_ID;

const UpcomingNfts = () => {
	const { data, loading, error } = useGoogleSheets({
		apiKey: googleSheetsApiKey,
		sheetId: googleSheetId,
		sheetsNames: ["Upcoming-NFTs"],
	});

	return (
		<section className="upcoming-nft container768">
			<Link className="back-btn" to="/">
				<motion.div
					whileHover={FramerMotionStyles.buttons.whileHover}
					transition={FramerMotionStyles.buttons.transition}
					className="back-btn__div"
				>
					<FontAwesomeIcon icon={faArrowLeft} />
				</motion.div>
			</Link>

			<div className="upcoming-nft-sales-intro center">
				<h2>Upcoming NFT Sales &#38; Airdrops</h2>
				<p className="body-text2">
					{/* Information on this page should not be considered as financial advice. */}
					Please note: We do not guarantee information provided on
					this page is 100% accurate. Please do your own research.
				</p>
				<div className="media-partner-badge">
					<p className="subtitle opacity66">Media Partners</p>

					<div className="media-partner-badge__logo-container bold">
						<img
							className="media-partner-logo"
							src="https://i.postimg.cc/50PprTYH/golka-userimg-rec.png"
							alt="Golka User Image"
						/>
						Golka
					</div>

					<div className="media-partner-badge__logo-container bold">
						<img
							className="media-partner-logo"
							src="https://i.postimg.cc/bYVLq76L/entrepot-logo-168.png"
							alt="Entrepot logo"
						/>
						Entrepot
					</div>
				</div>
				<a
					className="submit-btn"
					href="https://forms.gle/rSxVndkZCkSpnfph7"
					target="_blank"
					rel="noreferrer noopener"
				>
					Submit your project to the list
				</a>
			</div>

			{loading ? (
				<div className="center">
					<p className="body-text">Loading... ⌛</p>
				</div>
			) : error ? (
				<div className="center">
					<p className="body-text">Error!</p>{" "}
				</div>
			) : (
				<>
					{data[0].data.map((nft) => (
						// Change key
						<div className="upcoming-nft__card" key={nft.Name}>
							<div className="upcoming-nft__card__main">
								<div className="upcoming-nft__card__main__heading">
									<h3 className="upcoming-nft__card__main__heading__title">
										{nft["Name"]}
									</h3>

									{nft["Date"] === "Sale is open" ? (
										<motion.div
											data-value="btn"
											whileHover={
												FramerMotionStyles.buttons
													.whileHover
											}
											transition={
												FramerMotionStyles.buttons
													.transition
											}
											className="upcoming-nft__card__main__heading__date"
										>
											<a
												href={nft["Marketplace Link"]}
												target="_blank"
												rel="norefferrer noopener"
												className="btn"
											>
												Sale is open{" "}
												<FontAwesomeIcon
													icon={faArrowRight}
													color="rgba(255,255,255,0.3)"
												/>
											</a>
										</motion.div>
									) : (
										<div className="upcoming-nft__card__main__heading__date">
											<div>
												<FontAwesomeIcon
													icon={faCalendarAlt}
													color="#484644"
												/>

												<p className="body-text">
													{`${nft["Date"]} ${nft["Time"]} ${nft["Time Zone"]}`}
												</p>
											</div>
										</div>
									)}

									{nft["Sale Info"] ? (
										<p>{nft["Sale Info"]}</p>
									) : null}
								</div>

								<p className="body-text ">
									{nft["Description"] &&
									nft["Description"].length > 280
										? `${nft["Description"].substring(
												0,
												280
										  )}...`
										: nft["Description"]}
								</p>
								<p className="body-text opacity66">
									{nft["Total NFTs"]
										? `Total Assets 🗿 ${nft["Total NFTs"]}`
										: null}
									{nft["Total NFTs"] &&
									nft["Price"] !== "TBA" &&
									nft["Price"]
										? " · "
										: null}
									{nft["Price"] !== "TBA" && nft["Price"]
										? `Unit Price ${nft["Price"]}`
										: null}
								</p>

								<ul className="upcoming-nft__card__main__social-links-list">
									<motion.li
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
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
											<FontAwesomeIcon icon={faGlobe} />
										</a>
									</motion.li>

									<motion.li
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
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
											<FontAwesomeIcon icon={faTwitter} />
										</a>
									</motion.li>

									<motion.li
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
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
											<FontAwesomeIcon icon={faDiscord} />
										</a>
									</motion.li>

									<motion.li
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
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
											/>
										</a>
									</motion.li>
									<motion.li
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
										className="upcoming-nft__card__main__social-links-list__item"
										style={
											nft["Dscvr"]
												? null
												: { display: "none" }
										}
									>
										<a
											href={nft["Dscvr"]}
											target="_blank"
											rel="noopener noreferrer"
										>
											Dscvr
										</a>
									</motion.li>
									<motion.li
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
										className="upcoming-nft__card__main__social-links-list__item"
										style={
											nft["Distrikt"]
												? null
												: { display: "none" }
										}
									>
										<a
											href={nft["Distrikt"]}
											target="_blank"
											rel="noopener noreferrer"
										>
											Distrikt
										</a>
									</motion.li>
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
				</>
			)}
		</section>
	);
};

export default UpcomingNfts;
