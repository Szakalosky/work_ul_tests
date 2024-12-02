import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import VehicleHeader from "./hireVehicles/VehicleHeader";
import VehicleContent from "./hireVehicles/VehicleContent";
import VehicleFooter from "./hireVehicles/VehicleFooter";
const Vehicles = () => {
  const [cats, setCats] = useState([]);

  return (
    <div className="flex flex-col w-screen h-screen">
      <VehicleHeader />
      <VehicleContent />
      <VehicleFooter />
    </div>
  );
};

export default Vehicles;
