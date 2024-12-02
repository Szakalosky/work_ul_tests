"use client";
import React, { useEffect, useState } from "react";
import useGetUser from "../hooks/useGetUser";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { useParams } from "next/navigation";
import { dataFromAPIType } from "@/app/types/important";
import EditSite from "../components/EditSite";
import Link from "next/link";

//pobrać ścieżke z id i tutaj wstawić
const Page = () => {
  const { data, loading, error, fetchUser, setData } = useGetUser();

  const { id } = useParams<{ id: string }>();

  console.log("Parametr", id);
  const [allDataFromAPI, setAllDataFromAPI] = useState<dataFromAPIType>({
    ...data,
  });

  const getUserData = async () => {
    //const users = localStorage.getItem('users');
    //const retUsers = JSON.parse(users);
    if (!id) {
      console.error("Brak parametru id");
      return;
    }
    try {
      await fetchUser(id, (fetchData) => {
        setAllDataFromAPI(fetchData);
      });
    } catch (error) {
      console.error("Błąd podczas pobierania danych użytkownika", error);
    }
  };

  useEffect(() => {
    getUserData();
    //console.log("STAN", isButtonOnIDPageClicked);
    // console.log("Dane", data);
    console.log("MOJE", allDataFromAPI);
  }, []);

  //query, localStorage,

  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const [allDataFromFetch, setAllDataFromFetch] = useState<object[]>([]);
  return (
    <div className="p-4 bg-slate-400 min-h-screen flex flex-row">
      <div className="flex flex-col">
        <table>
          <tbody>
            {Object.entries(allDataFromAPI).map(([key, value]) => (
              <tr key={key} className="border border-white ">
                <th className="border border-orange-300 p-2">{key}</th>
                <td className="p-2">{value ? value : "empty"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <Link
            href={`/user/edit/${id}`}
            className="bg-yellow-300 p-3 rounded-2xl "
          >
            Edytuj
          </Link>
        </div>
      </div>
      {/* {isEditButtonClicked && (
        <EditSite
          passedAllDataFromFetch={allDataFromFetch}
          setPassedAllDataFromFetch={setAllDataFromFetch}
        />
      )} */}

      {/* <div>
        <p>{typeof allDataFromAPI}</p>
        <p>{JSON.stringify(allDataFromAPI)}</p>
      </div> */}
    </div>
  );
};

export default Page;
