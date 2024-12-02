import {
  setInitialUsersArray,
  setSearchText,
  setSortUsersByColumn,
  setUsersByElements,
} from "@/app/redux/actions";
import { RootState } from "@/app/rootStates/rootState";
import { ItTeamType } from "@/app/ownTypes.tsx/important";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import React, { use, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "framer-motion/client";

const NewNavbar = () => {
  const dispatch = useDispatch();
  const alphabeticallyFiltring = useSelector(
    (state: RootState) => state.name.sorting
  );
  const elementsFiltring = useSelector(
    (state: RootState) => state.name.sortingTypeTwo
  );

  const itUsers = useSelector(
    (state: RootState) => state.name.initialUsersArray
  );

  const searchTextInput = useSelector((state: RootState) =>
    state.name.searchText?.toLowerCase()
  );

  const sortUsersByType = useSelector(
    (state: RootState) => state.name.sortUsersByColumn
  );
  const filterUsersByElements = useSelector(
    (state: RootState) => state.name.filterByElementsButton
  );

  const [filterUserButton, setFilterUserButton] = useState<number>(0);
  const [filterElementsButton, setFilterElementsButton] = useState<number>(1);

  const search = useCallback(
    (parameter: string, userList: ItTeamType[]): void => {
      //filterByElements(filterUsersByElements);
      //setSearchText(event);
      //const searchList = [...newItUsers];

      //const searchTerm = event.target.value.toLowerCase();
      //setSearchText(searchTerm);
      dispatch(setSearchText(parameter.trim()));
      //console.log("Wpisane", searchTextInput);
      // if (searchTerm !== "") {
      //   setIsSearchActivated(true);
      // } else {
      //   setIsSearchActivated(false);
      // }

      // if (parameter === "") {
      //   dispatch(setInitialUsersArray(userList));
      //   return;
      // }

      // const filteredData = userList.filter((element) => {
      //   const matchesTerm = () =>
      //     element.firstName.toLowerCase().includes(parameter.trim()) ||
      //     element.lastName.toLowerCase().includes(parameter.trim()) ||
      //     element.phoneNumber.toLowerCase().includes(parameter.trim()) ||
      //     element.email.toLowerCase().includes(parameter.trim()) ||
      //     element.weekNo.toLowerCase().includes(parameter.trim()) ||
      //     element.timeWork.toLowerCase().includes(parameter.trim());

      //   if (parameter.trim() !== "" && parameter !== null && matchesTerm()) {
      //     console.log("Wpisano", parameter);
      //     return element;
      //   }
      // });

      if (parameter === "") {
        //filterByElements(filterUsersByElements);
        dispatch(setUsersByElements(filterUsersByElements));
        dispatch(setSortUsersByColumn(sortUsersByType));
        dispatch(setInitialUsersArray(userList));
      }

      const filteredData = userList.reduce((acc: ItTeamType[], user) => {
        const matchesTerm = () =>
          user.firstName.toLowerCase().includes(parameter.trim()) ||
          user.lastName.toLowerCase().includes(parameter.trim()) ||
          user.phoneNumber.toLowerCase().includes(parameter.trim()) ||
          user.email.toLowerCase().includes(parameter.trim()) ||
          user.weekNo.toLowerCase().includes(parameter.trim()) ||
          user.timeWork.toLowerCase().includes(parameter.trim());

        if (matchesTerm()) {
          console.log("Wpisano", parameter);
          acc.push(user);
          //dispatch(setUsersByElements(filterUsersByElements));
          console.log("Akumulator", user);
        }
        return acc;
      }, []);

      //console.log("Tekst1", searchTextInput);
      //console.log("Tekst2", parameter);
      // console.log("Dane", filteredData);
      // console.log("Liczba danych", filteredData.length);
      // else if (isElementsClicked || (isSearchActivated && matchesTerm())) {
      //     console.log("Kliknieto&Wpisano");
      //     return element;
      //   }
      // const finalData = filteredData;
      // console.log("FINAL", finalData);
      // if (isListTwo === 0) {
      //   finalData = searchList.slice(0, 5);
      // } else if (isListTwo === 1) {
      //   finalData = searchList.slice(0, 8);
      // } else if (isListTwo === 2) {
      //   return finalData;
      // }

      // setPassedAllData(filteredData);

      dispatch(setInitialUsersArray(filteredData));

      //return filteredData;
    },
    [dispatch]
  );
  const filterByElements = useCallback(
    (id: number) => {
      let changedList = [...itUsers];
      //setFilterElementsButton(id);
      dispatch(setUsersByElements(id));
      switch (id) {
        case 0: {
          changedList = changedList.slice(0, 4);
          break;
        }
        case 1: {
          changedList = changedList.slice(0, 8);
          break;
        }
        default: {
          changedList = [...itUsers];
          break;
        }
      }
      dispatch(setInitialUsersArray(changedList));
    },
    [dispatch]
  );

  const sortUsersByLastName = useCallback(
    (id: number) => {
      //setFilterUserButton(id);
      dispatch(setSortUsersByColumn(id));
      let sortedList = [...itUsers];
      switch (id) {
        case 0: {
          sortedList = sortedList.sort((a, b) =>
            a.lastName.localeCompare(b.lastName)
          );
          console.log("rosnaco");
          break;
        }
        case 1: {
          sortedList = sortedList.sort((a, b) =>
            b.lastName.localeCompare(a.lastName)
          );
          console.log("malejaco");
          break;
        }
        case 2: {
          sortedList = sortedList.sort((a, b) =>
            a.email.localeCompare(b.email)
          );
          console.log("po emailu");
          break;
        }
        default: {
          sortedList = sortedList.sort((a, b) =>
            a.lastName.localeCompare(b.lastName)
          );
          break;
        }
      }

      dispatch(setInitialUsersArray(sortedList));
    },
    [itUsers, dispatch]
  );

  //console.log("user", filterUserButton);

  //   useEffect(() => {
  //     console.log("Coto", searchTextInput);
  //   }, [searchTextInput]);

  // useEffect(() => {
  //   filterByElements(filterElementsButton);
  //   sortUsersByLastName(filterUserButton);
  // }, [filterElementsButton, filterUserButton]);
  // useEffect(() => {
  //   console.log("Jaki stan", searchTextInput);
  // }, [searchTextInput]);

  useEffect(() => {
    console.log("Elementow", filterElementsButton);
    console.log("JAK", filterUserButton);
  }, [filterElementsButton, filterUserButton]);

  // const useAsyncState = (initialState) => {
  //   const [arrayData, setArrayData] = useState(initialState);

  //   const asyncSetArrayData = (value) => {
  //     return new Promise((resolve) => {
  //       setArrayData(value);
  //       setArrayData((current) => {
  //         resolve(current);
  //         return current;
  //       });
  //     });
  //   };
  //   return [arrayData, asyncSetArrayData];
  // };

  // const [newItUsers, setNewItUsers] = useAsyncState(itUsers);

  // //   const reloadUsers = async () => {
  // //     await setNewItUsers(itUsers);
  // //   };

  // useEffect(() => {
  //   //reloadUsers();
  //   console.log("Szukam", newItUsers);
  // }, [newItUsers]);

  useEffect(() => {
    filterByElements(filterUsersByElements);
  }, [filterUsersByElements]);

  //useEffect(() => {}, [itUsers]);
  // useEffect(() => {
  //   console.log("COJEST", searchTextInput);
  // }, [searchTextInput]);

  // useEffect(() => {
  //   console.log("STAN Redux elementow", filterUsersByElements);
  //   console.log("STAN Redux sposob", sortUsersByType);
  // }, [filterUsersByElements, sortUsersByType]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-2 w-full bg-slate-300">
        <Input
          aria-label="search-bar"
          type="text"
          className="w-[30%]"
          classNames={{ input: "bg-red-600" }}
          placeholder="Szukaj"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const searchTerm = e.target.value.toLowerCase();
            //dispatch(setSearchText(searchTerm));
            search(searchTerm, [...itUsers]);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            const searchTerm = e.currentTarget.value.toLowerCase();
            if (e.key === "Backspace" || searchTerm === "") {
              dispatch(setInitialUsersArray([...itUsers]));
            } else {
              search(searchTerm, [...itUsers]);
            }
          }}
        />
        <div className="flex flex-row w-full items-center justify-end gap-2 ">
          <Select
            aria-label="filter-users"
            classNames={{ label: "text-black", description: "text-black" }}
            className="w-[25%] text-black"
            selectedKeys={[sortUsersByType.toString()]}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              sortUsersByLastName(Number(e.target.value))
            }
          >
            {alphabeticallyFiltring.map((type) => (
              <SelectItem key={type.id} classNames={{ title: "text-black" }}>
                {type.filter}
              </SelectItem>
            ))}
          </Select>

          <p className="text-black">Elementów na stronie:</p>
          <Select
            aria-label="how-many-elements"
            classNames={{ label: "bg-black", value: "text-black" }}
            className="w-[20%]"
            selectedKeys={[filterUsersByElements.toString()]}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              filterByElements(Number(e.target.value))
            }
          >
            {elementsFiltring.map((type) => (
              <SelectItem key={type.id} classNames={{ title: "text-black" }}>
                {type.elements}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default NewNavbar;
