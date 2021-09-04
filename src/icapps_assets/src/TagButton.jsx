import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const TagButton = ({
	category,
	categoryLink,
	handleSetCategory,
	categoryActive,
	icon,
	appsNum,
}) => {
	// convert category to link
	
	return (
		// <Link to={category} replace>
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
				{`${category} ${appsNum}`}
				{/* <span className="span-fontsize6">{appsNum}</span> */}
			</button>
		// </Link>
	);
};

export default TagButton;
