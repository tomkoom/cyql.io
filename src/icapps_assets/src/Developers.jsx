import React, { useEffect } from "react";
import useGoogleSheets from "use-google-sheets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "../../../node_modules/@fortawesome/free-solid-svg-icons/index";
import { motion } from "framer-motion";
import { FramerStyles } from "./FramerStyles";

const googleSheetsApiKey = "AIzaSyAYlQkmy6vZa13H5dRahcSaq08P35woTZk";
const googleSheetId = "1gMBz0XnAu4FgiGGotrsi09EjOeIUyX7uO8fHi_k8E3c";

const Developers = () => {
	const { data, loading, error } = useGoogleSheets({
		apiKey: googleSheetsApiKey,
		sheetId: googleSheetId,
		sheetsNames: ["Developers"],
	});

	useEffect(() => {}, [loading]);

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
							whileHover={FramerStyles.cards.whileHover}
							transition={FramerStyles.cards.transition}
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
