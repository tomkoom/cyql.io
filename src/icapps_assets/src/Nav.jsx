import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.svg";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegram } from "@fortawesome/free-brands-svg-icons";

// const nnsCanisterId = "qoctq-giaaa-aaaaa-aaaea-cai";
// const whitelist = [nnsCanisterId];

const Nav = () => {
	const [icpPrice, setIcpPrice] = useState("");
	const [donateAmount, setDonateAmount] = useState("0.1");

	const updateDonateAmount = (e) => {
		setDonateAmount(e.target.value);
	};

	const handleDonateBtnClick = async (el) => {
		el.target.disabled = true;

		const hasAllowed = await window.ic?.plug?.requestConnect();

		if (hasAllowed) {
			const requestTransferArg = {
				to: "edf5163b9cc9084ae504ef56c239b0bfb6afbbc6e6e7c88e9cb3069fb2e135c1",
				amount: donateAmount * 100000000,
			};
			await window.ic?.plug?.requestTransfer(requestTransferArg);
		} else {
		}

		setTimeout(function () {
			el.target.disabled = false;
		}, 5000);
	};

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
					<div className="logo">
						<img
							src={Logo}
							width="34"
							height="34"
							alt="icApps Logo"
						/>
						<h1>icApps</h1>
					</div>
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
					<NavLink exact to="/upcoming" replace>
						<p className="body-text gradient-text-highlight">
							{" "}
							Upcoming NFT Sales &amp; Airdrops{" "}
						</p>
						<p className="body-text">🪂</p>
					</NavLink>
				</li>
				<li className="nav-list__item">
					<a
						href="https://airtable.com/shrdxEhd19A8oY9bG"
						target="_blank"
						rel="noopener noreferrer"
					>
						<p className="body-text">Submit Your App</p>
					</a>
				</li>
				<li className="nav-list__item">
					<input
						className="donate-amount-input"
						type="number"
						min="0"
						onChange={updateDonateAmount}
						value={donateAmount}
					/>
					<button
						className="donate-btn"
						onClick={handleDonateBtnClick}
					>
						Donate {donateAmount} ICP
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Nav;
