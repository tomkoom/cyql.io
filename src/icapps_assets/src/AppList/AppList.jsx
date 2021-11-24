import React from "react";
import "./AppList.css";
import { Link } from "react-router-dom";

// FRAMER MOTION
import { motion } from "framer-motion";
import { motionVariants } from "../FramerMotionStyles";

// COMPONENTS
import TagButton from "./TagButton/TagButton";

const AppList = ({
	category,
	setCategory,
	filteredApps,
	data,
	loading,
	error,
}) => {
	const categories = [
		{ name: "All", icon: "" },
		{ name: "Social Networks", icon: "🎯" },
		{ name: "Games", icon: "⚔️" },
		{ name: "dApps", icon: "🔗" },
		{ name: "DeFi", icon: "‍🌾" },
		{ name: "DAOs", icon: "🏠" },
		{ name: "Infrastructure", icon: "🚀" },
		{ name: "Wallets", icon: "👛" },
		{ name: "Tools", icon: "🛠️" },
		{ name: "Explorers", icon: "🌎" },
		{ name: "NFTs", icon: "🗿" },
		{ name: "Dfinity Apps", icon: "♾️" },
		{ name: "Communities", icon: "" },
	];

	return (
		<div className="container1440">
			{/* CATEGORY BUTTONS */}

			<div className="tags">
				{categories.map((cat, i) => (
					<TagButton
						handleSetCategory={setCategory}
						category={cat.name}
						categoryActive={category === cat.name ? true : false}
						icon={cat.icon}
						appsNum={
							loading
								? null
								: cat.name === "All"
								? data[0].data.length
								: data[0].data.filter(
										(item) => item.category === cat.name
								  ).length
						}
						key={i}
					/>
				))}
			</div>

			{/* APP LIST */}
			{loading ? (
				<p className="center">Loading... ⌛</p>
			) : error ? (
				<p className="center">Error!</p>
			) : (
				<div className="app-list">
					{filteredApps.map((d) => (
						<motion.div
							key={d.id}
							className="app-list__item"
							variants={motionVariants.cards}
							whileHover="whileHover"
							animate="transition"
						>
							<Link className="link-block" to={`/a/${d.id}`}>
								<div
									className="app-cover"
									style={
										d.cover
											? {
													backgroundImage: `url(${d.cover})`,
											  }
											: {
													display: "none",
											  }
									}
								></div>
								<div className="app-list__app-info">
									<img
										className="app-list__app-info__logo"
										src={d.logo}
										alt={d.name}
										style={
											d.logo ? null : { display: "none" }
										}
									/>
									<div className="app-list__app-info__description">
										<div className="app-list__app-info__description__caption">
											<h2 className="app-list__app-info__description__caption__title">
												{d.name}
												&nbsp;
												{d.category ===
												"Social Networks"
													? "🎯"
													: d.category === "Games"
													? "⚔️"
													: d.category === "dApps"
													? "🔗"
													: d.category === "DeFi"
													? "‍🌾"
													: d.category === "DAOs"
													? "🏠"
													: d.category ===
													  "Infrastructure"
													? "🚀"
													: d.category === "Wallets"
													? "👛"
													: d.category === "Tools"
													? "🛠️"
													: d.category === "Explorers"
													? "🌎"
													: d.category === "NFTs"
													? "🗿"
													: d.category === "DeFi"
													? "‍🌾"
													: null}
											</h2>
										</div>

										<p className="body-text gray60">
											{d.description &&
											d.description.length > 90
												? `${d.description.substring(
														0,
														90
												  )}...`
												: d.description}
										</p>
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
};

export default AppList;
