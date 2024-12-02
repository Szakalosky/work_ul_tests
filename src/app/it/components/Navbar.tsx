import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import React, { ReactEventHandler, useEffect, useState } from "react";
import ITtable from "./ITtable";
import { ItTeamType } from "@/app/types/important";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/rootStates/rootState";
import { setInitialUsersArray } from "@/app/redux/actions";

const Navbar = ({
  passedAllData,
  setPassedAllData,
  isListOne,
  setIsListOne,
  isListTwo,
  setIsListTwo,
  isSearchActivated,
  setIsSearchActivated,
  isFilterUserClicked,
  setIsFilterUserClicked,
  isElementsClicked,
  setIsElementsClicked,
}: {
  passedAllData: ItTeamType[];
  setPassedAllData: (passedAllData: ItTeamType[]) => void;
  isListOne: number;
  setIsListOne: (isListOne: number) => void;
  isListTwo: number;
  setIsListTwo: (isListTwo: number) => void;
  isSearchActivated: boolean;
  setIsSearchActivated: (isSearchActivated: boolean) => void;
  isFilterUserClicked: boolean;
  setIsFilterUserClicked: (isFilterUserClicked: boolean) => void;
  isElementsClicked: boolean;
  setIsElementsClicked: (isElementsClicked: boolean) => void;
}) => {
  const sorting = [
    { id: 0, filter: "Po nazwisku alfabetycznie" },
    { id: 1, filter: "Po nazwisku alfabetycznie od końca" },
  ];

  const sortingTypeTwo = [
    { id: 0, elements: "5" },
    { id: 1, elements: "8" },
    { id: 2, elements: "Wszystkie" },
  ];

  const [filterUserButton, setFilterUserButton] = useState<number>(0);
  // const [elementsUserButton, setElementsUserButton] = useState(sortingTypeTwo);

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState<string | undefined>("");

  // useEffect(() => {
  //   console.log("Odebrałem", passedAllData);
  // }, [passedAllData]);

  const [filteredResults, setFilteredResults] = useState<ItTeamType[]>([
    ...passedAllData,
  ]);

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchText(event);
    const searchList = [...filteredResults];

    const searchTerm = event.target.value.toLowerCase();
    setSearchText(searchTerm);

    if (searchTerm !== "") {
      setIsSearchActivated(true);
    } else {
      setIsSearchActivated(false);
    }

    const filteredData = searchList.filter((element) => {
      const matchesTerm = () =>
        element.firstName.toLowerCase().trim().includes(searchTerm) ||
        element.lastName.toLowerCase().trim().includes(searchTerm) ||
        element.phoneNumber.toLowerCase().trim().includes(searchTerm) ||
        element.email.toLowerCase().trim().includes(searchTerm) ||
        element.weekNo.toLowerCase().trim().includes(searchTerm) ||
        element.timeWork.toLowerCase().trim().includes(searchTerm);

      if (isSearchActivated && matchesTerm()) {
        console.log("Wpisano");
        return element;
      } else if (isElementsClicked || (isSearchActivated && matchesTerm())) {
        console.log("Kliknieto&Wpisano");
        return element;
      }
    });

    const finalData = filteredData;
    console.log("FINAL", finalData);
    // if (isListTwo === 0) {
    //   finalData = searchList.slice(0, 5);
    // } else if (isListTwo === 1) {
    //   finalData = searchList.slice(0, 8);
    // } else if (isListTwo === 2) {
    //   return finalData;
    // }

    setPassedAllData(filteredData);
    dispatch(setInitialUsersArray(filteredData));
  };

  const filterUsers = (id: number) => {
    setFilterUserButton(id);
    let sortedList = [...filteredResults];

    // if (id === 0) {
    //   setIsFilterUserClicked(true);
    //   setIsListOne(0);

    //   sortedList = sortedList.sort((a, b) =>
    //     a.lastName.localeCompare(b.lastName)
    //   );
    // }
    // if (id === 1) {
    //   setIsFilterUserClicked(true);
    //   setIsListOne(1);
    sortedList = sortedList.sort((a, b) =>
      b.lastName.localeCompare(a.lastName)
    );
    // }
    console.log("Posortowana", sortedList);
    localStorage.setItem("saveSortedUsers", JSON.stringify(sortedList));
    setPassedAllData(sortedList);
    dispatch(setInitialUsersArray(sortedList));
  };

  const filterByElements = (id: number) => {
    let changedList = [...filteredResults];

    if (id === 0) {
      setIsElementsClicked(true);
      setIsListTwo(0);
      changedList = changedList.filter((_, index) => index < 5);
    }
    if (id === 1) {
      setIsElementsClicked(true);
      setIsListTwo(1);
      changedList = changedList.filter((_, index) => index < 8);
    }
    if (id === 2) {
      setIsElementsClicked(true);
      setIsListTwo(2);
      changedList = [...filteredResults];
    }
    localStorage.setItem("saveElements", JSON.stringify(changedList));
    setPassedAllData(changedList);
    dispatch(setInitialUsersArray(changedList));
  };

  // useEffect(() => {
  //   console.log("Wyszukiwarka włączona", isSearchActivated);
  // }, [isSearchActivated]);

  // useEffect(() => {
  //   console.log("Przycisk 1", isFilterUserClicked);
  //   console.log("Przycisk 2", isElementsClicked);
  //   console.log("wartosc 1", isListOne);
  //   console.log("wartosc 2", isListTwo);
  // }, [isFilterUserClicked, isElementsClicked, isListOne, isListTwo]);

  // useEffect(() => {
  //   console.log("sort", filterUserButton);
  // }, [filterUserButton]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-2 w-full bg-slate-300">
        <Input
          aria-label="search-bar"
          type="text"
          className="w-[30%]"
          value={searchText}
          classNames={{ input: "bg-red-600" }}
          placeholder="Szukaj"
          onChange={(e) => search(e)}
        />
        <p>{isSearchActivated ? "TAK" : "NIE"}</p>
        <div className="flex flex-row w-full items-center justify-end gap-2 ">
          <Select
            aria-label="filter-users"
            classNames={{ label: "text-black", description: "text-black" }}
            className="w-[20%] text-black"
            selectedKeys={[filterUserButton.toString()]}
            // onChange={filterUsers(type.id)}
          >
            {sorting.map((type) => (
              <SelectItem
                key={type.id}
                onClick={() => filterUsers(type.id)}
                classNames={{ title: "text-black" }}
              >
                {type.filter}
              </SelectItem>
            ))}
          </Select>
          {/* {filterUserButton.map((type))} */}
          <p className="text-black">Elementów na stronie:</p>
          <Select
            aria-label="how-many-elements"
            classNames={{ label: "bg-black", value: "text-black" }}
            className="w-[20%]"
          >
            {sortingTypeTwo.map((type) => (
              <SelectItem
                key={type.id}
                onClick={() => filterByElements(type.id)}
                classNames={{ title: "text-black" }}
              >
                {type.elements}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
