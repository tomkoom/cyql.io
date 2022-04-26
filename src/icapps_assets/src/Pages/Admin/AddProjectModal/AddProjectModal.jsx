import React, { useEffect, useState } from "react";
import css from "./AddProjectModal.module.css";

const Modal = ({ openModal, setOpenModal }) => {
  const [projectInfo, setProjectInfo] = useState({
    name: "",
    slug: "",
    category: "",
    website: "",
    canister: "",
    added: new Date(),
  });

  // prevent from scrolling
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModal]);

  const handleSubmit = () => {
    console.log("Submit");
  };

  // selects: category, nftSaleStatus

  const inputs = [
    { label: "Name", type: "text", id: "name", placeholder: "Project name" },
    { label: "Website", type: "text", id: "website", placeholder: "Website" },
    { label: "Canister", type: "text", id: "canister", placeholder: "Canister" },
    { label: "Logo", type: "text", id: "logo", placeholder: "Logo" },
    { label: "Cover", type: "text", id: "cover", placeholder: "Cover" },
    { label: "Twitter", type: "text", id: "twitter", placeholder: "Twitter" },
    { label: "Discord", type: "text", id: "discord", placeholder: "Discord" },
    { label: "Telegram", type: "text", id: "telegram", placeholder: "Telegram" },
    { label: "GitHub", type: "text", id: "github", placeholder: "GitHub" },
    { label: "Medium", type: "text", id: "medium", placeholder: "Medium" },
    { label: "Dscvr", type: "text", id: "dscvr", placeholder: "Dscvr" },
    { label: "Distrikt", type: "text", id: "distrikt", placeholder: "Distrikt" },
    { label: "OpenChat", type: "text", id: "openChat", placeholder: "OpenChat" },
    { label: "Description", type: "text", id: "description", placeholder: "Description" },
  ];

  return (
    <div
      className={openModal ? `${css.modal} ${css.active}` : css.modal}
      onClick={() => setOpenModal(false)}
    >
      <div
        className={openModal ? `${css.content} ${css.active}` : css.content}
        onClick={(e) => e.stopPropagation()}
      >
        <form className={css.form} onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <div className={css.formField} key={input.id}>
              <label htmlFor={input.id}>{input.label}</label>
              <input
                className={css.input}
                type={input.type}
                placeholder={input.placeholder}
                autoComplete="off"
                id={input.id}
                onChange={(e) => setProjectInfo({ name: e.target.value })}
              />
            </div>
          ))}

          <div className={css.controls}>
            <button className={css.submitBtn}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
