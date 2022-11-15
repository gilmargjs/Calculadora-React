import React from "react";
import "./Button.css";

export default (props) => {
  let classe = " button ";
  classe += props.operation ? "operation" : "";
  classe += props.double ? "double" : "";
  classe += props.triple ? "triple" : "";

  return (
    //botão com evento click e declaração de classe
    <button
      onClick={(e) => props.click && props.click(props.label)}
      className={classe}
    >
      {props.label}
    </button>
  );
};
