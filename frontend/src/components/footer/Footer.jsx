import React from "react";

export default function Footer() {
  return <footer style={style}>Copyright 2023 &copy;</footer>;
}
const style = {
  color: "var(--white-color)",
  fontSize: "21px",
  backgroundColor: "var(--blue-color)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50px",
};
