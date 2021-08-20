import React from "react";
import { NavLink } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegram } from "@fortawesome/free-brands-svg-icons";

const Nav = () => {
	return (
		<div className="nav">
			<div>
				<NavLink exact to="/" replace>
					<h1 className="logo">icApps</h1>
				</NavLink>
			</div>
			<ul className="nav-list">
				<li className="nav-list__item">
					<a
						href="https://twitter.com/DfinityApps"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FontAwesomeIcon icon={faTwitter} />
					</a>
				</li>
				<li className="nav-list__item">
					<a
						href="https://t.me/icapps_xyz"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FontAwesomeIcon icon={faTelegram} />
					</a>
				</li>
				<li className="nav-list__item">
					<a
						href="https://airtable.com/shrdxEhd19A8oY9bG"
						target="_blank"
						rel="noopener noreferrer"
					>
						Submit an App
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Nav;
