import React from "react";
import { Link } from "react-router-dom";
import TagButton from "./TagButton";

const AppList = ({
	category,
	setCategory,
	filteredApps,
	data,
	loading,
	error,
}) => {
	return (
		<div className="container">
			<div className="category-btns">
				<TagButton
					handleSetCategory={setCategory}
					category="All"
					categoryActive={category === "All" ? true : false}
					appsNum={loading ? null : data[0].data.length}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="Social Networks"
					categoryActive={
						category === "Social Networks" ? true : false
					}
					icon={"🎯"}
					appsNum={
						loading
							? null
							: data[0].data.filter(
									(app) => app.category === "Social Networks"
							  ).length
					}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="Games"
					categoryActive={category === "Games" ? true : false}
					icon={"⚔️"}
					appsNum={
						loading
							? null
							: data[0].data.filter(
									(app) => app.category === "Games"
							  ).length
					}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="dApps"
					categoryActive={category === "dApps" ? true : false}
					icon={"🔗"}
					appsNum={
						loading
							? null
							: data[0].data.filter(
									(app) => app.category === "dApps"
							  ).length
					}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="DeFi"
					categoryActive={category === "DeFi" ? true : false}
					icon={"‍🌾"}
					appsNum={
						loading
							? null
							: data[0].data.filter(
									(app) => app.category === "DeFi"
							  ).length
					}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="DAOs"
					categoryActive={category === "DAOs" ? true : false}
					icon={"🏠"}
					appsNum={
						loading
							? null
							: data[0].data.filter(
									(app) => app.category === "DAOs"
							  ).length
					}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="Infrastructure"
					categoryActive={
						category === "Infrastructure" ? true : false
					}
					icon={"🚀"}
					appsNum={
						loading
							? null
							: data[0].data.filter(
									(app) => app.category === "Infrastructure"
							  ).length
					}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="Wallets"
					categoryActive={category === "Wallets" ? true : false}
					icon={"👛"}
					appsNum={
						loading
							? null
							: data[0].data.filter(
									(app) => app.category === "Wallets"
							  ).length
					}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="Tools"
					categoryActive={category === "Tools" ? true : false}
					icon={"🛠️"}
					appsNum={
						loading
							? null
							: data[0].data.filter(
									(app) => app.category === "Tools"
							  ).length
					}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="Explorers"
					categoryActive={category === "Explorers" ? true : false}
					icon={"🌎"}
					appsNum={
						loading
							? null
							: data[0].data.filter(
									(app) => app.category === "Explorers"
							  ).length
					}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="NFTs"
					categoryActive={category === "NFTs" ? true : false}
					icon={"🎨"}
					appsNum={
						loading
							? null
							: data[0].data.filter(
									(app) => app.category === "NFTs"
							  ).length
					}
				/>
				<TagButton
					handleSetCategory={setCategory}
					category="Dfinity Apps"
					categoryActive={category === "Dfinity Apps" ? true : false}
					// icon={"♾️"}
					appsNum={
						loading
							? null
							: data[0].data.filter(
									(app) => app.category === "Dfinity Apps"
							  ).length
					}
				/>
			</div>

			{loading ? (
				<p>Loading... ⌛</p>
			) : error ? (
				<p>Error!</p>
			) : (
				<div className="app-list">
					{/* {JSON.stringify(data[0].data)} */}
					{filteredApps.map((d) => (
						<div key={d.id} className="app-list__item">
							<Link className="link-block" to={`/a/${d.id}`}>
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
										<p className="body-text">
											<span className="span-color span-bold">
												{d.category}
											</span>
										</p>
										<p className="body-text gray100">
											{/* {d.description.length > 105
														? `${d.description.substring(
																0,
																105
														  )}...`
														: d.description} */}
											{d.description &&
											d.description.length > 105
												? `${d.description.substring(
														0,
														105
												  )}...`
												: d.description}
										</p>
									</div>
								</div>
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default AppList;
