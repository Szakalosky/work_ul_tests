import { setInitialUsersArray } from "@/app/redux/actions";
import { RootState } from "@/app/rootStates/rootState";
import { ItTeamType } from "@/app/types/important";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ITtable = ({
  passedAllData,
  setPassedAllData,
}: {
  passedAllData: ItTeamType[];
  setPassedAllData: (passedAllData: ItTeamType[]) => void;
}) => {
  const columns = [
    { id: 0, label: "Nazwa użytkownika" },
    { id: 1, label: "Nr telefonu" },
    { id: 2, label: "Email" },
    { id: 3, label: "Nr tygodnia" },
    { id: 4, label: "Godzina" },
  ];

  const dispatch = useDispatch();
  //const [itData, setItData] = useState<ItTeamType[]>(itTeam);

  //const itArray = [...itData];

  useEffect(() => {
    console.log("It team", passedAllData);
  }, [passedAllData]);

  const users = useSelector((state: RootState) => state.name.initialUsersArray);

  useEffect(() => {
    dispatch(setInitialUsersArray([...passedAllData]));
  }, [dispatch, passedAllData]);

  useEffect(() => {
    console.log("NAVBar lista propsów", users);
  }, [users]);

  return (
    <div className="m-1">
      <table
        className="w-full gap-2 border-separate border-spacing-1 table-fixed"
        cellPadding={10}
      >
        <thead className="border border-black">
          <tr className="bg-red-700 text-center ">
            {columns.map((column) => (
              <th
                key={column.id}
                className="border border-black mx-4 text-white break-words"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="m-4 gap-2">
          {passedAllData.map((row) => (
            <tr
              key={row.id}
              className="border border-black bg-slate-400 text-center text-black"
            >
              <td className="border border-black whitespace-normal text-wrap">
                {`${row.firstName} ${row.lastName}`}
              </td>
              <td className="border border-black"> {row.phoneNumber}</td>
              <td className="border border-black">{row.email}</td>
              <td className="border border-black">{row.weekNo}</td>
              <td className="border border-black">{row.timeWork}</td>
            </tr>
          ))}
          {/* {users.map((row, index) => (
            <tr
              key={index}
              className="border border-black bg-orange-500 text-center"
            >
              <td className="border border-black ">
                {`${row.firstName} ${row.lastName}`}
              </td>
              <td className="border border-black"> {row.phoneNumber}</td>
              <td className="border border-black">{row.email}</td>
              <td className="border border-black">{row.weekNo}</td>
              <td className="border border-black">{row.timeWork}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default ITtable;
