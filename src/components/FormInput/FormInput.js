import React from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./FormInput.scss";

function FormInput({ label, name, placeholder, error, defaultValue, validNumber, validEmail }) {
  return (
    <div className="formInput">
      <label className="formInput__label">{label}</label>
      <input
        className={`formInput__input-field ${error ? "formInput__input-field--error" : null}`}
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}/>
      {error ? <ErrorMessage validNumber={validNumber} validEmail={validEmail} /> : null}
    </div>
  );
}

export default FormInput;
