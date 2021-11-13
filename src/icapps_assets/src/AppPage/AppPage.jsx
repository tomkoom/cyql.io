import React, { useState } from "react";
import "./AppPage.css";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FramerMotionStyles } from "../FramerMotionStyles";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
	faTwitter,
	faTelegram,
	faDiscord,
	faMedium,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
	faGlobe,
	faArrowRight,
} from "../../../../node_modules/@fortawesome/free-solid-svg-icons/index";

const AppPage = ({ data }) => {
	const { id } = useParams();

	return (
		<div className="app-page">
			<Link className="back-btn" to="/">
				<motion.div
					className="back-btn__div"
					whileHover={FramerMotionStyles.buttons.whileHover}
					transition={FramerMotionStyles.buttons.transition}
				>
					<FontAwesomeIcon icon={faArrowLeft} />
				</motion.div>
			</Link>
			{data[0]
				? data[0].data
						.filter((d) => d.id === id)
						.map((d) => (
							<div key={d.id} className="app-item">
								<div
									className="app-item__app-cover"
									style={{
										backgroundImage: `url(${d.cover})`,
									}}
								></div>
								<div className="app-item__app-info">
									<img
										className="app-list__app-info__logo"
										src={d.logo}
										alt={d.name}
									/>
									<div className="app-item__app-info_app-caption">
										<h2 className="app-name">{d.name}</h2>
										<p className="body-text">
											<span className="span-color">
												{d.category}
											</span>
										</p>
									</div>
								</div>

								<p className="body-text">{d.description}</p>
								<br />

								<motion.div
									className="app-item__trade-btn"
									data-value="btn"
									whileHover={
										FramerMotionStyles.buttons.whileHover
									}
									transition={
										FramerMotionStyles.buttons.transition
									}
									style={
										d.marketUrl ? null : { display: "none" }
									}
								>
									<a
										href={d.marketUrl}
										target="_blank"
										rel="norefferrer noopener"
										className="btn"
									>
										Trade{" "}
										<FontAwesomeIcon
											icon={faArrowRight}
											color="rgba(255,255,255,0.3)"
										/>
									</a>
								</motion.div>

								<p
									style={
										d.canister || d.dscvr || d.distrikt
											? null
											: { display: "none" }
									}
								>
									IC Ecosystem
								</p>
								<ul
									className="app-item__social-icons-list"
									style={
										d.canister || d.dscvr || d.distrikt
											? null
											: { display: "none" }
									}
								>
									<motion.li
										data-social="Canister"
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
										className="app-item__social-icons-list__item"
										style={
											d.canister
												? null
												: { display: "none" }
										}
									>
										<a
											href={d.canister}
											target="_blank"
											rel="noopener noreferrer"
										>
											🛢️
										</a>
									</motion.li>
									<motion.li
										data-social="Dscvr"
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
										className="app-item__social-icons-list__item"
										style={
											d.dscvr ? null : { display: "none" }
										}
									>
										<a
											href={d.dscvr}
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												src="https://i.postimg.cc/ZqN5BX1m/dscvr.jpg"
												alt={`${d.name} Dscvr`}
											/>
										</a>
									</motion.li>
									<motion.li
										data-social="Distrikt"
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
										className="app-item__social-icons-list__item"
										style={
											d.distrikt
												? null
												: { display: "none" }
										}
									>
										<a
											href={d.distrikt}
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												src="https://i.postimg.cc/YqcjBq5f/distrikt-app-logo.jpg"
												alt={`${d.name} Distrikt`}
											/>
										</a>
									</motion.li>
								</ul>
								<p
									style={
										d.website ||
										d.discord ||
										d.github ||
										d.telegram ||
										d.medium
											? null
											: { display: "none" }
									}
								>
									Social Media
								</p>
								<ul
									className="app-item__social-icons-list"
									style={
										d.website ||
										d.discord ||
										d.github ||
										d.telegram ||
										d.medium
											? null
											: { display: "none" }
									}
								>
									<motion.li
										data-social="Website"
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
										className="app-item__social-icons-list__item"
										style={
											d.website
												? null
												: { display: "none" }
										}
									>
										<a
											href={d.website}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon icon={faGlobe} />
										</a>
									</motion.li>

									<motion.li
										data-social="Twitter"
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
										className="app-item__social-icons-list__item"
										style={
											d.twitter
												? null
												: { display: "none" }
										}
									>
										<a
											href={d.twitter}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon icon={faTwitter} />
										</a>
									</motion.li>
									<motion.li
										data-social="Discord"
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
										className="app-item__social-icons-list__item"
										style={
											d.discord
												? null
												: { display: "none" }
										}
									>
										<a
											href={d.discord}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon icon={faDiscord} />
										</a>
									</motion.li>
									<motion.li
										data-social="GitHub"
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
										className="app-item__social-icons-list__item"
										style={
											d.github
												? null
												: { display: "none" }
										}
									>
										<a
											href={d.github}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon icon={faGithub} />
										</a>
									</motion.li>
									<motion.li
										data-social="Telegram"
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
										className="app-item__social-icons-list__item"
										style={
											d.telegram
												? null
												: { display: "none" }
										}
									>
										<a
											href={d.telegram}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon
												icon={faTelegram}
											/>
										</a>
									</motion.li>

									<motion.li
										data-social="Medium"
										whileHover={
											FramerMotionStyles.buttons
												.whileHover
										}
										transition={
											FramerMotionStyles.buttons
												.transition
										}
										className="app-item__social-icons-list__item"
										style={
											d.medium
												? null
												: { display: "none" }
										}
									>
										<a
											href={d.medium}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon icon={faMedium} />
										</a>
									</motion.li>
								</ul>
							</div>
						))
				: null}
		</div>
	);
};

export default AppPage;
