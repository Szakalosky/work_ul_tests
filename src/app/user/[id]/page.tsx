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
import { useParams, useRouter } from "next/navigation";
import { dataFromAPIType } from "@/app/types/important";
import EditSite from "../components/Edit/EditSite";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

//pobrać ścieżke z id i tutaj wstawić
const Page = () => {
  const { data, loading, error, fetchUser, setData } = useGetUser();

  const router = useRouter();

  const { id } = useParams<{ id: string }>();

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

  useEffect(() => {
    console.log("Id usera", id);
  }, [id]);

  //query, localStorage,

  // W jaki sposób przekazać dane typu JSON do innej strony bez pokazywania ich w URL(dane wrażliwe)?
  // przecież trzeba użyć Link,aby przekierowało do innej strony.
  // zapisać dane w localStorage, sessionStorage, a potem je odczytać na innej stronie.
  // stworzyć Context API React

  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const [allDataFromFetch, setAllDataFromFetch] = useState<object[]>([]);
  return (
    <div className="p-4 bg-slate-400 min-h-screen flex flex-row">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row">
          <Link
            href={"/user"}
            className="bg-gray-200 p-3 rounded-xl text-xs text-black w-2/5 flex flex-row items-center gap-2 hover:bg-gray-300"
          >
            <IoArrowBackOutline />
            Powrót
          </Link>
        </div>
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

        <Link
          href={`/user/edit/${id}`}
          className="bg-blue-300 p-3 rounded-2xl w-2/5 hover:bg-gray-300 hover:text-black"
        >
          Edytuj
        </Link>
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
