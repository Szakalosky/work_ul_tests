import { RootState } from "@/app/rootStates/rootState";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const NewItTable = () => {
  const itUsers = useSelector(
    (state: RootState) => state.name.initialUsersArray
  );

  const columnHeaders = useSelector(
    (state: RootState) => state.name.columnsHeaders
  );

  // useEffect(() => {
  //   console.log("USERZY", itUsers);
  // }, [itUsers]);

  return (
    <div className="m-1">
      <table
        className="w-full gap-2 border-separate border-spacing-1 table-fixed"
        cellPadding={10}
      >
        <thead className="border border-black">
          <tr className="bg-red-700 text-center ">
            {columnHeaders.map((column) => (
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
          {itUsers.map((row) => (
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
        </tbody>
      </table>
    </div>
  );
};

export default NewItTable;
