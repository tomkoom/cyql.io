import React from "react";
import css from "./Tag.module.css";

const Tag = ({ id, name, handleChange, checkedState, img, icon }) => {
  return (
    <label className={css.tag} htmlFor={id}>
      <input
        id={id}
        value={name}
        type="checkbox"
        name="tag"
        onChange={handleChange}
        checked={checkedState}
      />
      <div className={css.content}>
        {img ? (
          <div
            className={css.img}
            style={{
              backgroundImage: `url(${img})`,
            }}
          />
        ) : (
          <span>{icon}</span>
        )}
        <p className={css.label}>{name}</p>
      </div>
    </label>
  );
};

export default Tag;
