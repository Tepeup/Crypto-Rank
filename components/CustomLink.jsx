import React from "react";
import Link from "next/link";

export default function CustomLink(props) {
  return (
    <Link href={`/${props.link}`}>
      <button className={props.type} onClick={props.click}>
        {props.text}
      </button>
    </Link>
  );
}
