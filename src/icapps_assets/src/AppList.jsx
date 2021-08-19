import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCompass,
	faUsers,
	faGamepad,
	faProjectDiagram,
	faWallet,
	faMoneyBillWave,
	faTools,
	faSearch,
	faGlobe,
	faCoins,
	faCubes,
	faDiceD20,
	faPalette,
	faImage,
} from "@fortawesome/free-solid-svg-icons";

const AppList = ({ data }) => {
	const [category, setCategory] = useState("All");
	const [filteredApps, setFilteredApps] = useState([]);

	useEffect(() => {
		category === "All"
			? setFilteredApps(data)
			: setFilteredApps(
					data.filter((data) => data.category === category)
			  );
	}, [category]);

	const TagButton = ({
		category,
		handleSetCategory,
		categoryActive,
		icon,
	}) => {
		return (
			<button
				className={`category-btns__item ${
					categoryActive ? "category-btns__item__active" : null
				}`}
				onClick={() => handleSetCategory(category)}
			>
				{icon ? (
					<FontAwesomeIcon
						icon={icon}
						color={categoryActive ? "#fff" : "#718096"}
					/>
				) : null}
				{/* {category === 'All' ? 'All' : `${category} (${category.length})`} */}
				{category}
			</button>
		);
	};

	return (
		<div className="container">
			<div className="category-btns">
				<TagButton
					handleSetCategory={setCategory}
					category="All"
					categoryActive={category === "All" ? true : false}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="Social Networks"
					categoryActive={
						category === "Social Networks" ? true : false
					}
					icon={faUsers}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="Games"
					categoryActive={category === "Games" ? true : false}
					icon={faGamepad}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="dApps"
					categoryActive={category === "dApps" ? true : false}
					icon={faProjectDiagram}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="DeFi"
					categoryActive={category === "DeFi" ? true : false}
					icon={faCoins}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="Infrastructure"
					categoryActive={
						category === "Infrastructure" ? true : false
					}
					icon={faCompass}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="Wallets"
					categoryActive={category === "Wallets" ? true : false}
					icon={faWallet}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="Tools"
					categoryActive={category === "Tools" ? true : false}
					icon={faTools}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="Explorers"
					categoryActive={category === "Explorers" ? true : false}
					icon={faGlobe}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="NFTs"
					categoryActive={category === "Explorers" ? true : false}
					icon={faPalette}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="DAOs"
					categoryActive={category === "DAOs" ? true : false}
					icon={faDiceD20}
				/>
			</div>

			<div className="app-list">
				{filteredApps.map((d) => (
					<div key={d.id}>
						<Link className="link-block" to={`/p/${d.id}`}>
							<div
								className="app-cover"
								style={
									d.cover
										? {
												backgroundImage: `url(${d.cover})`,
										  }
										: {
												backgroundImage:
													'url("https://svgshare.com/i/_HK.svg")',
												backgroundColor: "#edf2f7",
										  }
								}
							></div>
							<div className="app-list__app-info">
								<img
									className="app-list__app-info__logo"
									src={d.logo}
									alt={d.name}
								/>
								<div className="app-list__app-info_app-caption">
									<h2 className="app-name">{d.name}</h2>
									{/* <p className="body-text">
										<span className="span-color">
											{d.website}
										</span>
									</p> */}
									<p className="body-text">
										<span className="span-color">
											{d.category}
										</span>
									</p>
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default AppList;
