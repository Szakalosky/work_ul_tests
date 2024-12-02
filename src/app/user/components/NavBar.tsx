import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
const NavBar = () => {
  return (
    <div className="flex flex-col w-full h-[10%] p-4 bg-slate-200 ">
      <p className="text-black">Szczegóły użytkownika</p>
    </div>
  );
};

export default NavBar;
