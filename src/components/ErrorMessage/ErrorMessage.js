import React from "react";
import "./ErrorMessage.scss";
import errorIcon from "../../assets/images/icons/error-24px.svg";

function ErrorMessage({ validNumber, validEmail }) {
  let text;
  if (validNumber === false) {
    text = "Please enter a valid number";
  } else if (validEmail === false) {
    text = "Please enter a valid email";
  } else {
    text = "This field is required";
  }

  return (
    <div className="error">
      <img className="error__image" src={errorIcon}></img>
      <p className="error__text">{text}</p>
    </div>
  );
}

export default ErrorMessage;
