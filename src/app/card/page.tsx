"use client";
import React from "react";
import CardExample from "./components/CardExample";
import { Button, Input } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";

const Page = () => {
  // return <CardExample />;
  return (
    <NextUIProvider>
      <CardExample />
    </NextUIProvider>
  );
};

export default Page;
