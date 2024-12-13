import React from "react";
import css from "./NavBar.module.css";
// className="flex flex-col w-full h-[10%] p-4 shine-navBar-text"
const NavBar = () => {
  return (
    <div className="custom-div-gradient">
      <div
        className={`${css.shineNavBarText} flex flex-col w-full h-[10%] p-4`}
      >
        Szczegóły użytkownika
      </div>
    </div>
  );
};

export default NavBar;
