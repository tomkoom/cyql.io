import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
	);
};

export default TagButton;
