import React from "react";
import "./Display.css";

export default (props) => (
  //exportando o display para calculator
  <div className="display">{props.value}</div>
);
