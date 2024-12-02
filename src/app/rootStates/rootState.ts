import {
  AlphabeticallyFilterType,
  ColumnHeaderType,
  ElementsFilterType,
  ItTeamType,
} from "../types/important";

export type RootState = {
  name: {
    initialUsersArray: ItTeamType[];
    columnsHeaders: ColumnHeaderType[];
    sorting: AlphabeticallyFilterType[];
    sortingTypeTwo: ElementsFilterType[];
    searchText: string | null;
  };
};
