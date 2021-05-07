import React from "react";

export default function CustomButton(props) {
  return (
    <button className={props.type} onClick={props.click}>
      {props.text}
    </button>
  );
}
