import React, { useEffect } from "react";
import "./Developers.css";

// GOOGLE API
import useGoogleSheets from "use-google-sheets";
import k from "../../../../k/k";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "../../../../node_modules/@fortawesome/free-solid-svg-icons/index";

// FRAMER MOTION
import { motion } from "framer-motion";
import { FramerMotionStyles } from "../FramerMotionStyles";

const googleSheetsApiKey = k.GOOGLE_SHEETS_API;
const googleSheetId = k.GOOGLE_SHEET_ID;

const Developers = () => {
	const { data, loading, error } = useGoogleSheets({
		apiKey: googleSheetsApiKey,
		sheetId: googleSheetId,
		sheetsNames: ["Developers"],
	});

	return (
		<section className="developers container1280">
			{/* HERO */}
			<div className="center">
				<h2 className="">🛠️ Developer Resources</h2>
				<p className="body-text2">
					Explore tools, documentations, tutorials and other resources
					for developers.
				</p>
			</div>

			<br />
			<br />

			{/* CONTENT */}
			{loading ? (
				<p className="center">Loading... ⌛</p>
			) : error ? (
				<p className="center">Error!</p>
			) : (
				<div className="developer-resources">
					{data[0].data.map((d, i) => (
						<motion.a
							href={d["URL"]}
							target="_blank"
							rel="noreferrer noopener"
							key={i}
							whileHover={FramerMotionStyles.cards.whileHover}
							transition={FramerMotionStyles.cards.transition}
							className="developer-resources__link-block"
						>
							<div className="developer-resources__link-block__item">
								{d["Cover"] ? (
									<img
										className="developer-resources__link-block__item__cover"
										src={d["Cover"]}
										alt={`${d["Name"]} Cover`}
									/>
								) : null}

								<div className="developer-resources__link-block__item__info">
									<div className="developer-resources__link-block__item__info__main">
										<h3>{d["Name"]}</h3>
										<p className="body-text gray80">
											{d["Description"]}
										</p>
									</div>

									<div className="developer-resources__link-block__item__info__foot">
										<span className="developer-resources__link-block__item__info__tag">
											{d["Tag"]}
										</span>
										<FontAwesomeIcon
											icon={faArrowRight}
											color="rgba(255,255,255,0.3)"
											className="arrow-icon"
										/>
									</div>
								</div>
							</div>
						</motion.a>
					))}
				</div>
			)}
		</section>
	);
};

export default Developers;
