import React from "react";
import { Link, useParams } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
	faTwitter,
	faTelegram,
	faDiscord,
	faMedium,
	faGithub,
	faSlack,
} from "@fortawesome/free-brands-svg-icons";

const AppPage = ({ apps }) => {
	const { id } = useParams();

	return (
		<div className="app-page">
			{apps
				.filter((d) => d.id === id)
				.map((d) => (
					<div key={d.id}>
						<Link className="back-btn-link" to="/">
							<div className="back-btn-link__div">
								<FontAwesomeIcon icon={faArrowLeft} />
							</div>
						</Link>
						<div className="app-item">
							<div
								className="app-item__app-cover"
								style={{ backgroundImage: `url(${d.cover})` }}
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
										<span className="span-color">
											{d.category}
										</span>
									</p>
								</div>
							</div>

							<p className="body-text">{d.description}</p>
							<br />

							<ul className="app-item__links-list">
								<li
									style={
										d.canister === ""
											? { display: "none" }
											: null
									}
								>
									<p className="body-text">
										<span className="span-color">
											Canister
										</span>
									</p>
									<p className="body-text">
										<a
											href={d.canister}
											target="_blank"
											rel="noopener noreferrer"
										>
											{d.canister}
										</a>
									</p>
								</li>
								<li
									style={
										d.website === ""
											? { display: "none" }
											: null
									}
								>
									<p className="body-text">
										<span className="span-color">
											Website
										</span>
									</p>
									<p className="body-text">
										<a
											href={d.website}
											target="_blank"
											rel="noopener noreferrer"
										>
											{d.website}
										</a>
									</p>
								</li>
								<li
									style={
										d.dscvr === "" || !d.dscvr
											? { display: "none" }
											: null
									}
								>
									<p className="body-text">
										<span className="span-color">
											Dscvr
										</span>
									</p>
									<p className="body-text">
										<a
											href={d.dscvr}
											target="_blank"
											rel="noopener noreferrer"
										>
											{d.dscvr}
										</a>
									</p>
								</li>
								<li
									style={
										d.distrikt === "" || !d.distrikt
											? { display: "none" }
											: null
									}
								>
									<p className="body-text">
										<span className="span-color">
											Distrikt
										</span>
									</p>
									<p className="body-text">
										<a
											href={d.distrikt}
											target="_blank"
											rel="noopener noreferrer"
										>
											{d.distrikt}
										</a>
									</p>
								</li>
							</ul>

							<ul className="app-item__social-icons-list">
								<li
									className="app-item__social-icons-list__item"
									style={
										d.twitter === ""
											? { display: "none" }
											: null
									}
								>
									<a
										href={d.twitter}
										target="_blank"
										rel="noopener noreferrer"
									>
										<FontAwesomeIcon
											icon={faTwitter}
											color="#718096"
										/>
									</a>
								</li>
								<li
									className="app-item__social-icons-list__item"
									style={
										d.github === ""
											? { display: "none" }
											: null
									}
								>
									<a
										href={d.github}
										target="_blank"
										rel="noopener noreferrer"
									>
										<FontAwesomeIcon
											icon={faGithub}
											color="#718096"
										/>
									</a>
								</li>
								<li
									className="app-item__social-icons-list__item"
									style={
										d.telegram === ""
											? { display: "none" }
											: null
									}
								>
									<a
										href={d.telegram}
										target="_blank"
										rel="noopener noreferrer"
									>
										<FontAwesomeIcon
											icon={faTelegram}
											color="#718096"
										/>
									</a>
								</li>
								<li
									className="app-item__social-icons-list__item"
									style={
										d.discord === ""
											? { display: "none" }
											: null
									}
								>
									<a
										href={d.discord}
										target="_blank"
										rel="noopener noreferrer"
									>
										<FontAwesomeIcon
											icon={faDiscord}
											color="#718096"
										/>
									</a>
								</li>
								<li
									className="app-item__social-icons-list__item"
									style={
										d.medium === ""
											? { display: "none" }
											: null
									}
								>
									<a
										href={d.medium}
										target="_blank"
										rel="noopener noreferrer"
									>
										<FontAwesomeIcon
											icon={faMedium}
											color="#718096"
										/>
									</a>
								</li>
								<li
									className="app-item__social-icons-list__item"
									style={
										d.slack === ""
											? { display: "none" }
											: null
									}
								>
									<a
										href={d.slack}
										target="_blank"
										rel="noopener noreferrer"
									>
										<FontAwesomeIcon
											icon={faSlack}
											color="#718096"
										/>
									</a>
								</li>
							</ul>
						</div>
					</div>
				))}
		</div>
	);
};

export default AppPage;
