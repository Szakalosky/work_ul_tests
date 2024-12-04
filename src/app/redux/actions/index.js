export const setInitialUsersArray = (items) => {
  return {
    type: "SET_INITIAL_USERS_ARRAY",
    payload: items,
  };
};

export const setTableHeaders = (columns) => {
  return {
    type: "SET_TABLE_HEADERS",
    payload: columns,
  };
};

export const setFilterUsers = (users) => {
  return {
    type: "SET_FILTER_USERS",
    payload: users,
  };
};

export const setElementsHeaders = (elements) => {
  return {
    type: "SET_ELEMENTS_HEADERS",
    payload: elements,
  };
};

export const setSortUsersByColumn = (type) => {
  return {
    type: "SET_SORT_USERS_BY_COLUMN",
    payload: type,
  };
};

export const setUsersByElements = (type) => {
  return {
    type: "SET_USERS_BY_ELEMENTS",
    payload: type,
  };
};

export const setSearchText = (text) => {
  return {
    type: "SET_SEARCH_TEXT",
    payload: text,
  };
};

export const setIsFetchUserButtonClicked = (state) => {
  return {
    type: "SET_IS_FETCH_USER_BUTTON_CLICKED",
    payload: state,
  };
};
