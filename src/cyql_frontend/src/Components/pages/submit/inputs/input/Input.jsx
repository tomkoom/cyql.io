import React from "react";
import css from "./Input.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectSubmit, setSubmit } from "@state/submit/submit";

const InputsItem = ({ inputs }) => {
  const dispatch = useDispatch();
  const submit = useSelector(selectSubmit);

  const handleInput = (e) => {
    dispatch(setSubmit({ ...submit, [e.target.name]: e.target.value }));
  };

  return (
    <div className={css.inputsComponent}>
      {inputs.map((input) => (
        <div className={css.field} key={input.id}>
          <label className={css.label} htmlFor={input.id}>
            {input.label}
            {input.icon && (
              <span className={css.icon}>
                &nbsp;
                {input.icon && input.icon}
              </span>
            )}
          </label>
          {input.hint && <p className={css.hint}>{input.hint}</p>}
          <input
            className={css.input}
            type={input.type}
            id={input.id}
            name={input.id}
            placeholder={input.placeholder}
            required={input.required}
            autoComplete="off"
            onChange={handleInput}
          />
        </div>
      ))}
    </div>
  );
};

export default InputsItem;
