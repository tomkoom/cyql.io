import React from "react";
import TextareaAutosize from "react-textarea-autosize";

// state
import { useDispatch } from "react-redux";
import { setJob } from "../../../../../State/jobs/job";

const inputStyle = {
  width: "100%",
  fontSize: "var(--fontSize6)",
  lineHeight: "150%",
  color: "var(--primaryColor)",
  backgroundColor: "var(--underlay)",
  caretColor: "var(--primaryColor)",
  padding: "1rem",
  margin: "0.25rem 0",
  borderRadius: "0.33rem",
  border: "none",
  outline: "none",
};

const TextArea = ({ id }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setJob({ [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <p className="label">Job description</p>
      <TextareaAutosize minRows={3} style={inputStyle} id={id} name={id} onChange={handleChange} />
    </div>
  );
};

export default TextArea;
