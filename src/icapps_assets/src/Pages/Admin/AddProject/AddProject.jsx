import React, { useState } from "react";
import { BackBtn } from "../../../Components/index";
import css from "./AddProject.module.css";

const AddProject = () => {
  const timestamp = Date.now();

  const [projectInfo, setProjectInfo] = useState({
    name: "",
    slug: "",
    category: "",
    website: "",
    canister: "",
    added: new Date(),
  });

  const inputs = [
    { label: "Name", type: "text", id: "name", placeholder: "Project name" },
    { label: "Website", type: "text", id: "website", placeholder: "Website" },
    { label: "Canister", type: "text", id: "canister", placeholder: "Canister" },
    { label: "Logo URL", type: "text", id: "logo", placeholder: "Logo" },
    { label: "Cover URL", type: "text", id: "cover", placeholder: "Cover" },
  ];

  const inputsSocial = [
    { label: "Twitter", type: "text", id: "twitter", placeholder: "Twitter" },
    { label: "Discord", type: "text", id: "discord", placeholder: "Discord" },
    { label: "Telegram", type: "text", id: "telegram", placeholder: "Telegram" },
    { label: "GitHub", type: "text", id: "github", placeholder: "GitHub" },
    { label: "Medium", type: "text", id: "medium", placeholder: "Medium" },
    { label: "Dscvr", type: "text", id: "dscvr", placeholder: "Dscvr" },
    { label: "Distrikt", type: "text", id: "distrikt", placeholder: "Distrikt" },
    { label: "OpenChat", type: "text", id: "openChat", placeholder: "OpenChat" },
  ];

  const inputsNFT = [];

  const handleSubmit = () => {
    console.log("Submit");
  };

  return (
    <div className={css.addProject}>
      <BackBtn />
      <h2 className="pageTitle">Add Project</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        {/* main info */}
        <div className={css.section}>
          <h3 className={css.sectionTitle}>main info</h3>
          {inputs.map(({ id, label, type, placeholder }) => (
            <div className={css.formField} key={id}>
              <label htmlFor={id}>{label}</label>
              <input
                className={css.input}
                type={type}
                placeholder={placeholder}
                autoComplete="off"
                id={id}
                onChange={(e) => setProjectInfo({ id: e.target.value })}
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
              rows="4"
              onChange={(e) => setProjectInfo({ description: e.target.value })}
            ></textarea>
          </div>
        </div>

        {/* social newtworks */}
        <div className={css.section}>
          <h3 className={css.sectionTitle}>social networks</h3>
          {inputsSocial.map(({ id, label, type, placeholder }) => (
            <div className={css.formField} key={id}>
              <label htmlFor={id}>{label}</label>
              <input
                className={css.input}
                type={type}
                placeholder={placeholder}
                autoComplete="off"
                id={id}
                onChange={(e) => setProjectInfo({ id: e.target.value })}
              />
            </div>
          ))}
        </div>

        <div className={css.controls}>
          <button className={css.submitBtn}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
