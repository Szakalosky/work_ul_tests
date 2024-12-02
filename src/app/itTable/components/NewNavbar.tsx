import { setInitialUsersArray, setSearchText } from "@/app/redux/actions";
import { RootState } from "@/app/rootStates/rootState";
import { ItTeamType } from "@/app/ownTypes.tsx/important";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const [filterUserButton, setFilterUserButton] = useState<number>(0);
  const [filterElementsButton, setFilterElementsButton] = useState<number>(0);

  const search = (parameter: string, userList: ItTeamType[]): void => {
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

    if (parameter === "") {
      dispatch(setInitialUsersArray(userList));
      return;
    }

    const filteredData = userList.filter((element) => {
      const matchesTerm = () =>
        element.firstName.toLowerCase().includes(parameter.trim()) ||
        element.lastName.toLowerCase().includes(parameter.trim()) ||
        element.phoneNumber.toLowerCase().includes(parameter.trim()) ||
        element.email.toLowerCase().includes(parameter.trim()) ||
        element.weekNo.toLowerCase().includes(parameter.trim()) ||
        element.timeWork.toLowerCase().includes(parameter.trim());

      if (parameter.trim() !== "" && parameter !== null && matchesTerm()) {
        console.log("Wpisano", parameter);
        return element;
      }
    });

    // const filteredData = userList.reduce((acc: ItTeamType[], user) => {
    //   const matchesTerm = () =>
    //     user.firstName.toLowerCase().includes(parameter.trim()) ||
    //     user.lastName.toLowerCase().trim().includes(parameter.trim()) ||
    //     user.phoneNumber.toLowerCase().trim().includes(parameter.trim()) ||
    //     user.email.toLowerCase().trim().includes(parameter.trim()) ||
    //     user.weekNo.toLowerCase().trim().includes(parameter.trim()) ||
    //     user.timeWork.toLowerCase().trim().includes(parameter.trim());

    //   if (matchesTerm()) {
    //     console.log("Wpisano", parameter);
    //     acc.push(user);
    //     console.log("Akumulator", user);
    //   } else if (parameter.trim() === "") {
    //     console.log("PUSTE");
    //     acc.pop();
    //     console.log("Akumulator", user);
    //   }
    //   return acc;
    // }, []);

    //console.log("Tekst1", searchTextInput);
    //console.log("Tekst2", parameter);
    console.log("Dane", filteredData);
    console.log("Liczba danych", filteredData.length);
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
  };
  const filterByElements = useCallback(
    (id: number) => {
      let changedList = [...itUsers];
      setFilterElementsButton(id);
      console.log("ee", filterElementsButton);
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
      setFilterUserButton(id);

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
      }

      dispatch(setInitialUsersArray(sortedList));
    },
    [dispatch]
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

  // useEffect(() => {
  //   console.log("Elementow", filterElementsButton);
  //   console.log("JAK", filterUserButton);
  // }, [filterElementsButton, filterUserButton]);

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

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-2 w-full bg-slate-300">
        <Input
          aria-label="search-bar"
          type="text"
          className="w-[30%]"
          classNames={{ input: "bg-red-600" }}
          placeholder="Szukaj"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const searchTerm = event.target.value.toLowerCase();
            //dispatch(setSearchText(searchTerm));
            search(searchTerm, itUsers);
          }}
        />
        <div className="flex flex-row w-full items-center justify-end gap-2 ">
          <Select
            aria-label="filter-users"
            classNames={{ label: "text-black", description: "text-black" }}
            className="w-[20%] text-black"
            selectedKeys={[filterUserButton.toString()]}
            onChange={(e) => sortUsersByLastName(Number(e.target.value))}
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
            selectedKeys={[filterElementsButton.toString()]}
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
