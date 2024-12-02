import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

const GetUsers = () => {
  const [users, setUsers] = useState<Object[]>([]);

  const getUsers = async () => {
    try {
      const endpoint = "https://jsonplaceholder.typicode.com/users";
      const newUsers = await fetch(endpoint, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      });
      const retData = await newUsers.json();
      setUsers((prevData) => {
        const updatedData = [...prevData, ...retData];
        localStorage.setItem("loadData", JSON.stringify(updatedData));
        return updatedData;
      });
    } catch (e) {
      console.error("Błąd", e);
    }
  };

  useEffect(() => {
    const usersData = localStorage.getItem("loadData");
    if (usersData) {
      const retData = JSON.parse(usersData);
      //localStorage.removeItem("loadData");
      setUsers(retData);
    }
    if (!usersData) {
      getUsers();
    }
  }, []);
  return (
    <Table
      aria-label="users"
      classNames={{
        thead:
          "[&>tr]:first:shadow-none [&>tr]:first:rounded-none border-b-2 border-black",
        th: "bg-transparent font-bold text-lg text-green-500 border-r-2 border-default-200 last:border-none pb-0 rounded-none first:rounded-t-none first:rounded-b-none last:rounded-t-none last:rounded-b-none last:rounded-t-none",
        td: "text-lg border-r-2 last:border-none border-default-200",
        tr: "even:bg-green-500 even:bg-opacity-90 data-[selected=true]:bg-default-100",
      }}
    >
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Username</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Address</TableColumn>
        <TableColumn>Phone</TableColumn>
        <TableColumn>Website</TableColumn>
        <TableColumn>Company</TableColumn>
      </TableHeader>
      <TableBody>
        {users.map((value) => (
          <TableRow key={value.id}>
            <TableCell>{value.id}</TableCell>
            <TableCell>{value.name}</TableCell>
            <TableCell>{value.username}</TableCell>
            <TableCell>{value.email}</TableCell>
            <TableCell>
              {Object.keys(value.address).map((key) => {
                if (key === "geo") {
                  return (
                    <div key={key}>
                      <p>Geo:</p>
                      {Object.keys(value.address.geo).map((geokey) => (
                        <p key={geokey}>{value.address.geo[geokey]}</p>
                      ))}
                    </div>
                  );
                }
              })}
            </TableCell>
            <TableCell>{value.phone}</TableCell>
            <TableCell>{value.website}</TableCell>
            <TableCell>
              {Object.keys(value.company).map((key) => (
                <p key={key}>{value.company[key]}</p>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GetUsers;
