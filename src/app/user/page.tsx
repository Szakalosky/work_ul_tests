"use client";
import React from "react";
import NavBar from "./components/NavBar/NavBar";
import MainContent from "./components/Main/MainContent";
import Footer from "./components/Footer/Footer";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const Page = () => {
  return (
    <Provider store={store}>
      <div className="">
        <NavBar />
        <MainContent />
        <Footer />
      </div>
    </Provider>
  );
};

export default Page;
