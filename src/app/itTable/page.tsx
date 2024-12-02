"use client";
import { RootState } from "@/app/rootStates/rootState";
import React from "react";
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import NewItTable from "./components/NewItTable";
import NewNavbar from "./components/NewNavbar";

const Page = () => {
  return (
    <Provider store={store}>
      <NewNavbar />
      <NewItTable />
    </Provider>
  );
};

export default Page;
