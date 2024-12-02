"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ITtable from "./components/ITtable";
import { ButtonsKeyType, ItTeamType } from "../types/important";
import { store } from "../redux/store";
import { Provider } from "react-redux";

const Page = () => {
  const itTeam = [
    {
      id: 0,
      firstName: "Adrian",
      lastName: "Adamczyk",
      phoneNumber: "+48123234567",
      email: "a@com.pl",
      weekNo: "48",
      timeWork: "8-16",
    },
    {
      id: 1,
      firstName: "Karolina",
      lastName: "Trębacz",
      phoneNumber: "+48123234567",
      email: "k@com.pl",
      weekNo: "48",
      timeWork: "8-16",
    },
    {
      id: 2,
      firstName: "Damian",
      lastName: "Kowalczyk",
      phoneNumber: "+48123234567",
      email: "d@com.pl",
      weekNo: "48",
      timeWork: "7-15",
    },
    {
      id: 3,
      firstName: "Jakub",
      lastName: "Karp",
      phoneNumber: "+48123234567",
      email: "j@com.pl",
      weekNo: "48",
      timeWork: "7-15",
    },
    {
      id: 4,
      firstName: "Piotr",
      lastName: "Łysoniewski",
      phoneNumber: "+48123234567",
      email: "p@com.pl",
      weekNo: "48",
      timeWork: "7-15",
    },
    {
      id: 5,
      firstName: "Mateusz",
      lastName: "Putek",
      phoneNumber: "+48123234567",
      email: "m@com.pl",
      weekNo: "48",
      timeWork: "8-16",
    },
    {
      id: 6,
      firstName: "Konrad",
      lastName: "Sędkowski",
      phoneNumber: "+48123234567",
      email: "k@com.pl",
      weekNo: "48",
      timeWork: "8-16",
    },
    {
      id: 7,
      firstName: "Mateusz",
      lastName: "Kuta",
      phoneNumber: "+48123234567",
      email: "m@com.pl",
      weekNo: "48",
      timeWork: "7-15",
    },
    {
      id: 8,
      firstName: "Konrad",
      lastName: "Kamiński",
      phoneNumber: "+48133345567",
      email: "k@com.pl",
      weekNo: "48",
      timeWork: "8-16",
    },
  ];

  const [allDataFromIT, setAllDataFromIT] = useState<ItTeamType[]>(itTeam);
  const [isListOne, setIsListOne] = useState<number>(0);

  const [isListTwo, setIsListTwo] = useState<number>(0);
  const [isSearchActivated, setIsSearchActivated] = useState(false);
  const [isFilterUserClicked, setIsFilterUserClicked] = useState(false);
  const [isElementsClicked, setIsElementsClicked] = useState(false);

  // useEffect(() => {
  //   const loadedElementsData = localStorage.getItem("saveElements");
  //   //const loadedSortedUsersData = localStorage.getItem("saveElements");
  //   if (loadedElementsData) {
  //     const retElData = JSON.parse(loadedElementsData);
  //     setAllDataFromIT(retElData);
  //   }
  // }, [setAllDataFromIT]);
  return (
    <Provider store={store}>
      <Navbar
        passedAllData={allDataFromIT}
        setPassedAllData={setAllDataFromIT}
        isSearchActivated={isSearchActivated}
        setIsSearchActivated={setIsSearchActivated}
        isFilterUserClicked={isFilterUserClicked}
        setIsFilterUserClicked={setIsFilterUserClicked}
        isListOne={isListOne}
        setIsListOne={setIsListOne}
        isListTwo={isListTwo}
        setIsListTwo={setIsListTwo}
        isElementsClicked={isElementsClicked}
        setIsElementsClicked={setIsElementsClicked}
      />
      <ITtable
        passedAllData={allDataFromIT}
        setPassedAllData={setAllDataFromIT}
      />
    </Provider>
  );
};

export default Page;
