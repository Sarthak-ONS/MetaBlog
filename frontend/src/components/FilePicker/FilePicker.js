import React from "react";

import "./Input.css";

const filePicker = (props) => (
  <div className="input">
    <label htmlFor={props.id}>{props.label}</label>
    <input
      type="file"
      onChange={(e) => props.onChange(props.id, e.target.value, e.target.files)}
      onBlur={props.onBlur}
    />
  </div>
);

export default filePicker;
