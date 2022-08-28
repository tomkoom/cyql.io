import React from "react";
import k from "../../../../../../../k/k";

// ReCAPTCHA
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptchaComponent = ({ setIsVerified }) => {
  const onRecaptcha = () => {
    setIsVerified(true);
  };

  const recaptchaStyle = {
    margin: "0 auto",
  };

  return (
    <div style={recaptchaStyle}>
      <ReCAPTCHA sitekey={k.RECAPTCHA_SITE_KEY} onChange={onRecaptcha} />
      {/* <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={onRecaptcha} /> */}
      {/* Test recaptcha site key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI */}
    </div>
  );
};

export default ReCaptchaComponent;
