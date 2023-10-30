import React, { useState } from "react";
import "./header.css";
import HeaderLift from "./HeaderLift";
import Navbar from "./Navbar";
import HeaderRight from "./HeaderRight";

export default function Header() {
  const [toggle, setToggle] = useState(false);

  return (
    <header className="header">
      <HeaderLift toggle={toggle} setToggle={setToggle} />
      <Navbar toggle={toggle} setToggle={setToggle} />
      <HeaderRight />
    </header>
  );
}
