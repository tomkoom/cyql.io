import React from "react";
import "./TagButton.css";

const TagButton = ({
	category,
	handleSetCategory,
	categoryActive,
	icon,
	appsNum,
}) => {
	return (
		<button
			className={`tags__item ${
				categoryActive ? "tags__item__active" : null
			}`}
			onClick={() => handleSetCategory(category)}
		>
			{icon ? (
				`${icon} `
			) : category === "Dfinity Apps" ? (
				<div className="icp-price-badge__logo"></div>
			) : null}
			{category}
			<p className="apps-num">{appsNum}</p>
		</button>
	);
};

export default TagButton;
