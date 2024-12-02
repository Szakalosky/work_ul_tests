const initialState = {
  initialUsersArray: [
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
  ],
  sortingTypeTwo: [
    { id: 0, elements: "4" },
    { id: 1, elements: "8" },
    { id: 2, elements: "Wszystkie" },
  ],
  searchText: "",
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
    default:
      return state;
  }
};

export default rootReducer;
