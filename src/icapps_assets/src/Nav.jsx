import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegram } from "@fortawesome/free-brands-svg-icons";

const Nav = () => {
	const [icpPrice, setIcpPrice] = useState("");

	fetch(
		"https://api.coingecko.com/api/v3/simple/price?ids=internet-computer&vs_currencies=usd"
	)
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				console.log("Coingecko ICP price request was not successfull");
			}
		})
		.then((data) => setIcpPrice(data["internet-computer"].usd))
		.catch((error) => console.log("Error"));

	return (
		<div className="nav">
			<div className="logo-container">
				<NavLink exact to="/" replace>
					<h1 className="logo">🚀 icApps</h1>
				</NavLink>
				<div className="icp-price-badge">
					<div className="icp-price-badge__logo"></div>
					{`$${icpPrice}`}
				</div>
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
						href="https://t.me/icapps"
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
