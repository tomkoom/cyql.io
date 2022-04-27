import React, { useState } from "react";
import { BackBtn } from "../../../Components/index";
import css from "./AddProject.module.css";
import { addDoc } from "firebase/firestore";
import { projectsColRef } from "../../../../../../firebase/firestore-collections";

const AddProject = () => {
  const timestamp = Date.now();
  const [projectInfo, setProjectInfo] = useState({
    added: timestamp,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const slug = value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

      setProjectInfo((prevState) => ({
        ...prevState,
        id: slug, // slug
      }));
    }
    setProjectInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(projectsColRef, { ...projectInfo });
    console.log("Document written with ID: ", docRef.id);
  };

  const inputs = [
    { label: "Website", type: "text", id: "website", placeholder: "https://website.com/" },
    {
      label: "Canister Id",
      type: "text",
      id: "canisterId",
      placeholder: "n7ib3-4qaaa-aaaai-qagnq-cai",
    },
    { label: "Logo", type: "text", id: "logo", placeholder: "Logo URL" },
    { label: "Cover", type: "text", id: "cover", placeholder: "Cover URL" },
  ];

  const inputsSocial = [
    {
      label: "Twitter",
      type: "text",
      id: "twitter",
      placeholder: "https://twitter.com/project",
    },
    {
      label: "Discord",
      type: "text",
      id: "discord",
      placeholder: "https://discord.gg/project",
    },
    { label: "Telegram", type: "text", id: "telegram", placeholder: "https://t.me/project" },
    { label: "GitHub", type: "text", id: "github", placeholder: "GitHub" },
    { label: "Medium", type: "text", id: "medium", placeholder: "Medium" },
    { label: "Dscvr", type: "text", id: "dscvr", placeholder: "Dscvr" },
    { label: "Distrikt", type: "text", id: "distrikt", placeholder: "Distrikt" },
    { label: "OpenChat", type: "text", id: "openChat", placeholder: "OpenChat" },
  ];

  const inputsNFT = [
    { label: "Total units", type: "text", id: "nftUnits", placeholder: "Total NFT units" },
    { label: "Unit price", type: "text", id: "nftUnitPrice", placeholder: "NFT unit price" },
    { label: "Market URL", type: "text", id: "nftMarketUrl", placeholder: "NFT market URL" },
    { label: "Sale URL", type: "text", id: "nftSaleUrl", placeholder: "NFT sale URL" },
    {
      label: "Rarity checker URL",
      type: "text",
      id: "nftRarityChecker",
      placeholder: "NFT rarity checker URL",
    },
    {
      label: "Img1",
      type: "text",
      id: "nftImg1",
      placeholder: "Img1 URL",
    },
    {
      label: "Img2",
      type: "text",
      id: "nftImg2",
      placeholder: "Img2 URL",
    },
    {
      label: "Img3",
      type: "text",
      id: "nftImg3",
      placeholder: "Img3 URL",
    },
    {
      label: "Img4",
      type: "text",
      id: "nftImg4",
      placeholder: "Img4 URL",
    },
  ];

  return (
    <div className={css.addProject}>
      <BackBtn />
      <h2 className="pageTitle">Add Project</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formContent}>
          {/* main info */}
          <div className={css.section}>
            <h3 className={css.sectionTitle}>main info</h3>

            <div className={css.formField}>
              <label htmlFor="name">Name</label>
              <input
                className={css.input}
                type="text"
                placeholder="Project name"
                autoComplete="off"
                id="name"
                name="name"
                onChange={handleChange}
              />
              <p className="bodyText">Slug: {projectInfo.id}</p>
            </div>

            <div className={css.formField}>
              <label htmlFor="category">Category</label>
              <select className={css.input} name="category" id="category" onChange={handleChange}>
                <option value="">Choose category</option>
                <option value="Communities">Communities</option>
                <option value="DAOs">DAOs</option>
                <option value="dApps">dApps</option>
                <option value="DeFi">DeFi</option>
                <option value="Education">Education</option>
                <option value="Explorers">Explorers</option>
                <option value="Games">Games</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Metaverse">Metaverse</option>
                <option value="NFTs">NFTs</option>
                <option value="Social Networks">Social Networks</option>
                <option value="Tools">Tools</option>
                <option value="Wallets">Wallets</option>
              </select>
            </div>

            {inputs.map((input) => (
              <div className={css.formField} key={input.id}>
                <label htmlFor={input.id}>{input.label}</label>
                <input
                  className={css.input}
                  type={input.type}
                  placeholder={input.placeholder}
                  autoComplete="off"
                  id={input.id}
                  name={input.id}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className={css.formField}>
              <label htmlFor="description">Description</label>
              <textarea
                className={css.input}
                placeholder="Project description"
                autoComplete="off"
                id="description"
                name="description"
                rows="4"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* social networks */}
          <div className={css.section}>
            <h3 className={css.sectionTitle}>social networks</h3>
            {inputsSocial.map((input) => (
              <div className={css.formField} key={input.id}>
                <label htmlFor={input.id}>{input.label}</label>
                <input
                  className={css.input}
                  type={input.type}
                  placeholder={input.placeholder}
                  autoComplete="off"
                  id={input.id}
                  name={input.id}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          {/* nfts */}
          {projectInfo.category === "NFTs" && (
            <div className={css.section}>
              <h3 className={css.sectionTitle}>NFT info</h3>

              <div className={css.formField}>
                <label htmlFor="nftSaleStatus">NFT sale status</label>
                <select
                  className={css.input}
                  name="nftSaleStatus"
                  id="nftSaleStatus"
                  onChange={handleChange}
                >
                  <option value="">Choose NFT sale status</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="On the market">On the market</option>
                  <option value="Open">Open</option>
                </select>
              </div>

              <div className={css.formField}>
                <label htmlFor="nftSaleDate">NFT sale date</label>
                <input
                  className={css.input}
                  type="date"
                  id="nftSaleDate"
                  name="nftSaleDate"
                  onChange={handleChange}
                />
              </div>

              {inputsNFT.map((input) => (
                <div className={css.formField} key={input.id}>
                  <label htmlFor={input.id}>{input.label}</label>
                  <input
                    className={css.input}
                    type={input.type}
                    placeholder={input.placeholder}
                    autoComplete="off"
                    id={input.id}
                    name={input.id}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={css.controls}>
          <button className="primaryBtn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
