import React from "react";
import css from "./Homepage.module.css";
import { Link } from "react-router-dom";
import Loader from "../../Loader";

// Components
import RecentlyAdded from "./RecentlyAdded/RecentlyAdded";

// Framer Motion
import { motion } from "framer-motion";
import { cardVariants } from "../../motionVariants";

// Redux
import { useSelector } from "react-redux";

const Homepage = () => {
  const upcomingNfts = useSelector((state) => state.siteData.upcomingNfts);

  return (
    <main className={`${css.home} container1440`}>
      <section className={css.home__hero}>
        <h2 className={css.home__hero__title}>IC apps community portal</h2>
      </section>

      {/* Apps Section */}
      <section className={css.home__apps}>
        {/* Title */}
        <div className={css.home__section__title}>
          <h3>Recently added apps</h3>
          <Link to="/apps">View all &gt;</Link>
        </div>
        <RecentlyAdded />
      </section>

      {/* UPCOMING NFT SALES */}
      <section className={css.home__upcomingNfts}>
        {/* Title */}
        <div className={css.home__section__title}>
          <h3>Upcoming NFT sales</h3>
          <Link to="/upcoming">View all &gt;</Link>
        </div>

        {/* List */}
        <ul className={css.home__upcNfts__li}>
          {!upcomingNfts.length ? (
            <Loader />
          ) : (
            upcomingNfts
              .filter((upcNft) => upcNft["Date"] !== "Sale is open")
              .slice(0, 9)
              .map((upcNft, i) => (
                <motion.li
                  className={css.home__upcNfts__li__i}
                  variants={cardVariants}
                  whileHover="whileHover"
                  key={i}
                >
                  <Link to={`/a/${upcNft.id}`} className={css.linkBlock}>
                    {/* Main */}
                    <div className={css.home__upcNfts__li__i__main}>
                      <h4>{upcNft["Name"]}</h4>
                      <p className="bodyTextLight">
                        {upcNft["Description"] &&
                        upcNft["Description"].length > 100
                          ? `${upcNft["Description"].substring(0, 100)}...`
                          : upcNft["Description"]}
                      </p>
                    </div>

                    {/* NFT Images */}
                    <div className={css.home__upcNfts__li__i__img}>
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img1"]})` }}
                      />
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img2"]})` }}
                      />
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img3"]})` }}
                      />
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img4"]})` }}
                      />
                    </div>
                  </Link>
                </motion.li>
              ))
          )}
        </ul>
      </section>

      {/* ONGOING NFT SALES */}
      <section className={css.home__upcomingNfts}>
        {/* Title */}
        <div className={css.home__section__title}>
          <h3>Ongoing NFT sales</h3>
          <Link to="/upcoming">View all &gt;</Link>
        </div>

        {/* List */}
        <ul className={css.home__upcNfts__li}>
          {!upcomingNfts.length ? (
            <Loader />
          ) : (
            upcomingNfts
              .filter((upcNft) => upcNft["Date"] === "Sale is open")
              .slice(0, 9)
              .map((upcNft, i) => (
                <motion.li
                  className={css.home__upcNfts__li__i}
                  variants={cardVariants}
                  whileHover="whileHover"
                  key={i}
                >
                  <Link to={`/a/${upcNft.id}`} className={css.linkBlock}>
                    {/* Main */}
                    <div className={css.home__upcNfts__li__i__main}>
                      <h4>{upcNft["Name"]}</h4>
                      <p className="bodyTextLight">
                        {upcNft["Description"] &&
                        upcNft["Description"].length > 140
                          ? `${upcNft["Description"].substring(0, 140)}...`
                          : upcNft["Description"]}
                      </p>
                    </div>

                    {/* NFT Images */}
                    <div className={css.home__upcNfts__li__i__img}>
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img1"]})` }}
                      />
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img2"]})` }}
                      />
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img3"]})` }}
                      />
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img4"]})` }}
                      />
                    </div>
                  </Link>
                </motion.li>
              ))
          )}
        </ul>
      </section>

      {/* <section className={css.home__communityLinks}>
        <div className={css.home__section__title}>
          <h3>Join icApps community</h3>
        </div>

        <div className={css.home__communityLinks__content}>
          <div className={css.home__communityLinks__content__item}>
            {iconDiscord}
            <a href="">Join Discord</a>
          </div>
          <div className={css.home__communityLinks__content__item}>
            {iconTwitter}
            <a href="">Follow on Twitter</a>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default Homepage;
