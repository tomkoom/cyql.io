import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const TagButton = ({
	category,
	handleSetCategory,
	categoryActive,
	icon,
	appsNum,
}) => {
	return (
		<button
			className={`category-btns__item ${
				categoryActive ? "category-btns__item__active" : null
			}`}
			onClick={() => handleSetCategory(category)}
		>
			{icon ? `${icon} ` : null}
			{/* {icon ? (
					<FontAwesomeIcon
						icon={icon}
						color={categoryActive ? "#fff" : "#718096"}
					/>
				) : null} */}
			{category}
			<p className="apps-num">{appsNum}</p>
		</button>
	);
};

export default TagButton;
