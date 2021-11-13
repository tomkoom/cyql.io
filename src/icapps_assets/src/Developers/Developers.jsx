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
		<div className="developers">
			<h2 className="">Developer Resources</h2>
			<br />
			<br />
			<div className="developer-resources">
				{loading ? (
					<div className="center">Loading... ⌛</div>
				) : error ? (
					<div className="center">Error!</div>
				) : (
					data[0].data.map((d) => (
						<motion.a
							href={d["URL"]}
							target="_blank"
							rel="noreferrer noopener"
							key={d["Name"]}
							whileHover={FramerMotionStyles.cards.whileHover}
							transition={FramerMotionStyles.cards.transition}
							className="developer-resources__link-block"
						>
							<div className="developer-resources__link-block__item">
								<h3>{d["Name"]}</h3>
								<br />
								<p>{d["Description"]}</p>
								<br />
								<FontAwesomeIcon icon={faArrowRight} />
							</div>
						</motion.a>
					))
				)}
			</div>
		</div>
	);
};

export default Developers;
