"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { NextUIProvider } from "@nextui-org/react";
import MyModal from "./components/MyModal";
import LocalRadioGroup from "./components/LocalRadioGroup";
import GetUsers from "./components/GetUsers";
import Vehicles from "./components/Vehicles";
import GetCountries from "./components/GetCountries";
import NewProps from "./NewProps";
const page = () => {
  return (
    <NextUIProvider>
      {/* <MyModal />
      <LocalRadioGroup /> */}
      {/* <GetUsers /> */}
      {/* <GetCountries /> */}
      {/* <Vehicles /> */}
      <NewProps />
    </NextUIProvider>
  );
};

export default page;
