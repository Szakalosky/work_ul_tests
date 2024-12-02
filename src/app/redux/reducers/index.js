const getWeekNumber = (date) => {
  const currentDate = typeof date === "object" ? date : new Date();
  const januaryFirst = new Date(currentDate.getFullYear(), 0, 1);
  const daysToNextMonday =
    januaryFirst.getDay() === 1 ? 0 : (7 - januaryFirst.getDay()) % 7;
  const nextMonday = new Date(
    currentDate.getFullYear(),
    0,
    januaryFirst.getDate() + daysToNextMonday
  );

  return currentDate < nextMonday
    ? 52
    : currentDate > nextMonday
    ? Math.ceil((currentDate - nextMonday) / (24 * 3600 * 1000) / 7)
    : 1;
};

const weekNumber = getWeekNumber();

const initialState = {
  initialUsersArray: [
    {
      id: 0,
      firstName: "Adrian",
      lastName: "Adamczyk",
      phoneNumber: "+48123234567",
      email: "a@com.pl",
      weekNo: weekNumber.toString(),
      timeWork: "8-16",
    },
    {
      id: 1,
      firstName: "Karolina",
      lastName: "Trębacz",
      phoneNumber: "+48123234567",
      email: "k@com.pl",
      weekNo: weekNumber.toString(),
      timeWork: "8-16",
    },
    {
      id: 2,
      firstName: "Damian",
      lastName: "Kowalczyk",
      phoneNumber: "+48123234567",
      email: "d@com.pl",
      weekNo: weekNumber.toString(),
      timeWork: "7-15",
    },
    {
      id: 3,
      firstName: "Jakub",
      lastName: "Karp",
      phoneNumber: "+48123234567",
      email: "j@com.pl",
      weekNo: weekNumber.toString(),
      timeWork: "7-15",
    },
    {
      id: 4,
      firstName: "Piotr",
      lastName: "Łysoniewski",
      phoneNumber: "+48123234567",
      email: "p@com.pl",
      weekNo: weekNumber.toString(),
      timeWork: "7-15",
    },
    {
      id: 5,
      firstName: "Mateusz",
      lastName: "Putek",
      phoneNumber: "+48123234567",
      email: "m@com.pl",
      weekNo: weekNumber.toString(),
      timeWork: "8-16",
    },
    {
      id: 6,
      firstName: "Konrad",
      lastName: "Sędkowski",
      phoneNumber: "+48123234567",
      email: "k@com.pl",
      weekNo: weekNumber.toString(),
      timeWork: "8-16",
    },
    {
      id: 7,
      firstName: "Mateusz",
      lastName: "Kuta",
      phoneNumber: "+48123234567",
      email: "m@com.pl",
      weekNo: weekNumber.toString(),
      timeWork: "7-15",
    },
    {
      id: 8,
      firstName: "Konrad",
      lastName: "Kamiński",
      phoneNumber: "+48133345567",
      email: "k@com.pl",
      weekNo: weekNumber.toString(),
      timeWork: "8-16",
    },
  ],
  columnsHeaders: [
    { id: 0, label: "Nazwa użytkownika" },
    { id: 1, label: "Nr telefonu" },
    { id: 2, label: "Email" },
    { id: 3, label: "Nr tygodnia" },
    { id: 4, label: "Godzina" },
  ],
  sorting: [
    { id: 0, filter: "Po nazwisku alfabetycznie" },
    { id: 1, filter: "Po nazwisku alfabetycznie od końca" },
    { id: 2, filter: "Po nazwie email" },
  ],
  sortingTypeTwo: [
    { id: 0, elements: "4" },
    { id: 1, elements: "8" },
    { id: 2, elements: "Wszystkie" },
  ],
  searchText: "",
  sortUsersByColumn: 0,
  filterByElementsButton: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INITIAL_USERS_ARRAY": {
      return {
        ...state,
        initialUsersArray: [...action.payload],
      };
    }
    case "SET_TABLE_HEADERS": {
      return {
        ...state,
        columnsHeaders: action.payload,
      };
    }
    case "SET_FILTER_USERS": {
      return {
        ...state,
        sorting: action.payload,
      };
    }
    case "SET_ELEMENTS_HEADERS": {
      return {
        ...state,
        sortingTypeTwo: action.payload,
      };
    }
    case "SET_SEARCH_TEXT": {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    case "SET_SORT_USERS_BY_COLUMN": {
      return {
        ...state,
        sortUsersByColumn: action.payload,
      };
    }
    case "SET_USERS_BY_ELEMENTS": {
      return {
        ...state,
        filterByElementsButton: action.payload,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
