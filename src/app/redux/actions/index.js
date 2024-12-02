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

export const setSearchText = (text) => {
  return {
    type: "SET_SEARCH_TEXT",
    payload: text,
  };
};
